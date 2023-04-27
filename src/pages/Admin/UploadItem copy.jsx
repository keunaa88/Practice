import React, { useState , useRef, useEffect } from 'react';
import styles from "./UploadItem.module.css";
import Input from '../components/Input'
import icon from "../assets/icon/plus.jpg"; 
import Editor from '../components/Editor'
import Button from '../components/Button';
import WriteBtnContainer from '../components/WriteBtnContainer';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, setPostData } from '../store/writeSlice';

function UploadItem() {

   // const [title, setTitle] = useState('');
    //const [price, setPrice] = useState('');
    //const [category, setCategory] = useState('top');
    
    const { category, title, price, content } = useSelector((state) => state.write);
    const [errorMsg, setErrorMsg] = useState({img: '', title: '', price: ''});
    
    const [mainImg, setMainImg] = useState(null);
    const [previewImg, setPreviewImg] = useState(null);
    //const [content, setContent] = useState('');

    const titleInputRef = useRef(null);
    const priceInputRef = useRef(null);
    const inputFileRef = useRef(null);
    const imageRef = useRef(null);
    const dispatch = useDispatch();

    const onImageClick = () => {
        inputFileRef.current.click();
    };

    const onDeleteImg = () =>{
        setMainImg(null);
        setPreviewImg(null);
    };

    const onSaveImgFile = () => {
        const file = inputFileRef.current.files[0];
        setMainImg(file)
        setErrorMsg({img: ''});
        if(!file) return;
        if(!file.type.startsWith('image/')) {
            alert('please upload image file');
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewImg(reader.result);
        };
    };

    const handleErrorMsgChange = (errorMsg) => {
      setErrorMsg(errorMsg);
    };

    const handleEditorChange = (content) => {
        setContent(content)
        console.log('content', content)
    };
    


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        console.log('name: ', name, 'value: ',  value)
        dispatch(setPostData({ ...{ title, category, price }, [name]: value }));
      };
    
    
    // const write = useSelector(state => {
    //     console.log(state);

    // })

    // let a = useSelector((state) => { return state})
    // console.log('a', a)
   

//dispatch({type: 'writeSlice/changeContent', step: 2})
    return (
        <div className={styles.formWrapper}>
            <div className={styles.line}>
                <h2>ADD NEW PRODUCT </h2>
            </div>
            <form className={styles.adminForm}>
                <div>
                    <div className={styles.field}  >
                        <label htmlFor="main image">Main image</label>
                        <div className={styles.imgWrapper} ref={imageRef}  tabIndex="0"> 
                            <input type="file" id="file" ref={inputFileRef} accept="image/gif, image/jpeg, image/png" style={{display: "none"}} onChange={onSaveImgFile}/>
                            <img  src={previewImg ? previewImg : icon} alt="preview" onClick={onImageClick} />
                            { previewImg && <Button text="Delete" type="button" onClick={onDeleteImg}/>}
                        </div>
                        { errorMsg.img && <span className={styles.error}>{errorMsg.img}</span> }
                    </div>
                    <Input 
                        labelText="Category" 
                        type="select" 
                        value={category} 
                        name="category"
                        onChange={handleInputChange}/>
                    <Input 
                        labelText="Product name" 
                        type="text" 
                        value={title} 
                        name="title"
                        onChange={handleInputChange} 
                        ref={titleInputRef} />
                        { errorMsg.title && <span className={styles.error}>{errorMsg.title}</span> }
                    <Input 
                        labelText="Price(AUD)" 
                        type="number" 
                        value={price} 
                        name="price"
                        placeholder='Please input only number' 
                        ref={priceInputRef}
                        onChange={handleInputChange}
                    />
                        { errorMsg.price && <span className={styles.error}>{errorMsg.price}</span> }
                    <div className={styles.field}  >
                        <label htmlFor="content">Content</label>
                        <Editor />
                    </div>
                </div>
                <WriteBtnContainer 
                    title={title} 
                    category={category}
                    price={price} 
                    mainImg={mainImg} 
                    onErrorMsgChange={handleErrorMsgChange}
                    content={content}
                    ref={{ imageRef: imageRef, titleInputRef:titleInputRef, priceInputRef : priceInputRef}}
                ></WriteBtnContainer>
            </form> 
        </div>
    );
}

export default UploadItem;



// return (
//     <div className={styles.formWrapper}>
//         <div className={styles.line}>
//             <h2>ADD NEW PRODUCT </h2>
//         </div>
//         <form className={styles.adminForm}>
//             <div>
//                 <div className={styles.field}  >
//                     <label htmlFor="main image">Main image</label>
//                     <div className={styles.imgWrapper} ref={imageRef}  tabIndex="0"> 
//                         <input type="file" id="file" ref={inputFileRef} accept="image/gif, image/jpeg, image/png" style={{display: "none"}} onChange={onSaveImgFile}/>
//                         <img  src={previewImg ? previewImg : icon} alt="preview" onClick={onImageClick} />
//                         { previewImg && <Button text="Delete" type="button" onClick={onDeleteImg}/>}
//                     </div>
//                     { errorMsg.img && <span className={styles.error}>{errorMsg.img}</span> }
//                 </div>
//                 <Input labelText="Category" type="select" value={category} onChange={setCategory}/>
//                 <Input labelText="Product name" type="text" value={title}
//                     onChange={(event) => { setTitle(event.target.value);  handleErrorMsgChange({title:''})}}//setTitle(event.target.value);
//                     ref={titleInputRef}
//                 />
//                 { errorMsg.title && <span className={styles.error}>{errorMsg.title}</span> }
//                 <Input
//                     labelText="Price(AUD)"
//                     type="number" 
//                     value={price}
//                     placeholder='Please input only number'
//                     ref={priceInputRef}
//                     onChange={(event) => { setPrice(event.target.value); handleErrorMsgChange({price:''})}}
//                 />
//                 { errorMsg.price && <span className={styles.error}>{errorMsg.price}</span> }
//                 <div className={styles.field}  >
//                     <label htmlFor="content">Content</label>
//                     <Editor />
//                 </div>
//             </div>
//             <WriteBtnContainer 
//                 title={title} 
//                 category={category}
//                 price={price} 
//                 mainImg={mainImg} 
//                 onErrorMsgChange={handleErrorMsgChange}
//                 content={content}
//                 ref={{ imageRef: imageRef, titleInputRef:titleInputRef, priceInputRef : priceInputRef}}
//             ></WriteBtnContainer>
//         </form> 
//     </div>
// );