import React, { useState, useRef } from 'react'
import { FormButton, Input } from '../GlobalStyles/FormStyles'
import styled from 'styled-components'
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { ModalBox, ModalContainer } from '../GlobalStyles/ModalStyles';
import { ButtonsContainer } from '../../pages/Auth/ModuleStyles';
import BlankImg from "../../assets/hotel.png"
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const UploadContainer = styled.div`
    margin-bottom: 20px;
    background: #e2e2e2;
    border-radius: 4px;
    overflow: hidden;
`

const ImageContainer = styled.div`
    overflow: hidden;
    cursor: pointer;
    height: 260px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    &.selected{
        border: 2px red solid
    }
    img{
        max-width: 100%;
        max-height: 100%;
    }
    .delete-icon{
        position: absolute;
        bottom: 2px;
        right: 2px;
        background: white;
        padding: 2px;
        border-radius: 4px
    }
`

const ImageUpload = (props) => {

    const { setImageURL, imageUrl, data, styles, setSelected, selected } = props
    const fileInput = useRef(null)

    const [src, setSrc] = useState(imageUrl ? imageUrl : BlankImg);

    const [popup, setPopup] = useState(false); //For popup box
    const [image, setImage] = useState(null); //For setting crop image

    const [crop, setCrop] = useState({
        unit: 'px', // default, can be 'px' or '%'
        x: 130,
        y: 50,
        width: 160,
        height: 90,
        aspect: 16 / 9
    }); //Fro setting crop value

    const [preview, setPreview] = useState(''); //For showing the preview to users
    const [imageFile, setImageFile] = useState({}); //For setting the imagefile after upload

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
        var file = dataURLtoFile(base64Image, "file.jpg");
        setPreview(base64Image);
        setImageURL(file)
        setPopup(false)
    }

    const closeCrop = () => {
        setSrc(imageUrl);
        setPopup(false)
    }

    const selectForDelete = () => {
        if (selected.includes(data.uuid)) {
            let sl = selected.filter(s => s !== data.uuid)
            setSelected(sl)
        }
        else {
            setSelected([...selected, data.uuid])
        }
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
                            </>
                        )}
                    </ModalBox>
                </ModalContainer>
            )}

            {props.single ? (
                <ImageContainer onClick={() => !imageUrl ? fileInput.current.click() : null} style={styles}>
                    {preview ? <img src={preview} alt="" /> : <img src={src} alt="" />}
                </ImageContainer>
            ) : (
                <ImageContainer onClick={() => !imageUrl ? fileInput.current.click() : null} style={styles}
                    className={`${selected.includes(data.uuid) ? 'selected' : ''}`}>
                    {preview ? <img src={preview} alt="" /> : <img src={src} alt="" />}
                    {imageUrl && <DeleteOutlineIcon className="delete-icon" onClick={selectForDelete} />}
                </ImageContainer>
            )}

            <Input type="file" accept="image/*" onChange={(e) => displayChange(e)}
                style={{ display: 'none' }}
                ref={fileInput}>
            </Input>
        </UploadContainer>
    )
}

export default ImageUpload
