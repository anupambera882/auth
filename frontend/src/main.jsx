// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { RecoilRoot } from 'recoil'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <BrowserRouter>
      <RecoilRoot>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </RecoilRoot>
    </BrowserRouter>
  // </React.StrictMode>,
);