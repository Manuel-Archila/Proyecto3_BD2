import './navBar.css'
import home from '../assets/home.png'
import carrito from '../assets/carrito.png'
import { useNavigate } from 'react-router-dom'

const NavBar = () => {

    const navigate = useNavigate()

    const handleClick = (tipo) => {
        if (tipo === 'pedido') {
            navigate('/pedido')
        }
        if (tipo === 'home') {
            navigate('/')
        }
    }

    return (
        <div className="navBar">
            <div className="navBar__icon" onClick={() => handleClick('pedido')}>
                <img src={carrito} alt="PEDIDO" />
            </div>
            <div className="navBar__icon" onClick={() => handleClick('home')}>
                <img src={home} alt="HOME" />
            </div>
        </div>
    )
}

export default NavBar