import React, { useState, useRef } from 'react';
import axios from 'axios';
import Button from '../components/Button';
import Input from '../components/Input'
import icon from "../assets/icon/plus.jpg"; 

import styles from "./UploadItem.module.css";

function UploadItem() {

    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('top');
    const inputFile = useRef(null);
    const [imgFile, setImgFile] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [imgUrl, setImageUrl] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = { title, price, category };
        // axios.post('http://localhost:8080/create', data)
        //   .then(() => {
        //     console.log('Data successfully saved');
        //   })
        //   .catch((err) => {
        //     console.error(err);
        //   });

        const formData = new FormData();
        // const config = {
        //     header: { 'content-type': 'multipart/form-data' },
        //   };
        formData.append('file', selectedFile);
                
        // axios.post('http://localhost:8080/create/upload', formData, config)
        // .then(response => {console.log(response);  }) //setImageUrl(response.data.imageUrl)
        // .catch(error => console.log(error));

        const response = await axios.post('http://localhost:8080/create/upload', formData);

        // 이미지 URL을 상태로 설정
        //setImageUrl(response.data.imageUrl);

    };

    const onImageClick = () => {
        // `current` points to the mounted file input element
        inputFile.current.click();
    };

    const onDeleteImg = () =>{
        setImgFile(null);
    };

    const saveImgFile = () => {
        const file = inputFile.current.files[0];
        setSelectedFile(file)
        if(!file) return;
        if(!file.type.startsWith('image/')) {
            alert('please upload image file');
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImgFile(reader.result);
        };
    };


    return (
        <div className={styles.formWrapper}>
            <div className={styles.line}>
                <h2>ADD NEW PRODUCT </h2>
            </div>
            <form className={styles.adminForm} onSubmit={handleSubmit}>
                <div className={styles.field}  >
                    <label htmlFor="main image">Main image</label>
                    <div className={styles.imgWrapper}> 
                        <input type="file" id="file" ref={inputFile} accept="image/gif, image/jpeg, image/png" style={{display: "none"}} onChange={saveImgFile}/>
                        <img  src={imgFile ? imgFile : icon} alt="preview" onClick={onImageClick} />
                        { imgFile && <Button text="Delete" type="button" onClick={onDeleteImg}/>}
                    </div>
                </div>
                <Input
                    labelText="Category"
                    type="select"
                    value={category}
                    onChange={setCategory}
                />
                <Input
                    labelText="Product name"
                    type="text"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                />
                <Input
                    labelText="Price(AUD)"
                    type="number" 
                    value={price}
                    placeholder='Please input only number'
                    onChange={(event) => setPrice(event.target.value)}
                />
                
                <Button type="submit" text="Save"></Button>
            </form> 
        </div>
    );
}

export default UploadItem;