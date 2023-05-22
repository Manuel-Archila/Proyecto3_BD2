import './infoPedido.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import NavBar from '../navBar/navBar.jsx'

const InfoPedido = ({pedido}) => {

    const [persona, setPersona] = useState(
        {
            nombre: 'persona',
            apellido: 'apellido',
            edad: 20,
            sexo: 'sexo',
            NIT: '23455-1'

        }
    )

    const [productos, setProductos] = useState([
        {
            props_producto:
          {
            nombre: 'manzana',
            ID_Inv: '01',
            PrecioU: 5,
            Descripcion: 'manzana roja',
            Presentacion: ['libras', 'unidades']
         },
            props_relacion:
         {
            cantidad: 2,
            presentacion: 'libras',
            tamaño: 'grande'

         }
        
        },
        {
            props_producto:
          {
            nombre: 'pera',
            ID_Inv: '02',
            PrecioU: 5,
            Descripcion: 'pera verde',
            Presentacion: ['libras', 'unidades']
         },
            props_relacion:
         {
            cantidad: 4,
            presentacion: 'libras',
            tamaño: 'grande'

         }
        
        },
        {
            props_producto:
          {
            nombre: 'pera',
            ID_Inv: '02',
            PrecioU: 5,
            Descripcion: 'pera verde',
            Presentacion: ['libras', 'unidades']
         },
            props_relacion:
         {
            cantidad: 4,
            presentacion: 'libras',
            tamaño: 'grande'

         }
        
        },
        {
            props_producto:
          {
            nombre: 'pera',
            ID_Inv: '02',
            PrecioU: 5,
            Descripcion: 'pera verde',
            Presentacion: ['libras', 'unidades']
         },
            props_relacion:
         {
            cantidad: 4,
            presentacion: 'libras',
            tamaño: 'grande'

         }
        
        },
        {
            props_producto:
          {
            nombre: 'pera',
            ID_Inv: '02',
            PrecioU: 5,
            Descripcion: 'pera verde',
            Presentacion: ['libras', 'unidades']
         },
            props_relacion:
         {
            cantidad: 4,
            presentacion: 'libras',
            tamaño: 'grande'

         }
        
        },
        {
            props_producto:
          {
            nombre: 'pera',
            ID_Inv: '02',
            PrecioU: 5,
            Descripcion: 'pera verde',
            Presentacion: ['libras', 'unidades']
         },
            props_relacion:
         {
            cantidad: 4,
            presentacion: 'libras',
            tamaño: 'grande'

         }
        
        },
        {
            props_producto:
          {
            nombre: 'manzana',
            ID_Inv: '01',
            PrecioU: 5,
            Descripcion: 'manzana roja',
            Presentacion: ['libras', 'unidades']
         },
            props_relacion:
         {
            cantidad: 2,
            presentacion: 'libras',
            tamaño: 'grande'

         }
        
        },
        {
            props_producto:
          {
            nombre: 'manzana',
            ID_Inv: '01',
            PrecioU: 5,
            Descripcion: 'manzana roja',
            Presentacion: ['libras', 'unidades']
         },
            props_relacion:
         {
            cantidad: 2,
            presentacion: 'libras',
            tamaño: 'grande'

         }
        
        },
        {
            props_producto:
          {
            nombre: 'manzana',
            ID_Inv: '01',
            PrecioU: 5,
            Descripcion: 'manzana roja',
            Presentacion: ['libras', 'unidades']
         },
            props_relacion:
         {
            cantidad: 2,
            presentacion: 'libras',
            tamaño: 'grande'

         }
        
        },
        {
            props_producto:
          {
            nombre: 'manzana',
            ID_Inv: '01',
            PrecioU: 5,
            Descripcion: 'manzana roja',
            Presentacion: ['libras', 'unidades']
         },
            props_relacion:
         {
            cantidad: 2,
            presentacion: 'libras',
            tamaño: 'grande'

         }
        
        }

      ])

    
      return(
        <div className='container1'>
            <div className='cont'>
                <div>ID del pedido:</div>
                <div>{pedido.ID}</div>
            </div>
    
            <div className='cont'>
                <div>Cliente:</div>
                <div>{persona.nombre} {persona.apellido}</div>
            </div>

            <div className='cont'>
                <div>Fecha orden:</div>
                <div>{pedido.fecha_orden}</div>
            </div>
            
            <div className='cont'>
                <div>Fecha entrega:</div>
                <div>{pedido.fecha_entrega}</div>
            </div>

            <div className='cont'>
                <div>Estado:</div>
                <div>{pedido.estado}</div>
            </div>

            <div className='cont'>
                <div>Metodo envio:</div>
                <div>{pedido.metodo_envio}</div>
            </div>

            <div className='cont'>
                <div>Cancelado:</div>
                <div>{(pedido.cancelado).toString()}</div>
            </div>
            
            <div className='cont_2'>
                <div>Productos:</div>
                <div className='prod_cont'>
                    <ul>
                    {
                        productos.map((producto, index) => (
                            <li key={index}>{producto.props_producto.nombre}: {producto.props_relacion.cantidad} {producto.props_relacion.presentacion}</li>
                            ))
                    }
                    </ul>
                </div>
            </div>



        </div>
    )
}

export default InfoPedido