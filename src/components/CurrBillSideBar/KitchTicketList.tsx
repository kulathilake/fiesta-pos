import { useState } from 'react'
import { Button, ButtonGroup } from "@nextui-org/button";
import { Accordion, AccordionItem, Divider, Listbox, ListboxItem, Modal, ModalBody, ModalContent, ModalHeader, Spinner } from "@nextui-org/react";
import { BillItem, Item, KOTStatus, KitchenTicketItem } from "@prisma/client";
import { BillItemWithItem } from "src/common/types/api/bill/bill.types";
import { KOTWithItems } from "src/common/types/api/bill/kot.types";
import { KotClient } from "src/libs/client/api/kot";
import { useTicketStore } from "src/libs/client/store/kot.store";

export function KOTList(props: { items: KOTWithItems[], isOpen: boolean, onClose: () => void }) {
    const ticketStore = useTicketStore(state => state);
    const [isPrinting,setIsPrinting] = useState(false);

    const handleKOTPrint = (billId: number, kotId: number) => {
        setIsPrinting(true);
        KotClient.updateKOTStatus(billId, kotId, KOTStatus.PREPARING)
            .then((res) => {
                KotClient.getCurrentBillKots(`${billId}`)
                    .then(res => {
                        ticketStore.setCurrentBillTickets(res)
                    })
            })
            .catch(error => {

            })
            .finally(()=>{
                setIsPrinting(false);
            })
    }
    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose}>
            <ModalContent>
                <ModalHeader>
                    Kitchen Order Tickets
                </ModalHeader>
                <ModalBody>
                    <div className="max-h-30 overflow-y-scroll">
                        <Listbox>
                            {
                                props.items.map(i => (
                                    <ListboxItem key={i.id}>
                                        <>
                                            <Accordion defaultExpandedKeys={i.status === KOTStatus.RECIEVED?["1"]:[]}>
                                                <AccordionItem title={`KOT - ${i.id} - ${i.status}`} key="1">
                                                    <ul>

                                                        {((i as any).kotItems as any[]).map((koi: KitchenTicketItem) => {
                                                            const billItem = ((koi as any).billItem as BillItemWithItem)
                                                            const item = billItem.item
                                                            return <li key={koi.id}>{item.name} - {koi.qty}</li>
                                                        })}
                                                    </ul>

                                                </AccordionItem>

                                            </Accordion>
                                            {i.status === KOTStatus.RECIEVED && 
                                                <Button 
                                                    color="success" 
                                                    onClick={() => { handleKOTPrint(+i.billId, i.id) }}
                                                    endContent={isPrinting?<Spinner/>:null}
                                                >Print</Button>}
                                        </>
                                    </ListboxItem>
                                ))
                            }
                        </Listbox>

                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}