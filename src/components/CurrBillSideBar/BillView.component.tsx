import { Code } from "@nextui-org/react";
import { Bill } from "@prisma/client";
import Image from "next/image";
import { useBillStore } from "src/libs/client/store/bill.store";
import { formatNumberToCurrency } from "src/libs/utils/currency";

export function BillView() {
    
    const bill = useBillStore(state=>state.currBill);
    const getBillItems = () => {
        return bill?.items?.map(i => (
            <div className="flex mt-4 px-4 w-full">
                {/* Item & Qty Col */}
                <div className="w-60">
                    <div className="leading-3">
                        <p>{i.item.name}</p>
                        <small>{formatNumberToCurrency(i.item.price)}</small>
                    </div>
                </div>
                {/* Qty Col */}
                <div className="w-20">
                    {i.qty}
                </div>
                {/* Total Col. */}
                <div className="w-20">
                    {formatNumberToCurrency(i.qty*i.item.price)}
                </div>

            </div>
            
        ))
    }
    if (bill) return (
        <div className="relative flex flex-col justify-start items-center rounded-lg pt-4 bg-white min-h-72
            font-mono text-black">
            <Image
                src="/dithered-logo.png"
                alt="Fiesta Logo"
                className={'mono'}
                width={138.7}
                height={71.9}
                priority
            />
            <p>#{bill.id}</p>
            <div className="w-full px-4 border-y border-dashed border-black">
                <p>{bill.openedAt.toLocaleString()}</p>
            </div>
            {getBillItems()}
            <div className="w-full px-4 pb-4 absolute bottom-0">
                Total
            </div>
        </div>
    )

    return <div className="flex flex-col justify-center items-center w-full h-full ">
        <Code>Invalid Bill</Code>
        <small>Select a valid bill from the open bills list or create one</small>
    </div>;
}