import './home.css';
import { useState, useEffect } from 'react'
import Sucursal from './sucursal/sucursal.jsx'
import NavBar from './navBar/navBar.jsx'

const Home = ({setSucursal}) => {

  const [sucursales, setSucursales] = useState([])

  const getSucursales = async() => {
    const url = 'http://localhost:5000/api/sucursales'
    const response = await fetch(url, {
      method:'GET',
    })

    const responseJson = await response.json()
    console.log(responseJson)

    setSucursales(responseJson)
  }

  useEffect( () => {
    getSucursales()
    
  },[])
  

  return (
      <div className="App">
          <div className="sucursales">
          {
              sucursales.map((sucursal, index) => (
                <Sucursal key={index} sucursal={sucursal} setSucursal={setSucursal}/>
              ))
          }
              <button className="add"></button>
          </div>
      </div>

  )

}

export default Home