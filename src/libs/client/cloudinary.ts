import {Cloudinary} from "@cloudinary/url-gen";
import axios from "axios";
const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME || 'djng8souk';
const CLOUDINARY_PRESET = process.env.CLOUDINARY_PRESET || 'mdcexyps';
export const cloudinary = new Cloudinary({
    cloud: {
      cloudName: CLOUDINARY_NAME
    }
});

export async function uploadImage(file:File) {
    const url = `https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/image/upload`;
    const formData = new FormData();
    formData.append('file',file);
    formData.append('upload_preset',CLOUDINARY_PRESET);
    return (await axios.post(url,formData)).data.url
}
