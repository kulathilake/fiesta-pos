import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Radio, RadioGroup } from "@nextui-org/react";
import { BillPayment, PaymentMode } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BillWithItems } from "src/common/types/api/bill/bill.types";
import { BillAPI } from "src/libs/client/api/bill";
import { useBillStore } from "src/libs/client/store/bill.store";
import { formatNumberToCurrency } from "src/libs/utils/currency";

export function CloseBillModal(props: {bill:BillWithItems, total:number, isOpen:boolean, onClose:()=>void}){
    const billStore = useBillStore()
    const router = useRouter()
    const {bill,total,isOpen,onClose} = props;
    const [mode, setMode] = useState<PaymentMode>(PaymentMode.CASH);
    const [tendered,setTendered] = useState<number>();
    const [actualBalance, setActualBalance] = useState<number>(0);
    const handleCloseBill = () =>{
        BillAPI.closeBill({
            billId: bill.id,
            mode,
            balance: actualBalance  ,
            tendered: tendered || null,
            total
        })
        .then((res)=>{
            BillAPI.getOpenBills()
            .then((res: BillWithItems[]) => {
                router.push('/pos')
                billStore.updateBillList(res);
                billStore.setCurrentBill(null);
            })
            .catch(e => {
                // TODO: handle 
            })
            .finally(onClose)
        })
        .catch(()=>{
            // handle errors;
        })
        .finally(()=>{
            setActualBalance(0)
            setTendered(undefined)
        })
    }
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="5xl">
            <ModalContent>
                <ModalHeader>Close Bill {bill.visibleId} <small>{bill.id}</small> </ModalHeader>
                <ModalBody className="flex flex-row justify-between">
                    {/* */}
                        <RadioGroup value={mode} onChange={(e)=>setMode(e.target.value as PaymentMode)} className="w-2/3">
                            <Radio value={PaymentMode.CASH}>💸 Cash Payment</Radio>
                            <Radio value={PaymentMode.BANK}>🏦 Bank Transfer</Radio>
                            <Radio value={PaymentMode.CARD}>💳 Card Payment</Radio>
                        </RadioGroup>
                        <div className="w-2/3 flex flex-col">
                            <h4 className="text-xs">Total</h4>
                            <h1>{formatNumberToCurrency(total)}</h1>
                            {mode === PaymentMode.CASH && 
                                <div className="my-2">
                                    <h4 className="text-xs">Tendered</h4>
                                    <Input
                                        startContent="LKR"
                                        value={tendered?.toString()}
                                        onChange={e => setTendered(+e.target.value)}
                                        size="sm" type="number" 
                                    /> 
                                    {(!!tendered && tendered >= total) &&
                                    <>
                                        <div className="my-2">
                                            <h4 className="text-xs">Balance</h4>
                                            <h1>{formatNumberToCurrency(tendered - total)}</h1>
                                        </div>
                                        <div className="my-2">
                                            <h4 className="text-xs">Actual Balance Given</h4>
                                            <Input
                                            startContent="LKR"
                                            value={actualBalance.toString()||"0"}
                                            onChange={e => setActualBalance(+e.target.value)}
                                            size="sm" type="number" /> 
                                        </div>
                                    </>
                                    }
                                </div>
                            }
                        </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={()=>handleCloseBill()}>Pay & Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}