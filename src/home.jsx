import './home.css';
import { useState } from 'react'
import Sucursal from './sucursal/sucursal.jsx'
import NavBar from './navBar/navBar.jsx'

const Home = ({setSucursal}) => {

    const [sucursales, setSucursales] = useState([
        {
          nombre: 'Sucursal 1',
          direccion: 'Calle 1',
          NIT: '123',
          telefono: '123456789',
          categoria: 'Supermercado',
          productos: ["Pera", "Pepino", "Pina","Pera", "Pepino", "Pina","Pera", "Pepino", "Pina","Pera", "Pepino", "Pina","Pera", "Pepino", "Pina","Pera", "Pepino", "Pina","Pera", "Pepino", "Pina","Pera", "Pepino", "Pina","Pera", "Pepino", "Pina","Pera", "Pepino", "Pina","Pera", "Pepino", "Pina","Pera", "Pepino", "Pina"]
        },
        {
          nombre: 'Sucursal 2',
          direccion: 'Calle 1',
          NIT: '456',
          telefono: '123456789',
          categoria: 'Supermercado',
          productos: ["Pera", "Pepino", "Pina"]
        },
        {
          nombre: 'Sucursal 3',
          direccion: 'Calle 1',
          NIT: '3455',
          telefono: '123456789',
          categoria: 'Supermercado',
          productos: ["Pera", "Pepino", "Pina"]
        },
        {
          nombre: 'Sucursal 1',
          direccion: 'Calle 1',
          NIT: '789',
          telefono: '123456789',
          categoria: 'Supermercado',
          productos: ["Pera", "Pepino", "Pina"]
        },
        {
          nombre: 'Sucursal 2',
          direccion: 'Calle 1',
          NIT: 'PERRO',
          telefono: '123456789',
          categoria: 'Supermercado',
          productos: ["Pera", "Pepino", "Pina"]
        },
        {
          nombre: 'Sucursal 1',
          direccion: 'Calle 1',
          NIT: 'ARCHIGAY',
          telefono: '123456789',
          categoria: 'Supermercado',
          productos: ["Pera", "Pepino", "Pina"]
        },
        {
          nombre: 'Sucursal 2',
          direccion: 'Calle 1',
          NIT: 'GEEEEEEEi',
          telefono: '123456789',
          categoria: 'Supermercado',
          productos: ["Pera", "Pepino", "Pina"]
        },
        {
          nombre: 'Sucursal 1',
          direccion: 'Calle 1',
          NIT: 'FRANCOBESAAJACK',
          telefono: '123456789',
          categoria: 'Supermercado',
          productos: ["Pera", "Pepino", "Pina"]
        },
        {
          nombre: 'Sucursal 2',
          direccion: 'Calle 1',
          NIT: 'PITO',
          telefono: '123456789',
          categoria: 'Supermercado',
          productos: ["Pera", "Pepino", "Pina"]
        },
      ])
    

    return (
        <div className="App">
            <div className="sucursales">
            {
                sucursales.map((sucursal, index) => (
                  <Sucursal key={index} sucursal={sucursal} setSucursal={setSucursal}/>
                ))
            }
                <button className="add"></button>
            </div>
        </div>

    )

}

export default Home