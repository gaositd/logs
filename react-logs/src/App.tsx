import React from "react";
import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

import { Route, Routes } from 'react-router-dom';
import { Page } from './page';
import { Admin } from './components/admin/index';
import { NewServer } from "./components/admin/newServer/NewServer";
import { UpdateServer }  from './components/admin/updateServer/UpdateServer';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
      <Route path='/' element={<Page />} />
      <Route path='/admin' element={<Admin />} />
        <Route path="/admin/newServer" element={<NewServer />} />
        <Route path="/admin/updateServer/:id" element={<UpdateServer />} />
      <Route path='*' element={<Page />} />
    </Routes>
    </>
  )
}

export default App
