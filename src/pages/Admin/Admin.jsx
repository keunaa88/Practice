import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { listPost, clearPost } from 'store/listSlice';
import Button from "../../components/Button";
import styles from "./Admin.module.css";
import Paging from 'components/Paging';
import List from 'components/List';
function Admin() {
    
    const navigate = useNavigate(); 
    const dispatch = useDispatch();
    
    const [activePage, setActivePage] = useState(1);
    const [data, setData] = useState([]);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        const category = null;
        const skip = (activePage - 1) * 10;
        const limit = 10;
        dispatch(listPost({category, skip, limit})).then((response) => {
           setTotalCount(response.payload.count)
           setData(response.payload.data);
        });
        return () => {
          dispatch(clearPost());
        };
     }, [activePage]);


     const handlePageChange = (activePage) => {
       setActivePage(activePage);
     };

     const headList = ['Image', 'Product', 'Category', 'Price', 'Created']
     const headStyle = ['20%', '40%', '10%', '10%', '20%']

    return (
            <div className="content">
                <div className={styles.buttonWrapper}>
                    <Button text="Add Product" onClick={() => {  navigate("/admin/create"); }}></Button>
                </div>
                <div>
                    <List list={headList} headStyle = {headStyle} data={data}></List>
                </div>
                <Paging activePage={activePage} itemsCountPerPage={10} totalItemsCount={totalCount} setActivePage={handlePageChange}/>
            </div>
    );
}

export default Admin;