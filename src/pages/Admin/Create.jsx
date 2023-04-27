import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../../components/Input';
import Selectbox from '../../components/Selectbox';
import Editor from '../../components/Editor';
import WriteBtnContainer from '../../components/WriteBtnContainer';
import PreviewImage from '../../components/PreviewImage';
import { categoryOptions } from '../../common/options';
import { changeField, setErrorMessage } from '../../store/writeSlice';
import styles from "./Create.module.css";

function Create() {

    const { category, title, price, content, errorMessage } = useSelector((state) => state.write);

    const refs = {
        previewImageRef: useRef(null),
        imageFileRef: useRef(null),
        titleInputRef: useRef(null),
        priceInputRef: useRef(null),
      };

    const dispatch = useDispatch();
    const onChangeField = (payload) => { dispatch(changeField(payload))};
    
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        onChangeField({ key: name, value: value });
        dispatch(setErrorMessage({ key: name, value: ''}));
     };
     return (
        <div className={styles.formWrapper}>
            <div className={styles.line}>
                <h2>ADD NEW PRODUCT </h2>
            </div>
            <form className={styles.adminForm}>
                <div>
                    <PreviewImage 
                        labelText="main image"
                        ref={{previewImageRef : refs.previewImageRef, imageFileRef : refs.imageFileRef}}
                    />
                    <Selectbox 
                        labelText="Category" 
                        type="select" 
                        value={category} 
                        name="category"
                        options={categoryOptions}
                        onChange={handleInputChange}
                    />
                    <Input 
                        labelText="Product name" 
                        type="text" 
                        value={title} 
                        name="title"
                        errorMessage={errorMessage.title}
                        onChange={handleInputChange} 
                        ref={refs.titleInputRef} 
                    />
                    <Input 
                        labelText="Price(AUD)" 
                        type="number" 
                        value={price} 
                        name="price"
                        errorMessage={errorMessage.price}
                        placeholder='Please input only number' 
                        ref={refs.priceInputRef}
                        onChange={handleInputChange}
                    />
                    <div className={styles.field}  >
                        <label htmlFor="content">Content</label>
                        <Editor />
                    </div>
                </div>
                <WriteBtnContainer ref = {refs} />
            </form> 
        </div>
    );
}

export default Create;

