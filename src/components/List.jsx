import { format, parseISO } from 'date-fns'
import Table from 'react-bootstrap/Table';
import styles from "./List.module.css";
import Image from './Image';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

const List = ({list, headStyle, data}) => {

    const navigate = useNavigate();

    const handleClick = (id) => {
        navigate(`/admin/detail/${id}`)
    };
   
    const handleDelete = () => {
        console.log('de')
    }
    return (
        <Table  bordered  className={styles.tableWrapper}>
            <thead>
                <tr>
                    { list.map((item, i) => {
                        return ( 
                            <th style={{width: headStyle[i]}}>{item}</th>
                        )
                    })}
                </tr>
            </thead>
            <tbody>
                { data &&
                    data.map((item, i) => {
                        var dateString = format(parseISO(item.created), 'dd/MM/yyyy hh:mm')
                        return(
                            <tr key={i}>
                                <td><Image src={item.mainImg} style={{width:'70px', height:'70px'}} /></td>
                                <td className={styles.title}onClick={() => handleClick(item._id)}>{item.title}</td>
                                <td>{item.category}</td>
                                <td>{item.price}</td>
                                <td>{dateString}</td>
                            </tr>
                        )
                    })
                }
                
            </tbody>
        </Table>
    )

}


export default List;