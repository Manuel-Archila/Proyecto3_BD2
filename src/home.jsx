import './home.css';
import { useState, useEffect } from 'react'
import Sucursal from './sucursal/sucursal.jsx'
import NavBar from './navBar/navBar.jsx'

const Home = ({setSucursal}) => {

  const [sucursales, setSucursales] = useState([])
  const [modal, setModal] = useState(false)
  const [nombre, setNombre] = useState('')
  const [direccion, setDireccion] = useState('')
  const [nit, setNit] = useState('')
  const [categoria, setCategoria] = useState('')
  const [telefono, setTelefono] = useState('')
  const [forceRender, setForceRender] = useState(false);

  const getSucursales = async() => {
    const url = 'http://localhost:5000/api/sucursales'
    const response = await fetch(url, {
      method:'GET',
    })

    const responseJson = await response.json()
    console.log(responseJson)

    setSucursales(responseJson)
  }

  const createSucursal = async() => {
    const url = 'http://localhost:5000/api/agregar_sucursal'
    const response = await fetch(url, {
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "nombre": nombre,
        "direccion": direccion,
        "nit": nit,
        "categoria": categoria,
        "telefono": telefono
      })
    })
    
    const responseJson = await response.json()
    console.log(responseJson)
    setForceRender(!forceRender);
  }

  useEffect( () => {
    getSucursales()
  },[forceRender])



  const handleClick = () => {
    setModal(true)

  }

  const closeModal = () => {
    setModal(false)
  }

  const addSucursal = async() => {
    createSucursal()
    closeModal()
  }

  

  return (
      <div className="App">
        {
        modal && 
          <div className="modalin-container">
            <div className="modalin">
              <div className='close-button' onClick={closeModal}/>
              <div className="modalin-header">
                <h3>Crea una nueva sucursal</h3>
              </div>
              <div className="modalin-content">
                <div className='field-container'>
                  <div>Nombre:</div>
                  <input type="text" className='field' onChange={(e) => setNombre(e.target.value)}/>
                </div>
                <div className='field-container'>
                  <div>Dirección:</div>
                  <input type="text" className='field' onChange={(e) => setDireccion(e.target.value)}/>
                </div>
                <div className='field-container'>
                  <div>NIT:</div>
                  <input type="text" className='field' onChange={(e) => setNit(e.target.value)}/>
                </div>
                <div className='field-container'>
                <label htmlFor="categoria">Categoría</label>
                    <select name="categoria" id="categoria" onChange={(e) => setCategoria(e.target.value)}>
                        <option value="">Seleccione una categoría</option>
                        <option value="Supermercado">Supermercado</option>
                        <option value="Tienda">Tienda</option>
                    </select>
                </div>
                <div className='field-container'>
                  <div>Telefono:</div>
                  <input type="text" className='field' onChange={(e) => setTelefono(e.target.value)}/>
                </div>
              </div>
              <div className="modalin-footer">
                <button type="button" className="modalin-button" onClick={addSucursal}>Crear</button>
              </div>
            </div>
          </div>
        }

          <div className="sucursales">
          {
              sucursales.map((sucursal, index) => (
                <Sucursal key={index} sucursal={sucursal} setSucursal={setSucursal}/>
              ))
          }
              <button className="add" onClick={handleClick}></button>
          </div>
      </div>

  )

}

export default Home