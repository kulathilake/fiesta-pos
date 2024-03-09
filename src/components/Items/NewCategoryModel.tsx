import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Spinner } from "@nextui-org/react";
import { Section } from "@prisma/client";
import { useState } from "react";
import { getSectionLabel } from "./utils";
import { ItemAPI } from "src/libs/client/api/item";

export function NewCategoryModel(props: { isOpen: boolean, onClose: () => void, callback: () => void }) {
    const { isOpen, onClose } = props;
    const [section, setSection] = useState<Section>();
    const [label, setLabel] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSave = () => {
        setIsSubmitting(true);
        ItemAPI.createNewCat({
            label,
            section
        })
            .then(() => {
                props.callback();
                onClose()
            })
            .catch(e => {

            })
            .finally(() => {
                setIsSubmitting(false);
            })
    }



    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalContent>
                <ModalHeader>New Category</ModalHeader>
                <ModalBody>
                    <section id="category" className="flex  max-w-md flex-wrap mb-6 md:mb-0 gap-4">
                        <Select label="Section" onChange={(s) => setSection(s.target.value as Section)}>
                            {Object.keys(Section).map((s) => (
                                <SelectItem value={s} key={s}>{getSectionLabel(s as Section)}</SelectItem>
                            ))}
                        </Select>
                        <Input label="Category Label" onChange={e => setLabel(e.target.value)} />
                    </section>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={handleSave} endContent={isSubmitting && <Spinner color="default" />} color='primary'>Add</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}