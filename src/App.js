import './App.css';

import React from "react";
import AppRoutes from 'AppRoutes';

import Navbar from 'components/Navbar';
import Home from 'pages/Home/Home';
import Footer from 'components/Footer';

// //성능개선
// const Detail = lazy(() => import('./routes/Detail'));
// const Cart = lazy(() => import('./routes/Cart'));

//main change
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
