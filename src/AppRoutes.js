import { Routes, Route } from "react-router-dom";
import Home from 'pages/Home/Home';
import About from 'pages/Home/About';
import Event from 'pages/Home/Event';
import Product from "pages/Home/Product";
import Admin from "pages/Admin/Admin";
import AdminCreate from 'pages/Admin/Create';
import AdminDetail from 'pages/Admin/Detail';
import NotFound from "pages/NotFound";
import Detail from "pages/Home/Detail";

const AppRoutes = () => {
    return (
        <Routes>
            
            <Route exact path="/" element={<Home />}/>
            <Route path="/best" element={<Product category='best'/>} />
            <Route path="/top" element={<Product category='top'/>} />
            <Route path="/pants" element={<Product category='pants'/>} />
            <Route path="/dress" element={<Product category='dress'/>} />
            <Route path="/bag" element={<Product category='bag'/>} />
            <Route path="/detail/:id" element={<Detail />}/>
            <Route path="/shoes" element={<Product />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/create" element={<AdminCreate />}/>
            <Route path="/admin/detail/:id" element={<AdminDetail />}/>
            <Route path="*" element={<NotFound />} /> 
        </Routes>
    )
}

export default AppRoutes;