import logo from './logo.svg';
import './App.css';
import { Nav, Navbar, Container, Row } from 'react-bootstrap';
import data from './data.js';
import { lazy, Suspense, createContext, useState, useEffect } from 'react';
import Card from './components/Card';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux'
import { useQuery } from "react-query"


//import Detail from './routes/Detail';
import About from './pages/About';
import Event from './routes/Event';
//import Cart from './routes/Cart';

//성능개선
const Detail = lazy(() => import('./routes/Detail'));
const Cart = lazy(() => import('./routes/Cart'));



export let Context1 = createContext(); // 역할? 컨텍스트를 만들어줌. 쉽게, state의 보관함이라고 생각하면 됨

function App() {


  
  const callApi = async() => {
    axios.get("/api").then((res) => console.log(res.data));
  };
  useEffect(() => {
    callApi();
  }, []);

 

  // let test = useSelector((state) => {return state});
  // // console.log('test', test)
  // let obj = {name: 'kim'}; 
  // // json.stringify(obj)으로 해주면, json으로 바꿔주는 것.
  // localStorage.setItem('data', JSON.stringify(obj))
  // // json을 obj로 바꿔주는거
  // console.log(JSON.parse(localStorage.getItem('data')).name);


  //let obj = JSON.stringify('')

  useEffect(() => {
    
    !localStorage.getItem('watched') && localStorage.setItem('watched', JSON.stringify([]))
    
  }, []) // 마운트 될때만 실행 
  

  let [shoes, setShoes] = useState(data);
  let navigate = useNavigate(); //페이지 이동을 도와주는 함수 
  let [clickCnt, setClickCnt] = useState(0);
  let [isSuccess, setIsSuccess] = useState(true);
  let [loading, setLoading] = useState(false);

  let [stock] = useState([10, 11, 20]);
  //이를 디테일, 탭에사 쓰려면? 전달 전달해도 되지만 context사용가능

  // axios.get('https://codingapple1.github.io/userdata.json')
  //   .then((data) => {
  //     console.log(data.data)
  //   })
 
  // 위에 axis대신만 쓰지않고 아래와 같이 리액트 쿼리써서 사용
  // 장점 1. 공/실패/로딩중 쉽게 파악가능 
  // 장점 2. 틈만나면 요청함 = refetch  / sns 코인거래소 이런 실시간데이터를 사용할때 완전 유용
  // 너무 자주 요청하면 아래 타이머? 같은 staelTime 사용할것
  // 실패시 알아서 여러번 요청함
  // state공유 안해도됨. ajax요청 코드 그냥 한번 더 써주면됨
  // 캐싱 기능 있음. 똑같은 경로로 요청하면, 그 결과를 일정 시간동안 우선적으로 보내준 뒤 ajax요청
  // reqct-query 이용하여 ajax요청 리턴 2개 필수
  let result = useQuery('a', () => {
    return axios.get('https://codingapple1.github.io/userdata.json').then((result) => {
       console.log('요청됨')
       return result.data
    })
    //{ staleTime : 2000 }
  });

  /*
  result.data 
  result.isLoading //로딩중일때 true / false
  result.error // 에러 났을때 true / false
*/

 

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Sydney Shopping</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => { navigate('/')}}>Home</Nav.Link>            
            <Nav.Link onClick={() => { navigate('/event')}}>Event</Nav.Link>
            <Nav.Link onClick={() => { navigate('/detail/1')}}>Detail</Nav.Link>
            <Nav.Link onClick={() => { navigate('/about')}}>About</Nav.Link>
            <Nav.Link onClick={() => { navigate('/cart')}}>Cart</Nav.Link>
          </Nav>
          <Nav className="ms-auto" style={{color : 'white'}}> 
            {/* { result.isLoading ? '로딩중' : result.data.name } */}
            { result.isLoading && '로딩중'}
            { result.error && '에러남'}
            { result.data && result.data.name}
          </Nav>
        </Container>
      </Navbar>
      {/* link태그는 a태그 생겨서 꼴보기싫으니 navitage쓰셈 
      <Link to="/">홈</Link>
      <Link to="/detail">상세페이지</Link>*/}
      <Suspense fallback={<div>로딩중</div>}>
      <Routes>
          
          <Route path="/" element={
            <>
              <div className="main-bg"></div>
              {loading ? <p>로딩중입니다</p> : null }
              <div>
                {
                  JSON.parse(localStorage.getItem('watched'))
                }
              </div>
              <Container>
                <Row>
                  {shoes.map((shoes, i) => {
                    return (
                      <Card shoes={shoes} i={i} key={i} ></Card>
                    );
                  })} 
                </Row>
              </Container>
              <button onClick={() => {
                
                clickCnt++;
                setClickCnt(clickCnt);
                setLoading(true);
                axios.get('https://codingapple1.github.io/shop/data'+(clickCnt+1)+'.json')
                .then((result)=>{
                  console.log(result.data);
                  let copy = [...shoes, ...result.data];
                  setShoes(copy);
                  setLoading(false);
                })
                .catch((e)=> {
                  console.log('실패');
                  setIsSuccess(false);
                  setLoading(false);
                });

                //  Promise.all([ axios.get('/url1'), axios.get('/url2')])
                //  .then(() => {

                //  });

                //  fetch('https://codingapple1.github.io/shop/data3.json')
                //  .then(결과 => 결과.json()) // json -> array/object로 변환 과정 필요함
                 
              }}>버튼</button>
              { isSuccess ? null : <p>데이터를 로딩하는데 실패하였습니다</p> }
            </>
          }/>
          
            <Route path="/detail/:id" element={<Detail shoes={shoes}/>} />
            <Route path="/cart" element={<Cart />} />
          
          {/* 작명한 값 아무거나 넣고 뒤에 숫자 넣으면, 알아서 잘 보여줌 
          리액트 라우터 적으로 어케함????? */}

          <Route path="/event" element={<Event />}>
            <Route path="one" element={<div>첫 주문시 양배추즙 서비스</div>} />
            <Route path="two" element={<div>생일기념 쿠폰받기</div>}  />
          </Route>
          {/* Nested Routes, /about/member*/}
          <Route path="/about" element={<About />}>
            <Route path="member" element={<div>about-member</div>} />
            <Route path="location" element={<div>???</div>}  />
          </Route>
          <Route path="*" element={<div>없는 페이지임</div>} /> 
          {/* 404페이지 만들기 */}
        </Routes>
        </Suspense>
    </div>
  );
}

export default App;
