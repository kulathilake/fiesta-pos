'use client'

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Bill(props:any){
    const router = useRouter();
    useEffect(()=>{
        console.log(props)
    },[props])
    return (
        <p>Bill #{props.params.id}</p>
    )
}