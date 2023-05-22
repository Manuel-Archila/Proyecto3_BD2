import './App.css'
import Infosucursal from './infosucursal/infosucursal.jsx'
import Home from './home.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react'
import NavBar from './navbar/navbar.jsx'
import Pedidos from './pedidos/pedidos.jsx'

const App = () => {

  const [sucursal, setSucursal] = useState('')

  return (
    <BrowserRouter>
    
      <NavBar/>
      <Routes>
        <Route path="/" exact element={<Home setSucursal={setSucursal}/>} />
        <Route path="/infoSucursal" exact element={<Infosucursal sucursal = {sucursal}/>} />
        <Route path="/pedido" exact element={<Pedidos/>} />
      </Routes>
      
    </BrowserRouter>
  )
}

export default App
