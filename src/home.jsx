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
  const [productos, setProductos] = useState([])
  const [productosAPI, setProductosAPI] = useState([])
  const [producto, setProducto] = useState('')
  const [servicio, setServicio] = useState("")

  const getSucursales = async() => {
    const url = 'http://localhost:5000/api/sucursales'
    const response = await fetch(url, {
      method:'GET',
    })

    const responseJson = await response.json()
    console.log(responseJson)

    setSucursales(responseJson)
  }

  const getProductos = async() => {
    const url = 'http://localhost:5000/api/productos'
    const response = await fetch(url, {
      method:'GET',
    })

    const responseJson = await response.json()
    console.log(responseJson)

    let lista = []
    for (let i = 0; i < responseJson.length; i++) {
      lista.push(responseJson[i].nombre)
    }
    setProductosAPI(lista)
  }

  const createSucursal = async() => {
    console.log(productos)
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
        "telefono": telefono,
        "productos": productos,
        "servicio": servicio,
      })
    })
    
    const responseJson = await response.json()
    console.log(responseJson)
    setForceRender(!forceRender);
  }

  useEffect( () => {
    getSucursales()
  },[forceRender])


  const agregarProductos = () => {
    if (producto === '') {
      return
    }
    // eliminar el producto de la lista de productos API
    let index = productosAPI.indexOf(producto)
    if (index > -1) {
      productosAPI.splice(index, 1);
    }
    setProductosAPI(productosAPI)

    setProductos(productos.concat(producto))
    setProducto('')
  }

  const handleClick = () => {
    getProductos()
    setModal(true)

  }

  const closeModal = () => {
    setModal(false)
    setProductos([])
    setProducto('')
  }

  const addSucursal = async() => {
    createSucursal()
    closeModal()
    setProductos([])
    setProducto('')
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
                <div className='field-container'>
                  <div>Nombre del Servicio:</div>
                  <input type="text" className='field' onChange={(e) => setServicio(e.target.value)}/>
                </div>
              </div>
              <div className='separador-producto'/>
                <div className="modal-form-item">
                    <label htmlFor="producto">Agregar producto:</label>
                    <select name="producto" id="producto" onChange={(e) => setProducto(e.target.value)}>
                        <option value="">Seleccione un producto</option>
                        {productosAPI.map((producto) => (
                            <option key={producto} value={producto}>{producto}</option>
                        ))}
                    </select>
                    <button className="modal-form-item-btn-agregar" onClick={() => agregarProductos()}>Agregar</button>
                </div>
                <div className="modal-form-item">
                    <div className="modal-form-item-list">
                        <h3>Lista de productos</h3>
                        <ul>
                        {
                            productos.map((item, index) => (
                                    <li key={index}>
                                        {item}
                                    </li>
                            ))
                        }
                        </ul>
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