import { useEffect, useState } from 'react'
import { Button, ButtonGroup } from "@nextui-org/button";
import { Accordion, AccordionItem, Divider, Listbox, ListboxItem, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner } from "@nextui-org/react";
import { BillItem, Item, KOTStatus, KitchenTicketItem } from "@prisma/client";
import { BillItemWithItem } from "src/common/types/api/bill/bill.types";
import { KOIItem, KOTWithItems } from "src/common/types/api/bill/kot.types";
import { KotClient } from "src/libs/client/api/kot";
import { useTicketStore } from "src/libs/client/store/kot.store";
import { PrintClient } from 'src/libs/client/api/print';
import { BillAPI } from 'src/libs/client/api/bill';
import { useBillStore } from 'src/libs/client/store/bill.store';

export function ItemSpecificKOTList(props: { items: KOTWithItems[], itemId: number }) {
    const ticketStore = useTicketStore(state => state);
    const billStore = useBillStore(state => state);
    const [data, setData] = useState<{ kot: KOTWithItems, item: KOIItem }[]>([]);
    const [inProgress, setInProgress] = useState(false);
    const handleCancelItem = (billId: number, kotId: number, kotItemId: number) => {
        setInProgress(true);
        KotClient.deleteKOTItem(billId, kotId, kotItemId)
            .then(res => {
                Promise.all([
                    BillAPI.getOpenBills(),
                    KotClient.getCurrentBillKots(`${billId}`)
                ])
                    .then(res => {
                        billStore.updateBillList(res[0]);
                        const updatedCurrBill = res[0].find(b => b.id === billStore.currBill?.id);
                        if (updatedCurrBill) {
                            billStore.setCurrentBill(updatedCurrBill);
                        }
                        ticketStore.setCurrentBillTickets(res[1])
                    });
            })
            .catch(error => {

            })
            .finally(() => {
                setInProgress(false);
            })

    }
    useEffect(() => {
        const matches: { kot: KOTWithItems, item: KOIItem }[] = []
        props.items.forEach(i => {
            const item = i.kotItems.find(i => i.billItem.itemId === props.itemId);
            if (item) {
                matches.push({
                    kot: i,
                    item
                })
            }
        })
        setData([...matches]);
    }, [props])
    return (
        <Listbox>
            {data.map((d) => (
                <ListboxItem key={`${d.kot.billId}-${d.kot.id}`}>
                    <small>{`${d.kot.billId}-kot-${d.kot.id}-item-${d.item.id}`}</small>
                    <div className='flex flex-row justify-between items-center'>
                        <p>{d.item.billItem.item.name}</p>
                        <p>{d.item.qty}</p>
                        {d.kot.status === 'RECIEVED' && <div>
                            <Button
                                onClick={() => handleCancelItem(+d.kot.billId, d.kot.id, d.item.id)}
                                endContent={inProgress ? <Spinner /> : null}
                                color='danger' className='text-white'>Cancel</Button>
                        </div>}
                        {d.kot.status !== 'RECIEVED' && <div>
                            <p>{d.kot.status}</p>
                        </div>}
                    </div>
                </ListboxItem>
            ))}
        </Listbox>
    )
}
export function KOTListModal(props: { items: KOTWithItems[], isOpen: boolean, onClose: () => void }) {
    const ticketStore = useTicketStore(state => state);
    const [isPrinting, setIsPrinting] = useState(false);

    const handleKOTPrint = (billId: number, kot: KOTWithItems) => {


        KotClient.updateKOTStatus(billId, kot.id, KOTStatus.PREPARING)
            .then((res) => {
                KotClient.getCurrentBillKots(`${billId}`)
                    .then(res => {
                        ticketStore.setCurrentBillTickets(res)
                    });
                PrintClient.printKot(kot)
            })
            .catch(error => {

            })
            .finally(() => {
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
                                            <Accordion defaultExpandedKeys={i.status === KOTStatus.RECIEVED ? ["1"] : []}>
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
                                                    onClick={() => { handleKOTPrint(+i.billId, i) }}
                                                    endContent={isPrinting ? <Spinner /> : null}
                                                >Print</Button>}
                                        </>
                                    </ListboxItem>
                                ))
                            }
                        </Listbox>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={props.onClose}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}