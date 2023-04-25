import { Routes, Route } from "react-router-dom";
import Home from 'pages/Home/Home';
import About from 'pages/Home/About';
import Event from 'pages/Home/Event';

import Admin from "pages/Admin/Admin";
import AdminCreate from 'pages/Admin/Create';
import AdminDetail from 'pages/Admin/Detail';


const AppRoutes = () => {

    return (
        <Routes>
            <Route exact path="/" element={<Home />}/>
            <Route path="/event" element={<Event />}>
            <Route path="one" element={<div>첫 주문시 양배추즙 서비스</div>} />
            <Route path="two" element={<div>생일기념 쿠폰받기</div>}  />
            </Route>
            <Route path="/about" element={<About />}>
            <Route path="member" element={<div>about-member</div>} />
            <Route path="location" element={<div>???</div>}  />
            </Route>
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/create" element={<AdminCreate />}/>
            <Route path="/admin/detail/:id" element={<AdminDetail />}/>
            <Route path="*" element={<div>없는 페이지임</div>} /> 
        </Routes>
    )
}

export default AppRoutes;