import { Item } from "@prisma/client";
import { useEffect, useState } from "react";
import { GetCategoryItemsResponse } from "src/common/types/api/items/item.types";
import { ItemAPI } from "src/libs/client/api/item";
import { ItemCard } from "./ItemCard.component";

/**
 * component to display items for a given category
 * @param props 
 */
export function CategoryItemBrowser(props: {categoryId:number}){
    const [items, setItems] = useState<Item[]>([]);

    useEffect(()=>{
        ItemAPI.getCategoryItems(props.categoryId)
            .then((res: GetCategoryItemsResponse)=>{
                setItems(res.items)
            })
    },[]);

    const getItemCards = () => {
        return items?.map(i => (
            <ItemCard {...i} key={i.id}/>
        ))
    }

    return (
        <div className="flex flex-wrap justify-start overflow-y-scroll max-h-unit-8xl">
            {getItemCards()}
        </div>
    )
}