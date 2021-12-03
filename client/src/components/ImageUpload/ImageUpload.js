import React, { useState, useRef } from 'react'
import { FormButton, Input } from '../GlobalStyles/FormStyles'
import styled from 'styled-components'
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import CloseIcon from '@mui/icons-material/Close';
import { ModalBox, ModalContainer } from '../GlobalStyles/ModalStyles';
import { ButtonsContainer } from '../../pages/Auth/ModuleStyles';
import { storage } from "../../utils/Firebase"
import { getDownloadURL, ref, uploadBytesResumable } from '@firebase/storage';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UploadContainer = styled.div`
    margin-bottom: 20px
`

const ImageContainer = styled.div`
    overflow: hidden;
    cursor: pointer;
    img{
        max-width: 100%;
        width: 100%;
        max-height: 100%;
    }
`

const CropContainer = styled.div`
    position: relative;
    .close-btn{
        position: absolute;
    }
`

const ImageUpload = (props) => {

    const { setImageURL, imageUrl, hotel } = props
    const fileInput = useRef(null)

    const [src, setSrc] = useState(imageUrl);

    const [popup, setPopup] = useState(false); //For popup box
    const [image, setImage] = useState(null); //For setting crop image

    const [crop, setCrop] = useState({
        unit: 'px', // default, can be 'px' or '%'
        x: 130,
        y: 50,
        width: 160,
        height: 90,
        aspect: 16/9
    }); //Fro setting crop value

    const [preview, setPreview] = useState(''); //For showing the preview to users
    const [imageFile, setImageFile] = useState({}); //For setting the imagefile after upload
    const [progress, setProgress] = useState(null)



    const displayChange = e => {
        e.preventDefault();
        setImageFile(e.target.files[0]);
        setSrc(URL.createObjectURL(e.target.files[0]));
        setPopup(true);
    }


    const dataURLtoFile = (dataurl, filename) => {
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    }


    function getCroppedImg(e) {
        e.preventDefault();
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height,
        );
        const base64Image = canvas.toDataURL('image/jpeg');
        var file = dataURLtoFile(base64Image, "profilepic.jpg");
        setPreview(base64Image);
        imageUpload(file);
    }

    const imageUpload = (file) => {
        if (!file) alert("No file found.")
        const reference = ref(storage, `images/hotels/${hotel.id}/hotelImage`)
        const uploadTask = uploadBytesResumable(reference, file)
        uploadTask.on(
            "state_changed",
            snapshot => {
                const prog = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                )
                setProgress(prog)
            },
            error => {
                toast.error(error, {
                    autoClose: 5500,
                    pauseOnHover: true
                })
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then(url => {
                        toast.success("Image uploaded successfully.", {
                            autoClose: 5500,
                            pauseOnHover: true
                        })
                        setPopup(false);
                        setImageURL(url)
                    })
            }
        )
    }


    const closeCrop = () => {
        setSrc(imageUrl);
        setPopup(false)
    }


    return (
        <UploadContainer>
            {popup && (
                <ModalContainer>
                    <ModalBox>
                        {src && (
                            <>
                                <ReactCrop src={src} onImageLoaded={setImage}
                                    crop={crop} onChange={setCrop} />
                                {progress === null && (
                                    <ButtonsContainer>
                                        <FormButton className="crop-btn"
                                            onClick={() => closeCrop()}>
                                            Cancel
                                        </FormButton>
                                        <FormButton className="crop-btn"
                                            onClick={(e) => getCroppedImg(e)}>
                                            Crop & Upload Image
                                        </FormButton>
                                    </ButtonsContainer>
                                )}
                            </>
                        )}
                    </ModalBox>
                </ModalContainer>
            )}

            <ImageContainer onClick={() => fileInput.current.click()}>
                {preview ? <img src={preview} alt="" /> : <img src={src} alt="" />}
            </ImageContainer>

            <Input type="file" accept="image/*" onChange={(e) => displayChange(e)}
                style={{ display: 'none' }}
                ref={fileInput}>
            </Input>
        </UploadContainer>
    )
}

export default ImageUpload
