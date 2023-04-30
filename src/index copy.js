import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
//import store from './store.js'
import { QueryClient, QueryClientProvider } from 'react-query'
import { configureStore } from '@reduxjs/toolkit';
import store from './store/store'

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // <React.StrictMode>
  //아래와 같이 프로바이더를 써주면(리덕스)
  //APP에 있는, 자식에 있는 곳에서 모든 state사용가능
  //QueryClient >>>> react-query 실시간 데이터에 사용하는 라이브러리
  //<QueryClientProvider client = {queryClient} > 
    <Provider store = {store}> 
      <BrowserRouter>
        <App /> 
      </BrowserRouter>
    </Provider>
  //</QueryClientProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
