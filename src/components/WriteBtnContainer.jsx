import React, { useState, forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import Button from '../components/Button';
import {imageUpload, contentUpload} from "../api/contentApi";

const BtnContainer = styled.div`{
    margin-top: 60px;
    text-align: end;
}`

const WriteBtnContainer = forwardRef((props, ref) => {

    const {mainImg, title, price, category, content, onErrorMsgChange } = props;
    const [errorMsg, setErrorMsg] = useState('');

    console.log('content', content)
    const navigate = useNavigate();
    const onCancel = () => {
        navigate(-1);
    };

    const onSave = async (event) => {
        event.preventDefault();
        if(validation()) {
            let response = await imageUpload(mainImg);
            const imgUrl = response.data.file.location 
            console.log(imgUrl)

            //content 처리해야함.
            //1. 이미지가 있으면 s3에 저장
            //2. 저장한 부분의 url받아와서 그 부분 처리 
            //3. 모든 데이터 다시 mongo에 저장

            response = await contentUpload({ title, price, category, content, imgUrl, created: new Date() });
        }
    };

    const changeErrorMassage = (msg) => {
        setErrorMsg(msg);
        onErrorMsgChange(msg);
    }
    
    const validation = (val) => {
        if(!mainImg) {
            changeErrorMassage({img: '! Please upload main image file!'})
            ref.imageRef.current.focus();
            return false;
        }
        if(!title) {
            changeErrorMassage({title: '! Please input title'})
            ref.titleInputRef.current.focus();
            return false;
        }
        if(!price) {
            changeErrorMassage({price: '! Please input price'})
            ref.priceInputRef.current.focus();
            return false;
        }
        return true;
    };


    return (
        <BtnContainer>
            <Button styleType="cancel" type="button" text="Cancel" onClick={onCancel}></Button>
            <Button styleType="confirm" type="button" text="Save"  onClick={onSave}></Button>
        </BtnContainer>
    );
});

export default WriteBtnContainer;