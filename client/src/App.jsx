import { useState } from 'react'
import './App.css'
import SignUp from './components/Sign_up'
import Login from './components/Login'
import Lash from './components/Lash'

import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Users_page from './components/Users_page'

function App() {
 

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Lash/>}></Route>
      <Route path='/register' element={<SignUp/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/Users' element={<Users_page/>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
