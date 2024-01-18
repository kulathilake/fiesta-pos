'use client'

import { Code } from "@nextui-org/react";
import { Bill } from "@prisma/client";
import { DateTime } from "luxon";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BillView } from "src/components/CurrBillSideBar/BillView.component";
import { KotClient } from "src/libs/client/api/kot";
import { useBillStore } from "src/libs/client/store/bill.store";
import { useTicketStore } from "src/libs/client/store/kot.store";

export default function Bill(props:any){
    const billStore = useBillStore(state=>state);
    const ticketStore = useTicketStore(state=>state);

    const fetchCurrentBillTickets = () => {
        KotClient.getCurrentBillKots(props.params.id)
        .then(res=>{
            ticketStore.setCurrentBillTickets(res)
        })
    }

    useEffect(()=>{
        const billId = props.params.id;
        const currBill = billStore.openBills.find(b=>b.id === billId);
        if(currBill && !billStore.currBill){
            billStore.setCurrentBill(currBill)
        }
    },[props,billStore.openBills]);

    useEffect(()=>{
        if(billStore.currBill){
            ticketStore.setCurrentBillTickets([]);
            fetchCurrentBillTickets();
        }
    },[billStore.currBill])

    return (<BillView/>)
}