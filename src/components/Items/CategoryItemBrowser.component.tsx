import { Item, ItemCategory } from "@prisma/client";
import { ChangeEvent, useEffect, useState } from "react";
import { GetCategoryItemsResponse } from "src/common/types/api/items/item.types";
import { ItemAPI } from "src/libs/client/api/item";
import { ItemCard } from "./ItemCard.component";
import { useBillStore } from "src/libs/client/store/bill.store";
import { BillAPI } from "src/libs/client/api/bill";
import { BillWithItems } from "src/common/types/api/bill/bill.types";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Radio, RadioGroup, Spinner, useDisclosure } from "@nextui-org/react";
import Image from "next/image";
import { useItemStore } from "src/libs/client/store/item.store";

/**
 * component to display items for a given category
 * @param props 
 */
export function CategoryItemBrowser(props: { category: ItemCategory }) {
    const billStore = useBillStore(state => state);
    const itemStore = useItemStore(state=>state);
    
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [displayItems,setDisplayItems] = useState<Item[]>([]);
    const [clickedItem, setClickedItem] = useState<Item>();
    const [clickedItemQty, setClickedItemQty] = useState(1);
    const [loading, setIsLoading] = useState(true);

    // filter 
    const [filterKey, setFilterKey] = useState("");

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

    useEffect(()=>{
        const itemList = itemStore.items[props.category.id] 
        const filterItems = (key:string,list:Item[]) => list.filter(i=> {
            return i.name.toLowerCase().includes(filterKey.toLowerCase());
        })
        if(itemList){
            setIsLoading(false);
            setDisplayItems(filterItems(filterKey,itemList))
        } else {
            setIsLoading(true)
            ItemAPI.getCategoryItems(props.category.id)
            .then((res: GetCategoryItemsResponse) => {
                itemStore.addCategoryItems(props.category,res.items)
                setDisplayItems(filterItems(filterKey,res.items));
                setIsLoading(false);
            })
        }
    },[])

    return (
        <>
            <Input label="Search inside Category" size="sm" 
                className="w-60"
                value={filterKey.length?filterKey:''}
                onChange={(e)=>setFilterKey(e.target.value)}/>
            <div className="flex flex-wrap justify-start overflow-y-scroll max-h-unit-8xl">
                {!loading ? displayItems.length? displayItems.map(i => (
                    <ItemCard key={i.id} onClick={handleItemClick} item={i} />
                )): <p>No items under this category</p> : <Spinner label="Loading Items" />}
            </div>
            {(clickedItem && billStore.currBill) &&
                <Modal isOpen={isOpen} onClose={onClose} size="xs">
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