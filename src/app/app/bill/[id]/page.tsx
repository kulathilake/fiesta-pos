'use client'

import { Code } from "@nextui-org/react";
import { Bill } from "@prisma/client";
import { DateTime } from "luxon";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BillView } from "src/components/CurrBillSideBar/BillView.component";
import { useBillStore } from "src/libs/client/store/bill.store";

export default function Bill(props:any){
    const billStore = useBillStore(state=>state);
    useEffect(()=>{
        const billId = props.params.id;
        const currBill = billStore.openBills.find(b=>b.id === billId);
        if(currBill && !billStore.currBill){
            billStore.setCurrentBill(currBill)
        }
    },[props,billStore.openBills])
    return (<BillView/>)
}