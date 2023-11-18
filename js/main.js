import generarLista from "./lista.js";
import generarTabla from "./tabla.js";
import { COLUMNAS_PERSONAS, ESTADO, FILTROS } from "./constantes.js";
import { convertirAArrayEntidad, calcularPromedio, formDataToObject, leerLocalStorage,guardarEnLocalStorage, capitalizarPrimeraLetra } from "./utils.js";
import Modal from "./Modal.js";
import Empleado from "./entidades/Empleado.js";
import Cliente from "./entidades/Cliente.js";
import { getPersonas, deletePersona, crearPersona, modificarPersona } from "./fetchData.js";
import generarLoader from "./loader.js";
import Futbolista from "./entidades/Futbolista.js";
import Profesional from "./entidades/Profesional.js";

window.addEventListener('DOMContentLoaded', () => {

    const modal = new Modal('modal');
    const tabla = document.getElementById('tabla-datos');
    const formAbm = document.getElementById('form-abm');
    const formDatos = document.getElementById('form-datos');
    const btnCalcular = document.getElementById('btn-calcular');
    const btnAgregar = document.getElementById('btn-agregar-elemento');
    const btnSeleccionar = document.getElementById('btn-seleccionar');
    const btnDeseleccionar = document.getElementById('btn-deseleccionar');
    const divCheckbox = formDatos?.querySelector('.container-checkbox');
    const inputTipo = formAbm?.querySelector('.tipo');
    const inputFiltro = formDatos?.querySelector('.filtro');
    const btnGuardar = document.getElementById('btn-guardar');
    const inputBtnAbm = document.getElementById('btn-abm');
    const tituloAbm = document.getElementById('titulo-abm');
    const toggleOperaciones = document.getElementById('toggle-operaciones');
    
    //estados
    let estado = null;
    const obj = {
        a: 2
    }
    //modificarPersona(obj)
    const listaGuardada = null//leerLocalStorage();
    let lista = null;// = generarLista( parsearArray(listaGuardada || json, Empleado.crearEmpleado, Cliente.crearCliente));
    const loader = generarLoader('loader');
    const {cargarTabla,
        agregarRow,
        setVisibilidadColumna,
        generarCheckboxColumnas,
        agregarHandlerClickHead,
        agregarHandlerDblClickBody,
        agregarHandlerClickBody
    } = generarTabla(tabla, Object.values(COLUMNAS_PERSONAS));
    
    try {
        divCheckbox.appendChild(generarCheckboxColumnas());
        loader.mostrarLoader();
        getPersonas((json)=> {
            try {
                console.log(json)
                lista = generarLista(convertirAArrayEntidad(json, Futbolista.crearFutbolista, Profesional.crearProfesional));
                cargarTabla(lista?.getLista());
                
            } catch (err) {
                modal.mostrarMensaje('Error fatal', 'Fallo carga de datos\n' + err.message);
            } finally {
                loader.ocultarLoader();

            }
        },
        ()=>{
            loader.ocultarLoader();
            modal.mostrarMensaje('Error fatal', 'Fallo carga de datos\n');

        });

    } catch (err) {
        modal.mostrarMensaje('Error fatal', 'Fallo carga de datos\n' + err.message);
    }    

    const setDisabledInputsFormAbm = (isDisabled = false) => {
        const inputs = formAbm.querySelectorAll('input:not([name="id"]):not([type="submit"]):not([type="reset"])');
        
        for (const input of inputs) {
            input.disabled = isDisabled
        }
    }
    const fireEventChangeInputTipo = (valor = '') => {
        console.log(valor);
        console.log('fire');
        const eventChange = new MouseEvent('change');
        if (valor === FILTROS.EMPLEADO || valor === FILTROS.CLIENTE) {
            inputTipo.value = valor;
            console.log(inputTipo.value);
        }
        inputTipo.dispatchEvent(eventChange);
    }

    const switchAbm = () => {
        const divdatos = document.querySelector('.datos')
        const divAbm = document.querySelector('.abm');
        const containerId = formAbm.querySelector('input[name="id"]')?.parentElement;
        const opcionTipo = formAbm.querySelector('.opcion-tipo');

        inputBtnAbm.value = estado !== null ? capitalizarPrimeraLetra(estado) : '';
        tituloAbm.innerText = estado !== null ? capitalizarPrimeraLetra(estado) : '';

        //primero hay que cargar el form
        const sinEstado = estado === null;
        divAbm.style.display = sinEstado ? 'none' : 'block';
        divdatos.style.display = sinEstado ? 'block' : 'none';
        
        if (!sinEstado) {
            const esAlta = estado === ESTADO.ALTA;
            fireEventChangeInputTipo();
            setDisabledInputsFormAbm(estado === ESTADO.ELIMINAR);
            containerId.style.display = esAlta ? 'none' : 'block';
            opcionTipo.style.display = esAlta ? 'block' : 'none';
        }
        
    }

    const setCheckboxs = (isChecked) => {

        const querySelector = `input[type=checkbox]${isChecked ? ':not(:checked)' : ':checked'}`;
        const checkboxs = divCheckbox.querySelectorAll(querySelector);

        checkboxs.forEach((chbx) => {
            chbx.checked = isChecked;
            setVisibilidadColumna(chbx.value, isChecked);
        });
    }

    const cargarFormAbm = (vehiculo) => {
        console.log(vehiculo);
        try {
            formAbm.querySelector('input[name="id"]').value = vehiculo.id;
            formAbm.querySelector('input[name="nombre"]').value = vehiculo.nombre;
            formAbm.querySelector('input[name="apellido"]').value = vehiculo.apellido;
            formAbm.querySelector('input[name="edad"]').value = vehiculo.edad;

            if (vehiculo instanceof Futbolista || Futbolista.esFutbolista(vehiculo)) {
                formAbm.querySelector('select[name="tipo"]').value = FILTROS.FUTBOLISTA;

                formAbm.querySelector('input[name="equipo"]').value = vehiculo.equipo;
                formAbm.querySelector('input[name="posicion"]').value = vehiculo.posicion;
                formAbm.querySelector('input[name="cantidadGoles"]').value = vehiculo.cantidadGoles;

            } else if (vehiculo instanceof Profesional || Profesional.esProfesional(vehiculo)) {
                formAbm.querySelector('select[name="tipo"]').value = FILTROS.PROFESIONAL;

                formAbm.querySelector('input[name="titulo"]').value = vehiculo.titulo;
                formAbm.querySelector('input[name="facultad"]').value = vehiculo.facultad;
                formAbm.querySelector('input[name="añoGraduacion"]').value = vehiculo.añoGraduacion;

            }
            
        } catch (err) {
            modal.mostrarMensaje('Error fatal', 'Fallo carga de datos de la persona');
            
        }
    }

    btnAgregar?.addEventListener('click', () => {
        estado = ESTADO.ALTA;
        switchAbm()
    });

    formAbm?.addEventListener('reset', () => {
        lista && cargarTabla(lista.filtarLista(inputFiltro.value));
        estado = null;
        switchAbm()
    });
    //se podra hacer un return para salir antes con el estado eliminar
    formAbm?.addEventListener('submit', async function(event) {

        try {
            event.preventDefault();
            let persona = null;
            const formData = new FormData(this);
            const obj = formDataToObject(formData);
            let mensaje = '';
            obj.id = (estado === ESTADO.MODIFICAR || estado === ESTADO.ELIMINAR) &&
                parseInt(obj.id || this.querySelector('input[name="id"]').value);//parsear pq queda como texto
            
            const setDatosPersona = () => {
                if (inputTipo.value === FILTROS.FUTBOLISTA) {
                    persona = new Futbolista(obj);
                } else if (inputTipo.value === FILTROS.PROFESIONAL) {
                    persona = new Profesional(obj);
                } else {
                    throw new Error('Debe seleccionar un tipo de persona');
                }
                mensaje = `${persona instanceof Futbolista ? 'Futbolista' : 'Profesional'} ${persona.nombre} ${persona.apellido}`;

            }
            const realizarBaja = async () => {
                const nombre = this.querySelector('input[name="nombre"]')?.value;
                const apellido = this.querySelector('input[name="apellido"]')?.value;
                let texto = '';
                mensaje += `${nombre} ${apellido} eliminado`;
                const res = await modal.pedirRespuesta('Eliminar', 'Desea eliminar persona?');
                
                if (res) {
                    loader.mostrarLoader();
                    texto = await deletePersona(obj.id);
                    lista?.deleteItem(obj.id);
                    loader.ocultarLoader();
                    this.reset();

                } else {
                    mensaje ='Se cancelo la eliminacion';
                }
                console.log(texto);
                console.log(mensaje);
                modal.mostrarMensaje('Mensaje', texto + '\n' + mensaje);
            }
            const realizarModificacion = () => {
                //
                setDatosPersona();
                loader.mostrarLoader();
                modificarPersona(persona)
                .then((res) => {
                    if (!res.ok) {
                        throw new Error('Fallo al modificar');
                    }
                    return res.text();
                })
                .then((data) => {
                    console.log(persona);
                    lista?.updateItem(persona.id, persona);
                    lista && cargarTabla(lista.filtarLista(inputFiltro.value));
                    console.log(lista.getLista());
                    mensaje += ' modificado';
                    modal.mostrarMensaje('Mensaje', data + '\n' + mensaje);
                })
                .catch ((err) => {
                    console.log(err.message);
                    modal.mostrarMensaje('Error al dar de '+estado, err.message);  
                })
                .finally(() => {
                    console.log('finally');
                    loader.ocultarLoader();
                    this.reset();

                });
            }

            const realizarAlta = async () => {
                
                try {
                    setDatosPersona();
                    loader.mostrarLoader();
                    const res = await crearPersona(persona);
                    if (!res.ok) {
                        throw new Error('Fallo al realizar la solicitud');
                    }
                    const data = await res.json();
                    persona.id = data.id;
                    lista?.addItem(persona);
                    agregarRow(persona);
                    mensaje += ' agregado';
                    modal.mostrarMensaje('Mensaje', mensaje);
                } catch (err) {
                    console.log(err.message);
                    modal.mostrarMensaje('Error al dar de '+estado, err.message);  
                } finally {
                    console.log('finally');
                    loader.ocultarLoader();
                    this.reset();
                }
                
            }
            if(estado === ESTADO.ELIMINAR) {
                await realizarBaja();
            } else if (estado === ESTADO.MODIFICAR) {
                realizarModificacion();
            } else if(estado === ESTADO.ALTA) {
                await realizarAlta();
            }
            
        } catch (err) {
            console.log(err.message);
            loader.ocultarLoader();
            modal.mostrarMensaje('Error al '+estado, err.message);  
        }
    });
    //change no funciona bien, a veces haciendo click al label cambiaba eñ checkbox o deseleccionaba todos
    divCheckbox?.addEventListener('click', (event) => {
        //cada checkbox y label estan en un div, asi que en caso de que sea label se podria 
        //acceder al input por el parentElement
        const target = event.target;
        const esLabel = target.tagName === 'LABEL' && target.tagName !== 'DIV';
        const inputChbk = esLabel ? target.parentElement.querySelector('input[type="checkbox"]') : target;
            
        if (esLabel) {
            inputChbk.checked = !inputChbk.checked;
        }

        if ((target.tagName === 'INPUT' || esLabel) && inputChbk.tagName === 'INPUT') {            
            setVisibilidadColumna(inputChbk.value, inputChbk.checked);
        }
    });

    btnSeleccionar?.addEventListener('click', (event) => {
        event.preventDefault();
        setCheckboxs(true)
    });

    btnDeseleccionar?.addEventListener('click', (event) => {
        event.preventDefault();
        setCheckboxs(false)
    });
    
    btnCalcular?.addEventListener('click', function (event) {
        try {
            event.preventDefault();
            const inputPromedio = this.parentElement.querySelector('input[name="promedio"]');
            const promedio = lista != null ? calcularPromedio('edad', lista.filtarLista(inputFiltro.value)) : 'Error';
            inputPromedio.value = promedio;
        } catch (err) {
            modal.mostrarMensaje('Error', 'Fallo al calcular el promedio\n' + err.message);
        }
    });

    btnGuardar?.addEventListener('click', () => {
        try {
            lista && guardarEnLocalStorage(lista.getLista());
            modal.mostrarMensaje('Vehiculos', 'Se guardo lista de vehiculos'); 
            console.log(leerLocalStorage());
        } catch (err) {
            modal.mostrarMensaje('Error', err.message);
        }
    });
    toggleOperaciones?.addEventListener('click', (event) => {
        event.preventDefault();
        console.log('hola');
        const divOperaciones = document.getElementById('operaciones');
        const icon = toggleOperaciones.querySelector('i');
        divOperaciones?.classList.toggle('display-none');
        icon?.classList.toggle('bx-plus-circle');
        icon?.classList.toggle('bx-minus-circle');

    });

    inputTipo?.addEventListener('change', (event) => {
        console.log('change value '+event.currentTarget.value);
        const option = event.currentTarget.value;
        const optionEntidad1 = formAbm.querySelector('.opciones-futbolista');
        const optionEntidad2 = formAbm.querySelector('.opciones-profesional');
        
        if (option === FILTROS.FUTBOLISTA) {
            optionEntidad1.style.display = 'block';
            optionEntidad2.style.display = 'none';
        } else if (option === FILTROS.PROFESIONAL) {
            optionEntidad1.style.display = 'none';
            optionEntidad2.style.display = 'block';
        } else {
            optionEntidad1.style.display = 'none';
            optionEntidad2.style.display = 'none';
        }
        

    });

    inputFiltro?.addEventListener('change', (event) => {
        try {
            const opcion = event.currentTarget.value;
            lista && cargarTabla(lista.filtarLista(opcion));
        } catch (err) {
            modal.mostrarMensaje('Error', `Fallo al filtrar la lista\n` + err.message);
        }
    });
    
    const cargarDatosYSwitchAbm = (id, estadoAbm) => {
        try {
            const item = lista?.getItem(id);
            if (!item) {
                throw new Error('No existe persona con id '+id);
            }
            cargarFormAbm(item);
            estado = estadoAbm;
            switchAbm();
            
        } catch (err) {
            modal.mostrarMensaje('Error', `Fallo al ${estadoAbm} persona\n` + err.message);
        }
    };
    agregarHandlerDblClickBody(cargarDatosYSwitchAbm);
    agregarHandlerClickBody(cargarDatosYSwitchAbm);
    agregarHandlerClickHead((columna, ordenAsc, fnCargarTabla) => {
        try {
            lista?.ordenarListaAscDes(columna, ordenAsc);
            lista && fnCargarTabla(lista.filtarLista(inputFiltro.value));
            
        } catch (err) {
            modal.mostrarMensaje('Error', 'Fallo al Ordenar la lista\n' + err.message);
        }
    });

});
