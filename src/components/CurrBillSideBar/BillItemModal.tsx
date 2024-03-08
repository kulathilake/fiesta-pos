import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { useState } from "react";
import { BillItemWithItem, BillWithItems } from "src/common/types/api/bill/bill.types";
import { BillAPI } from "src/libs/client/api/bill";
import { useBillStore } from "src/libs/client/store/bill.store";
import { useTicketStore } from "src/libs/client/store/kot.store";
import { ItemSpecificKOTList, KOTListModal } from "./KitchTicketList";

export function BillItemModal(props: { item: BillItemWithItem, isOpen: boolean, onClose: () => void }) {
    const billStore = useBillStore();
    const ticketStore = useTicketStore();
    const { item, isOpen, onClose } = props;
    const itemTickets = ticketStore.currBillTickets.filter(t => t.kotItems.some(v => v.billItem.itemId === item.itemId));

    const [itemQuantity, setItemQuantity] = useState(item.qty.toString());

    const handleItemUpdate = (isDeleted = false) => {
        if (billStore.currBill) {
            BillAPI.updateBillItem(item.billId, item.id, +itemQuantity, isDeleted)
                .then(() => {
                    BillAPI.getOpenBills()
                        .then((res: BillWithItems[]) => {
                            billStore.updateBillList(res);
                            const updatedCurrBill = res.find(b => b.id === billStore.currBill?.id);
                            if (updatedCurrBill) {
                                billStore.setCurrentBill(updatedCurrBill);
                            }
                        })
                        .catch(e => {
                            // TODO: handle 
                        })
                        .finally(onClose)
                })
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalContent>
                <ModalHeader>Update Bill Item</ModalHeader>
                <ModalBody>
                    <div className="flex flex-row justify-evenly items-center">
                        <h4>{item.item.name} x {itemQuantity}</h4>
                    </div>
                    <ItemSpecificKOTList items={itemTickets} itemId={item.itemId} />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={props.onClose}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}