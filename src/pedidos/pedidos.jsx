import './pedidos.css'
import { useState, useEffect } from 'react'

const Pedidos = () => {

    /* EJEMPLO DE LLAMADA A LA API
        {
            "persona": "Juan",
            "direccion": "pela",
            "productos": ["Sandia", "Limon"],
            "presentaciones": ["Individual","Mano"],
            "descuento": true,
            "cantidades": [1, 2],
            "tamaños": ["grande","grande"],
            "mediocompra": "En linea",
            "fecha_orden": "hoy",
            "fecha_entrega": "mañana",
            "metodo_envio": "servicio",
            "cancelado": false,
            "sucursal": "La Esperanza",
            "servicio_mensajeria": "Uber",
            "tiempo_de_preparacion": "72 hrs",
            "metodo_pago": "tarjeta",
            "contacto": "1234-1234",
            "moneda": "Quetzales"
        }
    */

    const [sucursales, setSucursales] = useState([])
    const [sucursal, setSucursal] = useState('')
    const [productos, setProductos] = useState(['No hay productos'])
    const [cantidades, setCantidades] = useState([])
    const [producto, setProducto] = useState('')
    const [productosPedido, setProductosPedido] = useState([])
    const [cantidad, setCantidad] = useState(0)
    const [persona, setPersona] = useState('')
    const [personas, setPersonas] = useState([])
    const [direccion, setDireccion] = useState('')
    const [presentaciones, setPresentaciones] = useState([])
    const [presentacionesList, setPresentacionesList] = useState([])
    const [presentacion, setPresentacion] = useState('')
    const [descuento, setDescuento] = useState(false)
    const [tamaño, setTamaño] = useState('')
    const [tamaños, setTamaños] = useState([])
    const tamañosList = ['pequeño', 'mediano', 'grande']
    const [medioCompra, setMedioCompra] = useState('')
    const [metodoEnvio, setMetodoEnvio] = useState('')
    const [metodosEnvio, setMetodosEnvio] = useState(['uber'])
    const [metodoPago, setMetodoPago] = useState('')
    const [metodosPago, setMetodosPago] = useState(['tarjeta', 'efectivo'])
    const [contacto, setContacto] = useState('')
    const [moneda, setMoneda] = useState('')
    const [monedas, setMonedas] = useState(['Quetzales', 'Dolares'])

    const getPersonas = async() => {
        const url = 'http://localhost:5000/api/personas'
        const response = await fetch(url, {
          method:'GET',
        })
    
        const responseJson = await response.json()
        console.log(responseJson)

        setPersonas(responseJson)
    
    }

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
        const url = 'http://localhost:5000/api/sucursal_productos'
        const response = await fetch(url, {
          method:'GET',
          headers: {
            'nombre' : sucursal
          }
        })
    
        const responseJson = await response.json()
        console.log(responseJson)

        
        let pro = []
        for(let el in responseJson){
            let element = responseJson[el]
            pro.push(element.producto.nombre)
        }

        setProductos(pro)
            

        const url2 = 'http://localhost:5000/api/sucursal_servicios'
        const response2 = await fetch(url2, {
            method:'GET',
            headers: {
                'nombre' : sucursal
            }
        })

        const responseJson2 = await response2.json()
        console.log(responseJson2)
        
        let servicios = []
        for(let el in responseJson2){
            let element = responseJson2[el]
            servicios.push(element.servicio.nombre)
        }
        
        setMetodosEnvio(servicios)
    
    }

    const getPresentaciones = async() => {
        const url = 'http://localhost:5000/api/procto_presentacion'
        const response = await fetch(url, {
          method:'GET',
          headers: {
            'nombre' : producto
          }
        })
    
        const responseJson = await response.json()

        let press = []
        for(let el in responseJson){
            let element = responseJson[el]
            let list = element.presentaciones

            for(let li in list){
                let pres = list[li]
                press.push(pres)
            }
            
        }

        console.log(press)

        setPresentacionesList(press)
        
    }

    const agregarProducto = () => {
        if (producto !== '' && cantidad !== 0 ) {
            setProductosPedido([...productosPedido, producto])
            setCantidades([...cantidades, parseInt(cantidad)])
            setPresentaciones([...presentaciones, presentacion])
            setTamaños([...tamaños, tamaño])
        }

        setProducto('')
        setCantidad(0)
    }

    // const agregarPresentacion = () => {
    //     if (presentacion) {
    //         const newPresentacion = {
    //             presentacion: presentacion
    //         };
    //         setPresentaciones([...presentaciones, newPresentacion]);
    //     }
    // }

    const agregarMedioCompra = (medio) => {
        if (medio){
            setMedioCompra('En linea')
        }
        else{
            setMedioCompra('En tienda')
        }
    }
        
    const agregarDescuento = (aplicar) => {
        if (aplicar){
            setDescuento(true)
        }
        else{
            setDescuento(false)
        }
    }

    const hacerPedido = async() => {
        const tiempo = Math.round(Math.random() * (72 - 10) + 10);
        const texto = tiempo.toString() + ' hrs'

        const url = 'http://localhost:5000/api/sucursal_pedidos'
        const response = await fetch(url, {
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body : JSON.stringify({
            
            'persona': persona,
            'direccion': direccion,
            'productos': productosPedido,
            'presentaciones': presentaciones,
            'descuento': descuento.toString(),
            'cantidades': cantidades,
            'tamaños': tamaños,
            'mediocompra': medioCompra,
            'metodo_envio': "servicio",
            'cancelado': "false",
            'sucursal': sucursal,
            'servicio_mensajeria': metodoEnvio,
            'tiempo_de_preparacion': texto,
            'metodo_pago': metodoPago,
            'contacto': contacto,
            'moneda': moneda
              
          })
        })
    
        const responseJson = await response.json()
        console.log(responseJson)

        // refrescar la pagina
        window.location.reload()
    
    }

    useEffect( () => {
        getPersonas()
        getSucursales()
    }, [])

    useEffect( () => {
        getProductos()
    }, [sucursal])

    useEffect( () => {
        getPresentaciones()
    }, [producto])

    return (
        <div className="pedido-container">
            <h1>Crear un Pedido</h1>
            <div className='separador'/>

            <div className="pedido-form">
                <div className="pedido-form-item">
                    <label htmlFor="sucursal">Persona</label>
                    <select name="sucursal" id="sucursal" onChange={(e) => setPersona(e.target.value)}>
                        <option value="">Seleccione una persona</option>
                        {personas.map((persona) => (
                            <option key={persona.id} value={persona.id}>{persona.nombre}</option>
                        ))}
                    </select>
                </div>
                <div className="pedido-form-item">
                    <label htmlFor="direccion">Direccion</label>
                    <input type="text" name="direccion" id="direccion" onChange={(e) => setDireccion(e.target.value)} />
                </div>
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
                    <label htmlFor="envio">Metodo de envio</label>
                    <select name="envio" id="envio" onChange={(e) => setMetodoEnvio(e.target.value)}>
                        <option value="">Seleccione un metodo de envio</option>
                        {metodosEnvio.map((metodo) => (
                            <option key={metodo} value={metodo}>{metodo}</option>
                        ))}
                    </select>
                </div>
                <div className="pedido-form-item">
                    <label htmlFor="pago">Metodo de pago</label>
                    <select name="pago" id="pago" onChange={(e) => setMetodoPago(e.target.value)}>
                        <option value="">Seleccione un metodo de pago</option>
                        {metodosPago.map((metodo) => (
                            <option key={metodo} value={metodo}>{metodo}</option>
                        ))}
                    </select>
                </div>

                <div className="pedido-form-item">
                    <label htmlFor="descuento">Medio de compra</label>
                    <button className={medioCompra !== 'En linea' ? "pedido-form-item-btn" : "selected-button"} onClick={() => agregarMedioCompra(true)}>En linea</button>
                    <button className={medioCompra === 'En linea' ? "pedido-form-item-btn" : "selected-button"} onClick={() => agregarMedioCompra(false)}>En tienda</button>
                </div>

                <div className="pedido-form-item">
                    <label htmlFor="descuento">Aplicar descuento</label>
                    <button className={!descuento ? "pedido-form-item-btn" : "selected-button"} onClick={() => agregarDescuento(true)}>Si</button>
                    <button className={descuento ? "pedido-form-item-btn" : "selected-button"} onClick={() => agregarDescuento(false)}>No</button>
                </div>

                <div className="pedido-form-item">
                    <label htmlFor="contacto">Contacto</label>
                    <input type="text" name="contacto" id="contacto" onChange={(e) => setContacto(e.target.value)} />
                </div>

                <div className="pedido-form-item">
                    <label htmlFor="pago">Moneda</label>
                    <select name="pago" id="pago" onChange={(e) => setMoneda(e.target.value)}>
                        <option value="">Seleccione una moneda</option>
                        {monedas.map((moneda) => (
                            <option key={moneda} value={moneda}>{moneda}</option>
                        ))}
                    </select>
                </div>


                <div className='separador-producto'/>

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
                    <label htmlFor="presentacion">Presentacion</label>
                    <select name="presentacion" id="presentacion" onChange={(e) => setPresentacion(e.target.value)}>
                        <option value="">Seleccione una presentacion</option>
                        {presentacionesList.map((present) => (
                            <option key={present} value={present}>{present}</option>
                        ))}
                    </select>
                </div>
                <div className="pedido-form-item">
                    <label htmlFor="cantidad">Cantidad</label>
                    <input type="number" name="cantidad" id="cantidad" onChange={(e) => setCantidad(e.target.value)} />
                </div>

                <div className="pedido-form-item">
                    <label htmlFor="tamaño">Tamaño del paquete</label>
                    <select name="tamaño" id="tamaño" onChange={(e) => setTamaño(e.target.value)}>
                        <option value="">Seleccione un tamaño</option>
                        {tamañosList.map((tamaño) => (
                                tamaño !== '' ?
                                <option key={tamaño} value={tamaño}>{tamaño}</option>
                                : null
                        ))}
                    </select>
                </div>

                <button className="pedido-form-item-btn-agregar" onClick={() => agregarProducto()}>Agregar</button>

                <div className="pedido-form-item">
                    <div className="pedido-form-item-list">
                        <h3>Lista de productos</h3>
                        <ul>
                        {
                            
                            productosPedido.map((item, index) => (
                                    <li key={index}>
                                        {item} - {cantidades[index]}
                                    </li>
                            ))
                        }
                        </ul>
                    </div>
                </div>
                
            </div>
            <button className="pedido-form-item-btn-crear" onClick={() => hacerPedido()}>Crear Pedido</button>
        </div>
    )
}

export default Pedidos