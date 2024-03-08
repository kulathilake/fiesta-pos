import { Item } from "@prisma/client";
import { ChangeEvent, useEffect, useState } from "react";
import { GetCategoryItemsResponse } from "src/common/types/api/items/item.types";
import { ItemAPI } from "src/libs/client/api/item";
import { ItemCard } from "./ItemCard.component";
import { useBillStore } from "src/libs/client/store/bill.store";
import { BillAPI } from "src/libs/client/api/bill";
import { BillWithItems } from "src/common/types/api/bill/bill.types";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Radio, RadioGroup, Spinner, useDisclosure } from "@nextui-org/react";
import Image from "next/image";

/**
 * component to display items for a given category
 * @param props 
 */
export function CategoryItemBrowser(props: { categoryId: number }) {
    const billStore = useBillStore(state => state);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [items, setItems] = useState<Item[]>([]);
    const [clickedItem, setClickedItem] = useState<Item>();
    const [clickedItemQty, setClickedItemQty] = useState(1);
    const [loading, setIsLoading] = useState(true);

    const handleItemAdd = () => {
        if (billStore.currBill && clickedItem) {
            BillAPI.addBillItem(billStore.currBill.id, clickedItem.id, clickedItemQty)
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
                        .finally(() => {
                            setClickedItem(undefined);
                            setClickedItemQty(1);
                            onClose();
                        })
                })
        }
    }

    const handleItemClick = (i: Item) => {
        if (billStore.currBill) {
            onOpen()
            setClickedItem(i)
        } else {
            alert("Select an open bill or create one")
        }
    }

    useEffect(() => {
        setIsLoading(true)
        ItemAPI.getCategoryItems(props.categoryId)
            .then((res: GetCategoryItemsResponse) => {
                setItems(res.items)
                setIsLoading(false);
            })
    }, []);

    const getItemCards = () => {
        if (items?.length === 0) {
            return <p>No items under this category</p>
        }
        return items?.map(i => (
            <ItemCard key={i.id} onClick={handleItemClick} item={i} />
        ))
    }

    return (
        <>
            <div className="flex flex-wrap justify-start overflow-y-scroll max-h-unit-8xl">
                {!loading ? getItemCards() : <Spinner label="Loading Items" />}
            </div>
            {(clickedItem && billStore.currBill) &&
                // Add Item Modal
                // TODO Replace with the model
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalContent>
                        <ModalHeader>Add {clickedItem.name} to Bill ID {billStore.currBill.visibleId}</ModalHeader>
                        <ModalBody>
                            <Image
                                alt="Card background"
                                className="object-cover rounded-xl"
                                src={clickedItem.photo || '/no_image.png'}
                                width={270}
                                height={270}
                            />
                            <Input
                                startContent="Quantity:"
                                value={clickedItemQty.toString()}
                                onChange={e => setClickedItemQty(Number(e.target.value))}
                                size="sm" type="number" />
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={handleItemAdd}>Add</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>}
        </>

    )
}