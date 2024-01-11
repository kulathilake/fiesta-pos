import { Divider, Listbox, ListboxItem, Tabs, Tab, Button, Spacer } from "@nextui-org/react"

export function BillSideBarComponent(){
    return (
        <div className="w-full">
            <Button color="primary" className="w-full">🧾 New Bill</Button>
            <Spacer y={4}/>
            <h3>Open Bills</h3>
            <Listbox>
                <ListboxItem key={1}>hello</ListboxItem>
                <ListboxItem key={2}>hello</ListboxItem>
                <ListboxItem key={3}>hello</ListboxItem>
            </Listbox>
        </div>
    )
}