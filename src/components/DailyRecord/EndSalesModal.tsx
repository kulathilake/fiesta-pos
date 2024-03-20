import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { DateTime } from "luxon";
import { SalesTable } from "../Sales/SalesTable.component";
import Image from "next/image";
import { ExpenseTable } from "../Sales/ExpenseTable.component";
import { EndSalesForm } from "./EndSalesForm";
import { useState } from "react";

export function EndSalesModal(props: { isOpen: boolean, onClose: () => void }) {
    const [shouldClose,setShouldClose] = useState(false);
    const today = DateTime.now();
 
    const onSave = async () => {
        setShouldClose(true);
    }
    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose} size="5xl">
            <ModalContent>
                <ModalHeader className="flex items-center justify-between gap-4">
                    End Sales for {today.toISODate()}
                    <Image
                        src="/fiesta.png"
                        alt="Fiesta Logo"
                        //   className={styles.Logo}
                        width={138.7}
                        height={71.9}
                        priority
                    />
                </ModalHeader>
                <ModalBody>
                    <EndSalesForm callback={props.onClose} shouldClose={shouldClose} start={today.startOf('day')} end={today.endOf('day')} />
                </ModalBody>
                <ModalFooter>
                    <Button onClick={props.onClose}>Cancel</Button>
                    <Button color="primary" onClick={onSave}>End Sales</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}