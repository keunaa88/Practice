import './App.css';

import React from "react";
import { Routes, Route, Switch } from "react-router-dom";
import Home from './pages/Home';
import MyPage from './pages/MyPage';
import Detail from './pages/Detail';
import About from './pages/About';
import Event from './pages/Event';
import Cart from './pages/Cart';
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Navbar from './components/Navbar';
import UploadItem from './pages/UploadItem';

// //성능개선
// const Detail = lazy(() => import('./routes/Detail'));
// const Cart = lazy(() => import('./routes/Cart'));


function App() {

  return (
    <div className="App">
        <Navbar></Navbar>
        <div className="content">
        <Routes>
          {/* <Route path="/detail/:id" element={<Detail shoes={shoes}/>} />
              <Route path="/cart" element={<Cart />} /> */}
            
            <Route path="/" element={<Home />}></Route>
            <Route path="/event" element={<Event />}>
              <Route path="one" element={<div>첫 주문시 양배추즙 서비스</div>} />
              <Route path="two" element={<div>생일기념 쿠폰받기</div>}  />
            </Route>
            {/* Nested Routes, /about/member*/}
            <Route path="/about" element={<About />}>
              <Route path="member" element={<div>about-member</div>} />
              <Route path="location" element={<div>???</div>}  />
            </Route>

            <Route path="/admin" element={<Admin />}></Route>
            <Route path="/uploadItem" element={<UploadItem />}></Route>
            <Route path="*" element={<div>없는 페이지임</div>} /> 
            {/* 404페이지 만들기 */}
        </Routes>
        
       </div>
    </div>
  );
}

export default App;
