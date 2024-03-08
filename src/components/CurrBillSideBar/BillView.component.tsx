import { Button, Code, Divider, useDisclosure } from "@nextui-org/react";
import { Bill, BillItem, BillPayment } from "@prisma/client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { useBillStore } from "src/libs/client/store/bill.store";
import { formatNumberToCurrency } from "src/libs/utils/currency";
import { BillItemModal } from "./BillItemModal";
import { BillItemWithItem } from "src/common/types/api/bill/bill.types";
import { CloseBillModal } from "./CloseBillModal";
import { PrintClient } from "src/libs/client/api/print";
import { useTicketStore } from "src/libs/client/store/kot.store";
import { KOTListModal } from "./KitchTicketList";

export function BillView() {

    const bill = useBillStore(state => state.currBill);
    const tickets = useTicketStore(state=>state.currBillTickets);

    const {isOpen: isBillUpdateOpen,onClose: onBillUpdateClose,onOpen: onBillUpdateOpen} = useDisclosure();
    const {isOpen: isCloseBillOpen, onClose: onCloseBillClose, onOpen: onCloseBillOpen} = useDisclosure();
    const {isOpen: isKOTListOpen, onClose: onKoTListClose, onOpen: onKotListOpen} = useDisclosure();

    const [billTotal,setBillTotal] = useState(0);
    const [billItem,setBillItem] = useState<BillItemWithItem>();

    const recieptRef = useRef<HTMLDivElement>(null);

    const handlePrint = ()=>{
        PrintClient.printBill(bill!);
    }

    useEffect(()=>{
        if(bill){
            const total = bill?.items?.reduce((p,c)=>p+(c.qty*c.item.price),0);
            if(!isNaN(total)){
                setBillTotal(total);
            }
        }
    },[bill]);

    const handleUpdateItemModalOpen = (item:BillItemWithItem)=>{
        setBillItem(item);
        onBillUpdateOpen();
    }

    const handleUpdateModalClose = () => {
        setBillItem(undefined);
        onBillUpdateClose();
    }

    const handleCloseBillModalOpen = () => {
        onCloseBillOpen();
    }

    const handleCloseBillModalClose = () => {
        onCloseBillClose();
    }

    const getBillItems = () => {
        return bill?.items?.map(i => (
            <div onClick={() => handleUpdateItemModalOpen(i)} className="flex mt-4 px-4 py-1 w-full hover:bg-sky-700 hover:text-white cursor-pointer" key={i.id}>
                {/* Item & Qty Col */}
                <div className="w-60">
                    <div className="leading-3">
                        <small>Item#{i.item.id}</small>
                        <p>{`${i.item.name}`}</p>
                        <small>{formatNumberToCurrency(i.item.price)}</small>
                    </div>
                </div>
                {/* Qty Col */}
                <div className="w-20">
                    {i.qty}
                </div>
                {/* Total Col. */}
                <div className="w-20 mr-4">
                    {formatNumberToCurrency(i.qty * i.item.price)}
                </div>

            </div>

        ))
    }
    if (bill) return (
        <>
        <div>
            <h4>{bill.visibleId}</h4>
            <div
            ref={recieptRef} 
            className="relative flex flex-col justify-start items-center rounded-lg pt-4 bg-white min-h-72
            font-mono text-black">
                <Image
                    src="/dithered-logo.png"
                    alt="Fiesta Logo"
                    className={'mono'}
                    width={138.7}
                    height={71.9}
                    priority
                />
            
                <div className="w-full px-4 border-y border-dashed border-black">
                    <p>{bill.openedAt.toLocaleString()}</p>
                    <p>Invoice #{bill.visibleId}<span><small>{` (${bill.id}) `}</small></span></p>
                </div>
                <div className="overflow-y-auto overflow-x-hidden w-full max-h-unit-8xl">
                    {getBillItems()}
                </div>
                <div className="w-full px-4 py-4 font-bold">
                    Total {formatNumberToCurrency(billTotal)} 
                </div>
            </div>
            <div className="mt-1 flex justify-start space-x-3">
                <Button size="sm" color="success" onClick={handleCloseBillModalOpen}>💳 Pay & Close</Button>
                {/* <Button size="sm" color="danger">🛑 Cancel</Button> */}
                <Button size="sm" onClick={handlePrint} color="default">🖨️ Print</Button>
                <Button size="sm" onClick={onKotListOpen}>KOTs</Button>
            </div>
            <div>
                <KOTListModal items={tickets} isOpen={isKOTListOpen} onClose={onKoTListClose}/>
            </div>
     
        </div>
        {billItem && <BillItemModal item={billItem} isOpen={isBillUpdateOpen} onClose={handleUpdateModalClose}/>}
        <CloseBillModal 
            bill={bill} 
            total={billTotal} 
            isOpen={isCloseBillOpen} 
            onClose={handleCloseBillModalClose}
        />
        </>
    )

    return <div className="flex flex-col justify-center items-center w-full h-full ">
        <Code>Invalid Bill</Code>
        <small>Select a valid bill from the open bills list or create one</small>
    </div>;
}