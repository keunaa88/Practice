
import { useEffect, useState } from "react";
import styles from "./Paging.module.css"


const Paging = (props) => {

    const { activePage, itemsCountPerPage, totalItemsCount, setActivePage } = props;
    const [pageButtons, setPageButtons] = useState([]);

    const handlePageChange = (event) => {
      window.scrollTo(0, 0);
        setActivePage(event.target.value);
    };
    const handlePagePrev = (firstIndex) => {
      setActivePage(firstIndex - 1)
    }
    const handlePageNext = (firstIndex) => {
      setActivePage(firstIndex + 10)
    }

   useEffect(() =>{
      drawPagination();
    }, [activePage, totalItemsCount])
  
    const drawPagination = () => { 
      const buttons = [];
      let button = '';
      const totalPage = Math.ceil( totalItemsCount / itemsCountPerPage ) // 총 페이지 갯수
      const firstIndex = (Math.ceil(activePage / 10) - 1) * 10 + 1;
      const lastIndex = Math.min(firstIndex + 10 - 1, totalPage);

      button = <button  key='prev' className='page-item'  value='prev' onClick={() => handlePagePrev(firstIndex)} disabled={firstIndex == 1 ? true : false}>PREV</button>
      buttons.push(button);
      //console.log('activePage', activePage, 'totalPage', totalPage, ':::: firstIdx & lastIdc', firstIndex, lastIndex)
      for (let i = firstIndex; i <= lastIndex ; i++) {
        let buttonStyle = activePage == i ? {'color': 'red'} : {};
        button = <button key={i} className='page-item' style={buttonStyle} value={i} onClick={handlePageChange}>{i}</button>;
        buttons.push(button);
      }
      button = <button key='next' className='page-item' value='next' onClick={() => handlePageNext(firstIndex)} disabled={lastIndex == totalPage ? true : false}>NEXT</button>
      buttons.push(button);
      setPageButtons(buttons);
    } 

    return (
        <div className={styles.paginationWrapper}>
          <ul className={styles.pagination}>
            {pageButtons}
          </ul>
        </div>
    )


};

export default Paging;