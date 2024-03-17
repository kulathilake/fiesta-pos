import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { DateTime } from "luxon";
import { SalesTable } from "../SalesTable.component";
import Image from "next/image";
import { ExpenseTable } from "../ExpenseTable.component";
import { EndSalesForm } from "./EndSalesForm";

export function EndSalesModal(props: { isOpen: boolean, onClose: () => void }) {
    const today = DateTime.now();
    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose} size="full">
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
                    <EndSalesForm start={today} end={today} />
                </ModalBody>
                <ModalFooter>
                    <Button onClick={props.onClose}>Cancel</Button>
                    <Button color="primary">End Sales</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}