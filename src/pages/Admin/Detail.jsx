import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { readPost, clearPost } from 'store/readSlice';

function Detail() {
   
    const { id } = useParams(); // URL 경로에서 동적 매개변수 추출
    const read = useSelector((state) => state.read);

    const dispatch = useDispatch();

    useEffect(() => {
        console.log('111')
        dispatch(readPost(id));
        return () => {
          dispatch(clearPost());
        };
     }, [dispatch, id]);
      
    console.log(read.post)
    return (
        <>
        <p>{read.post.id}  </p>
        <p>{read.post.title}  </p>
        <p>{read.post.mainImg}  </p>
        <p>{read.post.category}  </p>
        <p> {read.post.price}  </p>
        <p> {read.post.content}  </p>
        </>
    )

}

export default Detail;