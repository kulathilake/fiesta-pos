import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import { Item } from "@prisma/client";
import Image from "next/image";

export function ItemCard(props: Item) {
    return (
        <Card className="py-4 m-2 max-w-60" isPressable >
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <p className="text-tiny uppercase font-bold">Item#{props.id}</p>
                <h4 className="font-bold text-large">{props.name}</h4>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
                <Image
                    alt="Card background"
                    className="object-cover rounded-xl"
                    src={props.photo}
                    width={270}
                    height={270}
                />
            </CardBody>
            <CardFooter>

            </CardFooter>
        </Card>
    )
}