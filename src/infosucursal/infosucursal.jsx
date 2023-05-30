import './infosucursal.css';
import NavBar from '../navbar/navbar.jsx';
import { useState, useEffect } from 'react'
import InfoPedido from '../infoPedido/infoPedido.jsx'
import InfoTrabajador from '../infoTrabajador/infoTrabajador.jsx'


const Infosucursal = ({sucursal, setSucursal}) => {

    const [mostrarModal, setMostrarModal] = useState(false);
    const [nuevoEmpleado, setNuevoEmpleado] = useState({
        horario: '',
        vehiculo: false,
        sueldo: 0.0,
        puesto: '',
        area: '',
        persona: '',
        fechaInicio: '',
        contrato: false,
        activo: false,
      });

    const horarios = ['Medio Tiempo', 'Tiempo Completo', 'Tiempo Parcial', 'Por Horas']

    const handleClickIcono = () => {
        setMostrarModal(true);
    };

    const handleCloseModal = () => {
        setMostrarModal(false);
    };

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        const newValue = type === 'checkbox' ? checked : value;

        setNuevoEmpleado((prevEmpleado) => ({
        ...prevEmpleado,
        [name]: newValue,
        }));
    };

    const crearTrabajador = async() => {

        const url = 'http://localhost:5000/api/sucursal_trabajador'
        const response = await fetch(url, {
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body : JSON.stringify({
            'persona': persona,
            'horario': nuevoEmpleado.horario,
            'vehiculo': nuevoEmpleado.vehiculo.toString(),
            'sueldo': parseFloat(nuevoEmpleado.sueldo),
            'puesto': nuevoEmpleado.puesto,
            'area': nuevoEmpleado.area,
            'fecha_inicio': nuevoEmpleado.fechaInicio,
            'contrato': nuevoEmpleado.contrato.toString(),
            'activo': nuevoEmpleado.activo.toString(),
            'sucursal': sucursal.nombre
          })
        })
    
        const responseJson = await response.json()
        console.log(responseJson)
    
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        crearTrabajador();
        setNuevoEmpleado({
            horario: '',
            vehiculo: false,
            sueldo: 0,
            puesto: '',
            area: '',
            persona: '',
            fechaInicio: '',
            contrato: false,
            activo: false,
          });

        setMostrarModal(false);
        getTrabajadores()
    };


    const getPersonas = async() => {
        const url = 'http://localhost:5000/api/notrabajadores'
        const response = await fetch(url, {
          method:'GET',
        })
    
        const responseJson = await response.json()
        console.log(responseJson)

        setPersonas(responseJson)
    
    }


    const [pedidos, setPedidos] = useState([])
    const [productos, setProductos] = useState([])
    const [trabajadores, setTrabajadores] = useState([])
    const [personas, setPersonas] = useState([])
    const [persona, setPersona] = useState('')
    const [eliminado, setEliminado] = useState(false);

    const getProductos = async() => {
        const url = 'http://localhost:5000/api/sucursal_productos'
        const response = await fetch(url, {
            method:'GET',
            headers: {
            'nombre' : sucursal.nombre
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
         
    
    }

    const getPedidos = async() => {
        const url = 'http://localhost:5000/api/sucursal_pedidos'
        const response = await fetch(url, {
            method:'GET',
            headers: {
                'nombre' : sucursal.nombre
            }
        })

        const responseJson = await response.json()

        
        let ped = []
        for(let el in responseJson){
            let element = responseJson[el]
            ped.push(element)
        }

        setPedidos(ped)
            
    }

    const getTrabajadores = async() => {
        const url = 'http://localhost:5000/api/trabajador_sucursal'
        const response = await fetch(url, {
            method:'GET',
            headers: {
                'nombre' : sucursal.nombre
            }
        })

        const responseJson = await response.json()

        let trabajadores = []
        for(let el in responseJson){
            let element = responseJson[el]
            trabajadores.push(element)
        }

        setTrabajadores(trabajadores)

    }

    useEffect(() => {
        getProductos()
        getPedidos()
        getTrabajadores()
        getPersonas()
    }, [eliminado])

    useEffect(() => {
        getProductos()
        getPedidos()
        getTrabajadores()
        getPersonas()
    }, [])


    return (
        <div className='info-container'>
            <div className='titulo'>{sucursal.nombre}</div>
            <div className='separador'></div>
            <div className='subtitulo'>Productos</div>
            <div className='productos-container'>
                <ul>
                {
                    productos.map((producto, index) => (
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
                        <InfoPedido key={index} pedido={pedido} setEliminado={setEliminado} eliminado = {eliminado} sucursal={sucursal.nombre}/>
                        ))
                }
            </div>
            <div className='separador'></div>
            <div className='subtitulo-icono'>
                <div className='subtitulo-dentro'>Empleados</div>
                <div className='icono' onClick={handleClickIcono}/>
            </div>
            
            <div className='pedidos-container'>
                {
                    trabajadores.map((trabajador, index) => (
                        <InfoTrabajador key={index} trabajador={trabajador} sucursal={sucursal.nombre} setEliminado={setEliminado} eliminado = {eliminado}/>
                    ))
                }
            </div>
            
            {
                mostrarModal && (
                    <div className='modal1'>
                      <div className='modal1-contenido'>
                        <h2>Nuevo Empleado</h2>
                        <form onSubmit={handleSubmit}>
                          <label>
                            Persona:
                            <select
                              name='persona'
                              value={nuevoEmpleado.persona}
                              onChange={(e) => setPersona(e.target.value)}
                            >
                              <option value=''>Seleccionar persona</option>
                              {personas.map((persona, index) => (
                                <option key={index} value={persona.nombre} >
                                    {persona.nombre}
                                </option>
                              ))}
                            </select>
                          </label>
            
                          <label>
                            Horario:
                            <select
                            name='horario'
                            value={nuevoEmpleado.horario}
                            onChange={handleChange}
                            >
                            <option value=''>Seleccionar horario</option>
                            {horarios.map((horario, index) => (
                                <option key={index} value={horario}>
                                {horario}
                                </option>
                            ))}
                            </select>
                        </label>
            
                          <label>
                            Vehiculo:
                            <input
                              type='checkbox'
                              name='vehiculo'
                              checked={nuevoEmpleado.vehiculo}
                              onChange={handleChange}
                            />
                          </label>
            
                          <label>
                            Sueldo:
                            <input
                              type='number'
                              name='sueldo'
                              value={nuevoEmpleado.sueldo}
                              onChange={handleChange}
                            />
                          </label>
            
                          <label>
                            Puesto:
                            <input
                              type='text'
                              name='puesto'
                              value={nuevoEmpleado.puesto}
                              onChange={handleChange}
                            />
                          </label>
            
                          <label>
                            Area:
                            <input
                              type='text'
                              name='area'
                              value={nuevoEmpleado.area}
                              onChange={handleChange}
                            />
                          </label>

                            <label>
                                Fecha de Inicio:
                                <input
                                type='date'
                                name='fechaInicio'
                                value={nuevoEmpleado.fechaInicio}
                                onChange={handleChange}
                                />
                            </label>

                            <label>
                                Contrato:
                                <input
                                type='checkbox'
                                name='contrato'
                                checked={nuevoEmpleado.contrato}
                                onChange={handleChange}
                                />
                            </label>

                            <label>
                                Activo:
                                <input
                                type='checkbox'
                                name='activo'
                                checked={nuevoEmpleado.activo}
                                onChange={handleChange}
                                />
                            </label>
            
                          <button type='submit'>Crear Empleado</button>
                          <button onClick={handleCloseModal}>Cerrar</button>
                        </form>
                      </div>
                    </div>
                  )
            }

            <NavBar/>
        </div>

    )

}

export default Infosucursal