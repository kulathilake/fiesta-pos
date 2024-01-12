'use client'
import { Listbox, ListboxItem, Button, Spacer, useDisclosure } from "@nextui-org/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import { OpenBillModal } from "./OpenBillModal.component";
import { Bill } from "@prisma/client";
import { BillAPI } from "src/libs/client/api/bill";
import { useBillStore } from "src/libs/client/store/bill.store";


export function BillSideBarComponent() {
    
    const { isOpen, onOpen, onClose } = useDisclosure();
    const router = useRouter();
    
    const billStore = useBillStore(state=>state);

    useEffect(()=>{
        BillAPI.getOpenBills()
            .then(res=>{
                billStore.updateBillList(res);
            })
            .catch(e => {
                // ... handle error
            })
    },[])

    const handleBillClick = (billId: string) => {
        const bill = billStore.openBills.find(b=>b.id===billId);
        if(bill){
            router.push(`/app/bill/${billId}`);
            billStore.setCurrentBill(bill);
        }
    }
   
    const getOpenBillList = () => {
        return billStore.openBills.map(b => (
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
                    selectedKeys={billStore.currBill ? [billStore.currBill.id] : []}
                    selectionMode="single"
                >
                    {getOpenBillList()}
                </Listbox>
            </div>
            <OpenBillModal isOpen={isOpen} onClose={onClose} />
        </>
    )
}