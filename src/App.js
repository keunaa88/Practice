import logo from './logo.svg';
import './App.css';
import { Nav, Navbar, Container, Row } from 'react-bootstrap';
import data from './data.js';
import { createContext, useState } from 'react';
import Card from './component/Card';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import Detail from './routes/Detail';
import About from './routes/About';
import Event from './routes/Event';
import Cart from './routes/Cart';
import axios from 'axios';
import { useSelector } from 'react-redux'

export let Context1 = createContext(); // 역할? 컨텍스트를 만들어줌. 쉽게, state의 보관함이라고 생각하면 됨

function App() {

  // let test = useSelector((state) => {return state});
  // console.log('test', test)
  
  let [shoes, setShoes] = useState(data);
  let navigate = useNavigate(); //페이지 이동을 도와주는 함수 
  let [clickCnt, setClickCnt] = useState(0);
  let [isSuccess, setIsSuccess] = useState(true);
  let [loading, setLoading] = useState(false);

  let [stock] = useState([10, 11, 20]);
  //이를 디테일, 탭에사 쓰려면? 전달 전달해도 되지만 context사용가능




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
        </Container>
      </Navbar>
      {/* link태그는 a태그 생겨서 꼴보기싫으니 navitage쓰셈 
      <Link to="/">홈</Link>
      <Link to="/detail">상세페이지</Link>*/}
      <Routes>
          
          <Route path="/" element={
            <>
              <div className="main-bg"></div>
              {loading ? <p>로딩중입니다</p> : null }
              <Container>
                <Row>
                  {shoes.map((shoes, i) => {
                    return (
                      <Card shoes={shoes} i={i} key={i}></Card>
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
          
            <Route path="/detail/:id" element={<Detail shoes={shoes}/>}/>
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
      
    </div>
  );
}

export default App;
