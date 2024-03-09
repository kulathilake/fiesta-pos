import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import { Item } from "@prisma/client";
import Image from "next/image";
import { formatNumberToCurrency } from "src/libs/utils/currency";

export function ItemCard(props: { onClick: (item: Item) => void, item: Item }) {
    return (
        <Card className="m-2 w-60" isPressable onClick={() => props.onClick(props.item)}>
            <CardHeader className="px-4 flex-col items-start min-h-20">
                <h4 className="font-bold text-large">{props.item.trans}</h4>
            </CardHeader>
            <CardBody className="overflow-visible h-32">
                <Image
                    alt="Card background"
                    className="object-cover rounded-xl h-32"
                    src={props.item.photo || '/no_image.png'}
                    fill={true}
                />
            </CardBody>
            <CardFooter>
            <div className="text-center w-full">
                <h3 className="capitalize font-bold">{props.item.name}</h3>
                <h4 className="font-bold text-large">{formatNumberToCurrency(props.item.price)}</h4>
            </div>
            </CardFooter>
        </Card>
    )
}