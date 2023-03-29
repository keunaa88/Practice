import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { Nav } from 'react-bootstrap';
import { Context1 } from '../App';
import {useSelector, useDispatch} from 'react-redux'
import { addItem } from './../store.js';

// styled components 장점
// 스타일이 다른 js파일로 오염되지 않음 Detail.module.css(detail에만 적용됨)/ 로딩시간 단축

// // lifecycle
// componentDidMount()
// componentDidUpdate()
// componentDidUnmount();


function Detail(props) {

    let state = useSelector((state) => { return state })

    let dispatch = useDispatch();

   
    //let {stock} = useContext(Context1); // 보관함 해체 함수

    let [alert, setAlert] = useState(true);
    let [count, setCount] = useState(0);
    let {id} = useParams();
    let item = props.shoes.find(el => el.id == id)
    let [typeAlert, setTypeAlert] = useState(false);
    let [text, setText] = useState('');
    let [tab, setTab] = useState(0);
    let [fade, setFade] = useState('');

    useEffect(() => {
        // let timer = setTimeout(() => {
        //     setAlert(false);
        // }, 2000); 
        // console.log('useEffect')
        // return () => {
        //     console.log('unmount')
        //     clearTimeout(timer);
        // }
       isNaN(text) ? setTypeAlert(true) : setTypeAlert(false);

       
       
           
       
    }, [text]) 

    useEffect(() => {
        setTimeout(() => { setFade('end'); }, 100);
        return (() => {
            setFade('')
        })
    }, []);



    // useEffect는 html이 렌더링 다 된 후 실행됨
    // 어려운 연산, 시간이 오래걸리는 작업, 서버에서 데이터 가져오는 작업등을 이 안에서 처리함

    useEffect(() => {}) // 1. 재렌더링마다 실행(mount, update)
    useEffect(() => {}, []) // 2. 마운티시 1회 코드 실행하고 싶으면
    useEffect(() => {
        return () => {
            // 3. unmount시 1회 코드 실행
            // 4. useEffect 실행 전에 뭔가 실행하려면 리턴 안에 써줌
            // (마운트 될때는 호출안됨)
            // clean up fucntion -기존 코드 지우는 경우에 마니 사용. 예를 들어 타이머 제거 
            // return함수는 useEffect동작 전에 실행됨
        }
    }, []);
    useEffect(() => {}, [count]) // 5. dependency 추가한 경우, 특정 값 변경시에만 


    
        let test = 'refund';
        let ui = {info: <p>i</p>,
        shipping : <p>s</p>,
        refund :  <p>r</p>}

    return (
        
        <div className={`container start ${fade}`}>
            <div>
             {
                ui [test]
            }
            </div>
            {alert ? 
            <div className="alert alert-warning">
                2초 이내 구매시 할인
            </div> : null
            }
            <div className="row">
                <div className="col-md-6">
                    <img src={'https://codingapple1.github.io/shop/shoes'+(id)+'.jpg'} width="100%" />
                </div>
                {/* {typeAlert ? 
                    <p style={{color: 'red'}}>경고: 숫자가아님</p> : null }
                    
           
                <input type="text" onChange={(e)=> { setText(e.target.value)}}>
                </input> */}
                <div className="col-md-6">
                    <h4 className="pt-5">{item.title}</h4>
                    <p>{item.price}</p>
                    <p>{item.content}</p>
                    <button className="btn btn-danger" onClick={() => {
                        dispatch(addItem({id: 3, name: item.title, count: 1}));  
                    }}>주문하기</button> 
                </div>
            </div>
            <Nav variant="tabs" defaultActiveKey="link0">
                <Nav.Item>
                    <Nav.Link eventKey="link0" onClick={() => { setTab(0)}}>버튼1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link1" onClick={() => { setTab(1)}}>버튼2</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link2" onClick={() => { setTab(2)}}>버튼3</Nav.Link>
                </Nav.Item>
            </Nav>
            <TabContent tab={tab}/>
            
        </div> 
    );
}

function TabContent({tab}) { 

   // let {stock, shoes} = useContext(Context1); // 보관함 해체 함수
  //  console.log('shoes', shoes);

    let [fade, setFade] = useState('');

    

    //tap이 바뀔때마다 end를 붙여줄것
    useEffect(() => {
        setTimeout(() => { setFade('end'); }, 100);
        return (() => {
            setFade('')
        })
    }, [tab]);

    return (
        <div className={`start ${fade}`}>
            {/* {[<div>{shoes[tab].title}</div>, <div>content 1</div>, <div>content 2</div>][tab]} */}
        </div>
    );
}

export default Detail;