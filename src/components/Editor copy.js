import React, { useState, useMemo, useRef, useCallback } from "react"
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"
import styles from "./Editor.module.css";
import {uploadImageToS3} from "../api/contentApi";



const Editor = React.memo(({ onChangeContent }) => {


  
    const { content  } = useSelector((state) => state.write);
    console.log('Editor 호출!');
    const [content, setContent] = useState('');
    const quillRef = useRef();

    const handleEditorChange = (value) => {
        setContent(value);
       // onChangeContent(value); 
    };


    const handleImageUpload  = () => {
        console.log('에디터에서 이미지 버튼을 클릭하면 이 핸들러가 시작됩니다!');
      
        // 1. 이미지를 저장할 input type=file DOM을 만든다.
        const input = document.createElement('input');
        // 속성 써주기
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click(); // 에디터 이미지버튼을 클릭하면 이 input이 클릭된다.
        // input이 클릭되면 파일 선택창이 나타난다.
      
        // input에 변화가 생긴다면 = 이미지를 선택
        input.addEventListener('change', async () => {
          const file = input.files[0];
          console.log('file', file)
          try {
            const response = await uploadImageToS3(file);
            const imgUrl = response.data.file.location 
            console.log('성공 시, 백엔드가 보내주는 데이터', imgUrl);
            
            // write image tag into editor
            // 2. get current location of editor
            // 3. insert image
            const editor = quillRef.current.getEditor(); // 에디터 객체 가져오기
            const range = editor.getSelection();

            editor.insertEmbed(range.index, 'image', imgUrl);
          } catch (error) {
            console.log('error: ', error);
          }
        });
      };

    const module = useMemo(() => {
        console.log('module생성');
        return {
            toolbar: {
                container: [
                    [{ header: '1' }, { header: '2' }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    ['link', 'image'],
                ],
                handlers : {
                    image: handleImageUpload
                }
            }
        };
    }, []); // caching after randering 

    const formats = [
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'ordered',
        'bullet',
        'link',
        'image',
      ];

    return (
        <ReactQuill 
            className={styles.reactQuill}
            ref={quillRef}
            theme="snow"
            modules={module}
            formats={formats}
            value={content}
            onChange={handleEditorChange}
            placeholder={'Please input product detail.'}
        />

    );
});

export default Editor;