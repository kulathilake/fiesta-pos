/**
 * Item Browser Component
 */

import { Tab, Tabs } from "@nextui-org/react";
import { useEffect, useState } from "react"
import { GetItemCatgoriesResponse } from "src/common/types/api/items/item.types";
import { ItemAPI } from "src/libs/client/api/item"
import { getSectionLabel } from "./utils";
import { Section } from "@prisma/client";
import { CategoryItemBrowser } from "./CategoryItemBrowser.component";
import { useBillStore } from "src/libs/client/store/bill.store";

export function ItemBrowser() {
    const billStore = useBillStore(state=>state);
    const [categories,setCategories] = useState<{id:number, label:string, section:string}[]>([]);
    const [sections,setSections] = useState<string[]>([]);

    useEffect(()=>{
        ItemAPI.getItemCategories()
            .then((res: GetItemCatgoriesResponse)=> {
                res.categories.forEach(cat => {
                    if(!sections.includes(cat.section)){
                        sections.push(cat.section)
                    }
                });
                setCategories(res.categories);
                setSections(sections);
            })
    },[]);

    const getSectionTabs = () => {
        return sections.map(s=>(
            <Tab key={s} title={getSectionLabel(s as Section)} >
                <Tabs color="secondary">
                {getCategoryTabs(s)}
                </Tabs>
            </Tab>
        ))
    }

    const getCategoryTabs = (section:string) => {
        return categories.filter(c=>c.section===section).map(c=>(
            <Tab key={c.id} title={c.label}>
                <CategoryItemBrowser categoryId={c.id}/>
            </Tab>
        ))
    }

    return (
        <div className="flex w-full flex-col">
            <Tabs color="primary" variant="solid">
                {getSectionTabs()}
            </Tabs>
        </div>
    )
}