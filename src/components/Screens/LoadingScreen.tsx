import { Spinner } from "@nextui-org/react";
import Image from "next/image";

export function LoadingScreen() {
    return (
        <>
            <div className="h-svh flex flex-col items-center justify-center">
                <Image
                    src="/fiesta.png"
                    alt="Fiesta Logo"
                    width={138.7}
                    height={71.9}
                    priority
                />
                <div className="flex flex-row items-center justify-center">
                    <Spinner />
                </div>
            </div>
        </>
    )
}