import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import { NewExpenseForm } from "./NewExpenseForm";

export function NewExpenseModal(props:{isOpen:boolean,onClose:()=>void, onSuccess:()=>void}){
    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose}>        
        <ModalContent>
            <ModalHeader>New Expense</ModalHeader>
            <ModalBody>
                <NewExpenseForm cb={props.onSuccess}/>
            </ModalBody>
        </ModalContent>
    </Modal>
    )
}