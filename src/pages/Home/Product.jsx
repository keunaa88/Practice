import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listPost, clearPost } from "store/listSlice";
import Image from "components/Image";
import styles from './Product.module.css';

function Product({category}) {

    const navigate = useNavigate(); 
    const dispatch = useDispatch();
    
    const [activePage, setActivePage] = useState(1);
    const [data, setData] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    
    const handleClick = (id) => {
        navigate(`/detail/${id}`)
    };
   

    useEffect(() => {
        const skip = (activePage - 1) * 10;
        const limit = 10;
        console.log(category)
        dispatch(listPost({category, skip, limit})).then((response) => {
           setTotalCount(response.payload.count)
           setData(response.payload.data);
        });
        return () => {
          dispatch(clearPost());
        };
     }, [category, activePage]);
     console.log(totalCount);
     console.log(data);

    return (
        <div className="content">
            <div className={styles.productWrapper}>
            { data.map((item, i) => {
                return (
                    <div className={styles.box} onClick={() => handleClick(item._id)}>
                        <Image src={item.mainImg} style={{width: '300px', height: '300px'}}/>
                        <h3 className={styles.title}>{item.title}</h3>
                        <p className={styles.price}>${item.price}</p>
                    </div>
                )
            })
        }
        </div>
        </div>
    );

}

export default Product;