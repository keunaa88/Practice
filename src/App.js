import './App.css';

import React from "react";
import AppRoutes from 'AppRoutes';

import Navbar from 'components/Navbar';
import Home from 'pages/Home/Home';
import Footer from 'components/Footer';

// //성능개선222
// const Detail = lazy(() => import('./routes/Detail'));
// const Cart = lazy(() => import('./routes/Cart'));

//bugs 1.0-1.8.x (2)
function App() {

  return (
    <div className="App">
      <Navbar></Navbar>
      <AppRoutes />
      <Footer></Footer>
     </div>  
  );
}

export default App;
