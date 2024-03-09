/**
 * Item Browser Component
 */

import { Button, Spinner, Tab, Tabs, useDisclosure } from "@nextui-org/react";
import { useEffect, useState } from "react"
import { GetItemCatgoriesResponse } from "src/common/types/api/items/item.types";
import { ItemAPI } from "src/libs/client/api/item"
import { getSectionLabel } from "./utils";
import { Section } from "@prisma/client";
import { CategoryItemBrowser } from "./CategoryItemBrowser.component";
import { useBillStore } from "src/libs/client/store/bill.store";
import { NewItemModal } from "./NewItemModal";
import { useItemStore } from "src/libs/client/store/item.store";

export function ItemBrowser() {
    const itemStore = useItemStore(state=>state);
    const [categories, setCategories] = useState<{ id: number, label: string, section: Section }[]>([]);
    const [sections, setSections] = useState<string[]>([]);

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
        <div className="flex w-full flex-col justify-center">
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