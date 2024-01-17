import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react";
import { useState } from "react";
import { BillItemWithItem, BillWithItems } from "src/common/types/api/bill/bill.types";
import { BillAPI } from "src/libs/client/api/bill";
import { useBillStore } from "src/libs/client/store/bill.store";

export function BillItemModal(props: { item: BillItemWithItem, isOpen: boolean, onClose: () => void }) {
    const billStore = useBillStore();
    const { item, isOpen, onClose } = props;
    const [itemQuantity, setItemQuantity] = useState(item.qty.toString());

    const handleItemUpdate = (isDeleted=false) => {
        if (billStore.currBill) {
            BillAPI.updateBillItem(item.billId, item.id, +itemQuantity,isDeleted)
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
                    <h4>{item.item.name}</h4>
                    <Input
                        startContent="Quantity:"
                        value={itemQuantity}
                        onChange={e => setItemQuantity(e.target.value)}
                        size="sm" type="number" />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={()=>handleItemUpdate(false)} >Update</Button>
                    <Button color="danger" onClick={()=>handleItemUpdate(true)}>Remove</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}