import './infosucursal.css';
import NavBar from '../navbar/navbar.jsx';
import { useState } from 'react'
import InfoPedido from '../infoPedido/infoPedido.jsx'


const Infosucursal = ({sucursal, setSucursal}) => {

    const [pedidos, setPedidos] = useState([
        {
          ID: '001',
          fecha_orden: '12/01/23',
          fecha_entrega: '13/01/23',
          estado: 'En proceso',
          metodo_envio: 'moto',
          cancelado: false
        },
        {
            ID: '003',
            fecha_orden: '12/01/23',
            fecha_entrega: '13/01/23',
            estado: 'En proceso',
            metodo_envio: 'moto',
            cancelado: false
        },
        
      ]) 

    return (
        <div className='info-container'>
            <div className='titulo'>{sucursal.nombre}</div>

            <div className='separador'></div>

            <div className='subtitulo'>Productos</div>

            <div className='productos-container'>
                <ul>
                {
                    sucursal.productos.map((producto, index) => (
                        <li key= {index} className='producto-container'>{producto}</li>
                        ))
                }
                </ul>
            </div>

            <div className='separador'></div>

            <div className='subtitulo'>Pedidos</div>

            <div className='pedidos-container'>
                {
                    pedidos.map((pedido, index) => (
                        <InfoPedido key={index} pedido={pedido} />
                        ))
                }
            </div>

            <div className='separador'></div>

            <div className='subtitulo'>Empleados</div>

            <div className='pedidos-container'>
                <div>Aqui iria el mapeo de los empleados</div>
            </div>

            <NavBar/>
        </div>

    )

}

export default Infosucursal