import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { readPost, clearPost } from 'store/readSlice';
import styles from './Detail.module.css';

function Detail() {
   
    const { id } = useParams(); // URL 경로에서 동적 매개변수 추출
    const read = useSelector((state) => state.read);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(readPost(id));
        return () => {
          dispatch(clearPost());
        };
     }, [dispatch, id]);
      
    return (
        <div className="content">
            <div className={styles.detailWapper}>
                <div className={styles.basicSection}>
                    <div className={styles.basicImage}>
                        <img src={read.post.mainImg}></img>
                    </div>
                    <div className={styles.basicDetail}>
                        <h2>{read.post.title}  </h2>
                        <p>{read.post.category}  </p>
                        <p>${read.post.price}  </p>
                    </div>
                </div>
                <div className={styles.contentSection}>
                    <div dangerouslySetInnerHTML={{__html : read.post.content}}></div>
                </div>
            </div>
        </div>
    )

}

export default Detail;