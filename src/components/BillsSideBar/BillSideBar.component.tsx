'use client'
import { Listbox, ListboxItem, Button, Spacer, useDisclosure } from "@nextui-org/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import { OpenBillModal } from "./OpenBillModal.component";
import { Bill } from "@prisma/client";
import { BillAPI } from "src/libs/client/api/bill";


export function BillSideBarComponent(props: { selected: string }) {
    const [openBills,setOpenBills] = useState<Bill[]>([]);
    const [currBill, setCurrBill] = useState<string>(props.selected);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const router = useRouter();
    
    useEffect(()=>{
        BillAPI.getOpenBills()
            .then(res=>{
                setOpenBills(res);
                console.log(res);
            })
            .catch(e => {
                // ... handle error
            })
    },[])

    const handleBillClick = (bill: string) => {
        router.push(`/app/bill/${bill}`);
        setCurrBill(bill);
    }
   
    const getOpenBillList = () => {
        return openBills.map(b => (
            <ListboxItem key={b.id} onClick={()=>handleBillClick(b.id)}>{
                b.type === 'DINEIN' ? `Table ${b.table} Bill` : `Takout Bill (${b.id})`
            }</ListboxItem>
        ))
    }
    return (
        <>
            <div className="w-full">
                <Button color="primary" className="w-full" onClick={onOpen}>🧾 New Bill</Button>
                <Spacer y={4} />
                <h3>Open Bills</h3>
                <Listbox
                    variant="flat"
                    color="warning"
                    selectedKeys={currBill ? [currBill] : []}
                    selectionMode="single"
                >
                    {getOpenBillList()}
                </Listbox>
            </div>
            <OpenBillModal isOpen={isOpen} onClose={onClose} />
        </>
    )
}