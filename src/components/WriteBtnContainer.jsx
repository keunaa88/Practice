import React, { useState, forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import Button from '../components/Button';
import { uploadImageToS3fromURL, contentUpload} from "../api/contentApi";
import { useSelector, useDispatch } from 'react-redux';
import { setErrorMessage, clearField } from '../store/writeSlice';

const BtnContainer = styled.div`{
    margin-top: 60px;
    text-align: end;
}`

const WriteBtnContainer = forwardRef((props, ref) => {

    const { image, category, title, price, content, errorMessage } = useSelector((state) => state.write);

    const navigate = useNavigate();
    const onCancel = () => {
        navigate(-1);
    };

    const onSave = async (event) => {
        event.preventDefault();
        if(validation()) {
            //content내 이미지 다시 확인- 필요없는거 삭제해줄것
            try {
                let response = await uploadImageToS3fromURL(image);
                const mainImg = response.data.file.location 
                response = await contentUpload({ mainImg, title, price, category, content, created: new Date() });
                const id = response.data.insertedId;
                dispatch(clearField())
                alert('Success to save data')
                navigate(`/admin/detail/${id}`)
                // saved 된 화면으로 이동하렴
            } catch (error) {
                alert('Fail to save data, please re-try.')
                console.error('저장 실패', error);
            }
        }
    }

    const dispatch = useDispatch();
    const changeErrorMessage = (payload) => { dispatch(setErrorMessage(payload))};

    const validation = () => {
        console.log('validation:', image, category, title, price, content, errorMessage)
        if(!image) {
            changeErrorMessage({key: 'image', value: '! Please upload main image file!'})
            ref.previewImageRef.current.focus();
            return false;
        }
        if(!title) {
            changeErrorMessage({key: 'title', value: '! Please input title'})
            ref.titleInputRef.current.focus();
            return false;
        }
        if(!price) {
            changeErrorMessage({key: 'price', value: '! Please input price'})
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