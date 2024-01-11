'use client'
import { Listbox, ListboxItem, Button, Spacer } from "@nextui-org/react"
import { useRouter } from "next/navigation"


export function BillSideBarComponent(){
    const router = useRouter();
    const handleBillClick = (bill:number) => {
        router.push(`/app/bill/${bill}`)
    }
    return (
        <div className="w-full">
            <Button color="primary" className="w-full">🧾 New Bill</Button>
            <Spacer y={4}/>
            <h3>Open Bills</h3>
            <Listbox>
                <ListboxItem key={1} onClick={()=>handleBillClick(1)}>Table 2 Bill</ListboxItem>
                <ListboxItem key={2} onClick={()=>handleBillClick(21)}>Table 3 Bill</ListboxItem>
                <ListboxItem key={3} onClick={()=>handleBillClick(14)}>Takeout Bill</ListboxItem>
            </Listbox>
        </div>
    )
}