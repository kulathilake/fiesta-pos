import { Card, CardBody, CardFooter, CardHeader, ListboxItem } from "@nextui-org/react";
import { Item } from "@prisma/client";
import Image from "next/image";
import { formatNumberToCurrency } from "src/libs/utils/currency";

export function ItemCard(props: { onClick: (item: Item) => void, item: Item }) {
    return (
        <Card
            className="m-2 w-60 h-52"
            isPressable
            isFooterBlurred
            onClick={() => props.onClick(props.item)}>
            <Image
                alt="Card background"
                className="object-cover"
                src={props.item.photo || '/no_image.png'}
                fill={true}
            />
            <CardHeader className="bg-slate-600">
                <div className="w-full">
                    <h5 className="font-bold">{props.item.name}</h5>
                </div>
            </CardHeader>
            <CardBody className="overflow-visible">
            </CardBody>
            <CardFooter className=" flex-col text-slate-800 overflow-hidden py-1  z-10">
                <p className="font-bold text-sm">{props.item.trans}</p>
                <h4 className="font-bold">{formatNumberToCurrency(props.item.price)}</h4>
            </CardFooter>
        </Card>
    )
}