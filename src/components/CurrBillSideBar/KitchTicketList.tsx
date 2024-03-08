import { Button, ButtonGroup } from "@nextui-org/button";
import { Divider } from "@nextui-org/react";
import { KOTWithItems } from "src/common/types/api/bill/kot.types";

export function KOTList(props: { items: KOTWithItems[] }) {
    return (
        <>
            <div className=" sticky flex flex-row justify-between items-center ">
                <div>
                    <h4>Pending Kitchen Order Tickets {`(${props.items.length})`}</h4>
                </div>

                <Button>Send all to Kitchen</Button>
            </div>
            <div className="max-h-40 overflow-y-scroll">
            {props.items.map(t => (
                <div key={t.id} className="flex flex-col my-1">
                    <div className="text-xs">{new Date(t.issuedAt).toLocaleTimeString()}</div>
                    <div className="flex flex-row justify-between items-center my-0">
                        <div className="w-1/3">{t.billItem.item.name}</div>
                        <div>{t.qty}</div>
                        <div className="text-yellow-300">{t.status}</div>
                        {t.status==='RECIEVED' && 
                            <ButtonGroup variant="flat" size="sm">
                                <Button color="primary">Send</Button>
                                <Button color="danger">Cancel</Button>
                            </ButtonGroup>}
                    </div>
                    <Divider/>
                </div>
            ))}
            </div>

        </>
    )
}