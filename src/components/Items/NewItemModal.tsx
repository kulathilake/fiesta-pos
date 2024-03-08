import { Avatar, Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { GetItemCatgoriesResponse } from "src/common/types/api/items/item.types";
import { ItemAPI } from "src/libs/client/api/item";
import { getSectionLabel } from "./utils";
import { Section } from "@prisma/client";
import { uploadImage } from "src/libs/client/cloudinary";

export function NewItemModal(props: { isOpen: boolean, onClose: () => void }) {

    const { isOpen, onClose } = props;
    const [categories, setCategories] = useState<{ id: number, label: string, section: string }[]>([]);
    const [sections, setSections] = useState<string[]>([]);

    // Selections and Inputs
    const [selectedSection, setSelectedSection] = useState<Section>();
    const [applicableCats, setApplicableCats] = useState<{ id: number, label: string, section: string }[]>([]);
    const [selectedCat, setSelectedCat] = useState<{ id: number, label: string, section: string }>();
    // Photo
    const [isImageUploading, setIsImageUploading] = useState(false);
    const [photoUrl, setPhotoUrl] = useState();

    //Submission
    const [ok2Save, setOk2Save] = useState(false);
    const [isSaveInProg, setIsSaveInProg] = useState(false);

    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [trans, setTrans] = useState('');
    const [price, setPrice] = useState(0);

    const handlePhotoPreUpload = async (input: HTMLInputElement) => {
        if (input.files?.length) {
            setIsImageUploading(true);
            const img = await uploadImage(input.files[0]);
            setIsImageUploading(false);
            setPhotoUrl(img)
        }
    }

    const handleSave = () => {
        setIsSaveInProg(true);
        
        ItemAPI.createNewItem({
            name,
            code,
            trans,
            price,
            categoryId: selectedCat?.id,
            photo: photoUrl
        })
        .then(res=>{

        })
        .catch(error=>{

        })
        .finally(()=>{
            setIsSaveInProg(false);
            onClose()
        })
    }

    useEffect(() => {
        if (selectedSection) {
            setApplicableCats(categories.filter(c => c.section === selectedSection?.toString()))
        }
    }, [selectedSection])

    useEffect(() => {
        ItemAPI.getItemCategories()
            .then((res: GetItemCatgoriesResponse) => {
                res.categories.forEach(cat => {
                    if (!sections.includes(cat.section)) {
                        sections.push(cat.section)
                    }
                });
                setCategories(res.categories);
                setSections(sections);
            })
    }, []);

    useEffect(() => {
        setOk2Save(
            !!name.length && 
            !!code.length &&
            !!trans.length &&
            price > 0 &&
            !!selectedCat &&
            !!selectedSection &&
            !isImageUploading)
    }, [name, code, trans, selectedCat, selectedSection, price, photoUrl, isImageUploading])

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalContent>
                <ModalHeader>Add New Menu Item</ModalHeader>
                <ModalBody>
                    <section id="category" className="flex  max-w-md flex-wrap mb-6 md:mb-0 gap-4">
                        <Select label="Section" onChange={(s) => setSelectedSection(s.target.value as Section)}>
                            {sections.map((s) => (
                                <SelectItem value={s} key={s}>{getSectionLabel(s as Section)}</SelectItem>
                            ))}
                        </Select>
                        <Select label="Category" onChange={(e) => setSelectedCat(categories.find(c => c.id === +e.target.value))}>
                            {applicableCats.map(c => (
                                <SelectItem value={+c.id} key={c.id}>{c.label}</SelectItem>
                            ))}
                        </Select>
                    </section>
                    <section id="basic" className="flex  max-w-md flex-wrap mb-6 md:mb-0 gap-4">
                        <Input label="Item Name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                        <Input label="Item Code" name="code" value={code} onChange={(e) => setCode(e.target.value)} />
                        <Input label="Name Translation" name="trans" value={trans} onChange={(e) => setTrans(e.target.value)} />
                        <Input label="Price" name="price" type="number" value={price.toString()} onChange={(e) => setPrice(+e.target.value)} />
                        <div className="flex flex-row items-center gap-4">
                            <Input label="Photo" name="file" type="file" onChange={(e) => handlePhotoPreUpload(e.target)} />
                            {isImageUploading && <Spinner />}
                            {(!isImageUploading && photoUrl) && <Avatar src={photoUrl} />}
                        </div>
                    </section>
                </ModalBody>
                <ModalFooter>
                    <Button 
                        onClick={handleSave} 
                        disabled={!ok2Save} 
                        color={ok2Save?"primary":"default"}
                        endContent={isSaveInProg&&<Spinner/>}
                        >Save</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}