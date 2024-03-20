import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { useState } from "react";

export function OpeningBalanceDialog(props:{isOpen:boolean,onClose:()=>void,callback:(val:number)=>Promise<void>}){
    const [val,setVal] = useState("0");
    const [isLoading,setIsLoading] = useState(false);

    const handleSet = () => {
        setIsLoading(true);
        props.callback(+val)
        .then(()=>{
            props.onClose();
        })
        .catch(e=>{

        })
        .finally(()=>{
            setIsLoading(false);
        })
    }

    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose}>
            <ModalContent>
                <ModalHeader>Opening Balance</ModalHeader>
                <ModalBody>
                    <Input value={val} onChange={e=>setVal(e.target.value)} label="Opening Cash Balance" type="number"/>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleSet}>Set Opening Balance</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}