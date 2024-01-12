import { Button, Checkbox, CheckboxGroup, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Radio, RadioGroup, Select, SelectItem } from "@nextui-org/react";
import { BillType } from "@prisma/client";
import { ChangeEvent, useState } from "react";
import { BillAPI } from "src/libs/client/api/bill";

const TABLES = [1,2,3,4,5,6]

export function OpenBillModal(props: { isOpen: boolean, onClose: () => void }) {
    const [isDineIn, setIsDineIn] = useState(true);
    const [selectedTable, setBillTables] = useState<string>();
    const [tables,setTables] = useState(TABLES)
    const [availableTables, setAvailableTables] = useState(TABLES);

    const handleBillTypeSelect = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        setIsDineIn(value === BillType.DINEIN);
    }

    const getAvailableTables = () => {
        return tables.map(t => (
            <Radio isDisabled={!availableTables.includes(t)} key={t} value={String(t)}>Table {t}</Radio>
        ))
    }

    const openBillHandler = () => {
        if(selectedTable){
            BillAPI.openNewBill(isDineIn?BillType.DINEIN:BillType.TAKEOUT , parseInt(selectedTable) );
        }
    }

    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose} className="dark">
            <ModalContent>
                <ModalHeader>Open new bill</ModalHeader>
                <ModalBody className="py-5 flex flex-col justify-center">
                    <RadioGroup orientation="horizontal" defaultValue={BillType.DINEIN} onChange={handleBillTypeSelect}>
                        <Radio value={BillType.DINEIN}>Dinein</Radio>
                        <Radio value={BillType.TAKEOUT}>Takeout</Radio>
                    </RadioGroup>
                    {isDineIn && 
                    <div className="flex flex-col items-center mt-5">
                        <small>Table Selection</small>
                    <RadioGroup 
                        className="max-w-44"
                        value={selectedTable}
                        orientation="horizontal"
                        onValueChange={setBillTables}
                    >
                        {getAvailableTables()}
                    </RadioGroup>
                    </div>
                    
                    }
                </ModalBody>
                <ModalFooter>
                    <Button 
                        color="primary"
                        isDisabled={isDineIn&&!selectedTable}
                        onClick={openBillHandler}
                    >
                        Open Bill
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}