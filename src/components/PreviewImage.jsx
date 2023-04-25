import React, { useState, useCallback, forwardRef } from "react";
import icon from "../assets/icon/plus.jpg"; 
import styles from "./PreviewImage.module.css"
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { changeImage, setErrorMessage } from '../store/writeSlice';

const PreviewImage = forwardRef((props, ref) => {
    
    const { image, errorMessage } = useSelector((state) => state.write);

    const onImageClick = () => {
        ref.imageFileRef.current.click();
    };

    const onDeleteImg = () =>{
        onChangeImage(null);
    };

    const onSaveImgFile = (event) => {
        
        const file = ref.imageFileRef.current.files[0];
        if(!file) return;
        if(!file.type.startsWith('image/')) {
            alert('please upload image file');
            return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
            //setPreviewImg(URL.createObjectURL(file));
            //console.log(reader.result)
            //file object cannot serialize > cannot store in Redux. 
            // use URL.createObjectURL(file) 
            onChangeImage(URL.createObjectURL(file)); 
            
        };
        reader.readAsDataURL(file);
        event.target.value = null;
    };
    
    const dispatch = useDispatch();

    const onChangeImage = (payload) => {
        dispatch(changeImage(payload))
        dispatch(setErrorMessage({key: 'image', value: ''}))
    };

    return (
         <div className={styles.field}  >
           { props.labelText && <label htmlFor={props.labelText}>{props.labelText}</label> } 
             <div className={styles.imgWrapper} ref={ref.previewImageRef}  tabIndex="0"> 
                 <input type="file" id="file" ref={ref.imageFileRef} accept="image/gif, image/jpeg, image/png" style={{display: "none"}} onChange={onSaveImgFile}/>
                 <img src={image ? image : icon} alt="preview" onClick={onImageClick} />
                 { image && <Button text="Delete" type="button" onClick={onDeleteImg}/>}
             </div>
             { !image && <span className={styles.error}> {errorMessage.image}</span> }
        </div>
    )
})

export default PreviewImage;