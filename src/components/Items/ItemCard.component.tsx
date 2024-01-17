import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import { Item } from "@prisma/client";
import Image from "next/image";
import { formatNumberToCurrency } from "src/libs/utils/currency";

export function ItemCard(props: {onClick:(item:Item)=>void,item:Item}) {
    return (
        <Card className="py-4 m-2 max-w-60" isPressable onClick={()=>props.onClick(props.item)}>
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <p className="text-tiny uppercase font-bold">Item#{props.item.id}</p>
                <h4 className="font-bold text-large">{props.item.name}</h4>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
                <Image
                    alt="Card background"
                    className="object-cover rounded-xl"
                    src={props.item.photo}
                    width={270}
                    height={270}
                />
            </CardBody>
            <CardFooter>
                <h4 className="font-bold text-large">{formatNumberToCurrency(props.item.price)}</h4>
            </CardFooter>
        </Card>
    )
}