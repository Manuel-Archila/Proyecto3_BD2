import './pedidos.css'
import { useState } from 'react'

const Pedidos = () => {
    const [sucursales, setSucursales] = useState([
        { id: 1, nombre: 'Sucursal 1' },
        { id: 2, nombre: 'Sucursal 2' },
        { id: 3, nombre: 'Sucursal 3' },
        { id: 4, nombre: 'Sucursal 4' },
    ])
    const [sucursal, setSucursal] = useState('')
    const [productos, setProductos] = useState([
        'Producto 1',
        'Producto 2',
        'Producto 3',
        'Producto 4'
    ])
    const [producto, setProducto] = useState('')
    const [cantidad, setCantidad] = useState(0)

    const [pedido, setPedido] = useState([{}])

    const agregarProducto = () => {
        if (producto && cantidad) {
            const newPedido = {
              producto: producto,
              cantidad: cantidad
            };
            setPedido([...pedido, newPedido]);
            setProducto('');
            setCantidad(0);
        }
    }

    return (
        <div className="pedido-container">
            <h1>Crear un Pedido</h1>
            <div className='separador'/>

            <div className="pedido-form">
                <div className="pedido-form-item">
                    <label htmlFor="sucursal">Sucursal</label>
                    <select name="sucursal" id="sucursal" onChange={(e) => setSucursal(e.target.value)}>
                        <option value="">Seleccione una sucursal</option>
                        {sucursales.map((sucursal) => (
                            <option key={sucursal.id} value={sucursal.id}>{sucursal.nombre}</option>
                        ))}
                    </select>
                    
                </div>
                <div className="pedido-form-item">
                    <label htmlFor="producto">Producto</label>
                    <select name="producto" id="producto" onChange={(e) => setProducto(e.target.value)}>
                        <option value="">Seleccione un producto</option>
                        {productos.map((producto) => (
                            <option key={producto} value={producto}>{producto}</option>
                        ))}
                    </select>
                </div>
                <div className="pedido-form-item">
                    <label htmlFor="cantidad">Cantidad</label>
                    <input type="number" name="cantidad" id="cantidad" onChange={(e) => setCantidad(e.target.value)} />

                    <button className="pedido-form-item-btn" onClick={agregarProducto}>Agregar</button>
                </div>
                <div className="pedido-form-item">
                    <div className="pedido-form-item-list">
                        <h3>Lista de productos</h3>
                        <ul>
                        {
                            pedido.map((item, index) => (
                                item.producto && item.cantidad ? (
                                    <li key={index}>
                                        {item.producto} - {item.cantidad}
                                    </li>
                                ) : null
                            ))
                        }
                        </ul>
                    </div>
                </div>
            </div>
            <button className="pedido-form-item-btn">Crear Pedido</button>
        </div>
    )
}

export default Pedidos