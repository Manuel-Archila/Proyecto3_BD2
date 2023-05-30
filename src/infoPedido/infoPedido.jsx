import './infoPedido.css'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import NavBar from '../navBar/navBar.jsx'

const InfoPedido = ({pedido, setEliminado, eliminado}) => {

   const [persona, setPersona] = useState(pedido.persona)
   const [productos, setProductos] = useState(pedido.productos)

   const eliminarPedido = async () => {
        const url = 'http://localhost:5000/api/eliminar_pedido'
            
        const response = await fetch(url, {
            method:'POST',
            headers:{
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "id_pedido": pedido.pedido.id
            })
        })

        const data = await response.json()
        console.log(data)

        setEliminado(!eliminado)
   }
   
   useEffect(() => {
      console.log(pedido)
   }, [])

   const setEntregado = async () => {
        const url = 'http://localhost:5000/api/recogido'
            
        const response = await fetch(url, {
            method:'POST',
            headers:{
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "id_pedido": pedido.pedido.id
            })
        })

        const data = await response.json()
        console.log(data)

        setEliminado(!eliminado)
   }

    
    return(
        <div className='container1'>
            <div className='iconos'>
                <div className='eliminar' onClick={()=> eliminarPedido()}/>
                <div className='entregado' onClick={()=> setEntregado()}/>
            </div>
            <div className='cont'>
                <div>ID del pedido:</div>
                <div>{pedido.pedido.id}</div>
            </div>
    
            <div className='cont'>
                <div>Cliente:</div>
                <div>{pedido.persona.nombre} {pedido.persona.apellido}</div>
            </div>

            <div className='cont'>
                <div>Fecha orden:</div>
                <div>{pedido.pedido.fecha_orden}</div>
            </div>
            
            <div className='cont'>
                <div>Fecha entrega:</div>
                <div>{pedido.pedido.fecha_entrega}</div>
            </div>

            <div className='cont'>
                <div>Estado:</div>
                <div>{pedido.pedido.estado}</div>
            </div>

            <div className='cont'>
                <div>Metodo envio:</div>
                <div>{pedido.pedido.metodo_envio}</div>
            </div>

            <div className='cont'>
                <div>Cancelado:</div>
                <div>{(pedido.pedido.cancelado).toString()}</div>
            </div>

            <div className='cont'>
                <div>Total:</div>
                <div>{(pedido.factura.total)}</div>
            </div>
            
            <div className='cont_2'>
                <div>Productos:</div>
                <div className='prod_cont'>
                    <ul>
                    {
                        productos.map((p, index) => (
                            <li key={index}>{p.producto.nombre}: {p.relacion.cantidad} {p.relacion.presentacion}</li>
                            ))
                    }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default InfoPedido