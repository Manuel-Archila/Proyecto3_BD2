import './sucursal.css';
import { useNavigate } from 'react-router-dom'
import NavBar from '../navBar/navBar.jsx'

const Sucursal = ({sucursal, setSucursal}) => {

    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/infoSucursal')
        setSucursal(sucursal)
    }

    return (
        <div className='container' onClick={() => handleClick() } >
            <div className='nombre'>{sucursal.nombre}</div>
            <div className='description'>Categoria: {sucursal.categoria}</div>
            <div className='description'>Direccion: {sucursal.direccion}</div>
            <div className='description'>Telefono: {sucursal.telefono}</div>
            <div className='description'>NIT: {sucursal.NIT}</div>
        </div>


    )

}

export default Sucursal
