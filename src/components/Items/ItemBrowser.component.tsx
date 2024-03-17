/**
 * Item Browser Component
 */

import { Autocomplete, AutocompleteItem, Button, Input, Kbd, Spinner, Tab, Tabs, useDisclosure } from "@nextui-org/react";
import { useEffect, useState } from "react"
import { GetItemCatgoriesResponse } from "src/common/types/api/items/item.types";
import { ItemAPI } from "src/libs/client/api/item"
import { getSectionLabel } from "./utils";
import { Item, Section } from "@prisma/client";
import { CategoryItemBrowser } from "./CategoryItemBrowser.component";
import { useBillStore } from "src/libs/client/store/bill.store";
import { NewItemModal } from "./NewItemModal";
import { useItemStore } from "src/libs/client/store/item.store";
import { useAsyncList } from "@react-stately/data";

export function ItemBrowser() {
    const itemStore = useItemStore(state => state);
    const [sections, setSections] = useState<string[]>([]);



    let list = useAsyncList({
        async load({ signal, filterText }) {
            let res = await ItemAPI.searchByCode(filterText || "", signal)
            return {
                items: res
            };
        },
    });

    const handleSearchSelection = (item: Item) => {
        itemStore.setSelectedItem(item);
    }

    useEffect(() => {
        ItemAPI.getItemCategories()
            .then((res: GetItemCatgoriesResponse) => {
                itemStore.addCategories(res.categories);
                res.categories.forEach(cat => {
                    if (!sections.includes(cat.section)) {
                        sections.push(cat.section)
                    }
                });
                setSections(sections);
            })
    }, []);

    const getSectionTabs = () => {
        return sections.map(s => (
            <Tab key={s} title={getSectionLabel(s as Section)} >
                <Tabs color="secondary">
                    {getCategoryTabs(s)}
                </Tabs>
            </Tab>
        ))
    }

    const getCategoryTabs = (section: string) => {
        return itemStore.categories.filter(c => c.section === section).map(c => (
            <Tab key={c.id} title={c.label}>
                <CategoryItemBrowser category={c} />
            </Tab>
        ))
    }

    return (
        <div className="flex w-full flex-col justify-center gap-2">
            <div>
                <Autocomplete
                    inputValue={list.filterText}
                    isLoading={list.isLoading}
                    items={list.items}
                    label="Search Items"
                    placeholder="Type Item Code or Name"
                    onInputChange={list.setFilterText}
                    onChange={console.log}
                >
                    {(item: any) => (
                        <AutocompleteItem
                            onClick={() => handleSearchSelection(item)}
                            key={item.id} className="capitalize">
                            {item.trans || item.name} - <small>{item.code}</small>
                        </AutocompleteItem>
                    )}
                </Autocomplete>
            </div>
            {!!itemStore.categories.length ?
                <>
                    <Tabs color="primary" variant="solid">
                        {getSectionTabs()}
                    </Tabs>
                </> :
                <Spinner label="Loading Categories" />
            }
        </div>
    )
}