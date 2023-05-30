import './infoPedido.css'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import NavBar from '../navBar/navBar.jsx'

const InfoPedido = ({pedido, setEliminado, eliminado, sucursal}) => {

    const [persona, setPersona] = useState(pedido.persona)
    const [productos, setProductos] = useState(pedido.productos)
    const [modal, setModal] = useState(false)
    const [showModal, setShowModal] = useState(false);
    const [producto, setProducto] = useState('')
    const [comentario, setComentario] = useState('')
    const [calificacion, setCalificacion] = useState(0)

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

    const calificarProducto = async() => {
        const url = 'http://localhost:5000/api/calificar_productos'
            
        const response = await fetch(url, {
            method:'POST',
            headers:{
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "persona": persona,
                "comentario": comentario,
                "calificacion": calificacion,
                "lugar": sucursal,
                "producto": producto, 
            })
        })

        const data = await response.json()
        console.log(data)
        setShowModal(false);
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

    const calificar = () => {
        setShowModal(true);

    }



    
    return(
        <div className='container1'>

            <div className='iconos'>
                <div className='eliminar' onClick={()=> eliminarPedido()}/>
                {
                    !pedido.pedido.cancelado &&
                    <div className='entregado' onClick={()=> setEntregado()}/>
                }
                <div className='calificacion' onClick={()=> calificar()}/>
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

            {showModal && (
                <div className='modal'>
                {/* Modal content */}
                <div className='modal-content'>
                    <span className='close' onClick={() => setShowModal(false)}>
                    &times;
                    </span>
                    {/* Add your modal content here */}
                    <h2>Calificar pedido {pedido.pedido.id}</h2>
                    <div className="info-form-item">
                        <div className="item">
                            <label htmlFor="producto">Producto:</label>
                            <select name="producto" id="producto" onChange={(e) => setProducto(e.target.value)}>
                                <option value="">Seleccione un producto</option>
                                {productos.map((p, index) => (
                                    <option key={p.producto.nombre} value={p.producto.nombre}>{p.producto.nombre}</option>
                                ))}
                            </select>
                        </div>
                        
                        <div className="item">
                            <label htmlFor='comments'>Comentarios:</label>
                            <input type='text' id='comments' onChange={(e) => setComentario(e.target.value)}/>
                        </div>
                        <div className="item">
                            <label htmlFor='rating'>Calificación:</label>
                            <select id='rating' onChange={(e) => setCalificacion(e.target.value)}>
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                            <option value='5'>5</option>
                            </select>
                        </div>
                        </div>
                        <button onClick={() => calificarProducto()}>Enviar</button>
                    </div>
                </div>

                
            )}
            
        </div>
    )
}

export default InfoPedido