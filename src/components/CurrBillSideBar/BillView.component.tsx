import { Bill } from "@prisma/client";
import Image from "next/image";

export function BillView(props:Bill){
    return (
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
            <p>#{props.id}</p>
            <div className="w-full px-4 border-y border-dashed border-black">
                <p>{props.openedAt.toLocaleString()}</p>
            </div>
            {/* Items */}
            <div className="flex mt-4 px-4 w-full">
                {/* Item & Qty Col */}
                <div className="w-60">
                    <div className="leading-3">
                    <p>Fried Rice</p>
                    <small>LKR 1020.00</small>
                    </div>
                </div>
                {/* Qty Col */}
                <div className="w-20">
                    1
                </div>
                {/* Total Col. */}
                <div className="w-20">
                    1020.00
                </div>

            </div>
            <div className="w-full px-4 pb-4 absolute bottom-0">
                Total
            </div>
        </div>
    )
}