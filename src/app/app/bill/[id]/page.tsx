'use client'

import { Code } from "@nextui-org/react";
import { Bill } from "@prisma/client";
import { DateTime } from "luxon";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BillView } from "src/components/CurrBillSideBar/BillView.component";

export default function Bill(props:any){
    const router = useRouter();
    const [bill,setBill] = useState<Bill>();
    useEffect(()=>{
    
    },[props])
    if(bill) return (
        <BillView {...bill}/>
    )

    return <div className="flex flex-col justify-center items-center w-full h-full ">
        <Code>No Bill Selected</Code>
        <small>Select a bill or Create a New Bill</small>
    </div>;
}