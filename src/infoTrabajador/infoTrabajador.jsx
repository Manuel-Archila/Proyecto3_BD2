import './infoTrabajador.css'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import NavBar from '../navBar/navBar.jsx'

const InfoTrabajador = ({trabajador, sucursal, setEliminado, eliminado}) => {

    const eliminarTrabajador = async () => {
        const url = 'http://localhost:5000/api/eliminar_trabajador'
        
        const response = await fetch(url, {
            method:'POST',
            headers:{
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "persona": trabajador.trabajador.nombre,
              "sucursal": sucursal
            })
          })

        const data = await response.json()
        console.log(data)
        setEliminado(!eliminado)
    }

    const editarTrabajador = async () => {
        console.log(trabajador.relacion.activo)
        const activo_opuesto = !trabajador.relacion.activo
        console.log(activo_opuesto)
        
        const url = 'http://localhost:5000/api/trabajador_set_activo'
        const response = await fetch(url, {
            method:'POST',
            headers:{
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "nombre": trabajador.trabajador.nombre,
              "activo": (activo_opuesto).toString()
            })
          })

        const data = await response.json()
        console.log(data)
        setEliminado(!eliminado)
    }
    
    return(
        <div className='container11'>
            <div className='iconos'>
                <div className='eliminar' onClick={()=> eliminarTrabajador()}/>
                <div className={trabajador.relacion.activo ? 'activo' : 'inactivo'} onClick={()=> editarTrabajador()}/>
            </div>
            <div className='cont'>
                <div>Nombre:</div>
                <div>{trabajador.trabajador.nombre}</div>
            </div>
    
            <div className='cont'>
                <div>Apellido:</div>
                <div>{trabajador.trabajador.apellido}</div>
            </div>

            <div className='cont'>
                <div>Area:</div>
                <div>{trabajador.trabajador.area}</div>
            </div>
            
            <div className='cont'>
                <div>Puesto:</div>
                <div>{trabajador.trabajador.puesto}</div>
            </div>

            <div className='cont'>
                <div>Sexo:</div>
                <div>{trabajador.trabajador.sexo}</div>
            </div>

            <div className='cont'>
                <div>Edad:</div>
                <div>{trabajador.trabajador.edad}</div>
            </div>

            <div className='cont'>
                <div>Vehiculo:</div>
                <div>{(trabajador.trabajador.vehiculo).toString()}</div>
            </div>

            <div className='cont'>
                <div>Fecha de Inicio:</div>
                <div>{(trabajador.relacion.fecha_inicio)}</div>
            </div>
            <div className='cont'>
                <div>Activo:</div>
                <div>{(trabajador.relacion.activo).toString()}</div>
            </div>
        </div>
    )
}

export default InfoTrabajador