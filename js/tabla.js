import { capitalizarPrimeraLetra } from "./utils.js";
import { ESTADO } from "./constantes.js";
//import { COLUMNAS2 } from "./constantes.js";

const generarTabla = (elementTable, array = [], data = [], boolOpciones = true) => {
    const arrayColumnas = array;
    const opciones = boolOpciones;
    const colOpciones = 'opciones';
    const colEliminar = 'eliminar';
    const colModificar = 'modificar';

    const ordenColumna = {
        columna: null,
        ordenAsc: true
    };
    const funcionesEventClickHead = [];
    const funcionesEventDblClickBody = [];
    const funcionesEventClickBody = [];

    let tabla = elementTable;

    

    
    if (!tabla || tabla.tagName !== 'TABLE') {
        throw new Error('Elemento invalido, debe ingresar una tabla');
    }

        
    const crearCelda = (texto, atributo, element = 'td') => {
        if (element !== 'td' && element !== 'th') {
            throw new Error('Elemento invalido para crear celda');
        }
        const celda = document.createElement(element);
        const esCelcaAgregada = atributo !== colOpciones && atributo !== colModificar && atributo !== colEliminar;
        const textoCelda = texto || texto === 0 ? texto : esCelcaAgregada ? 'N/A' : '';
        
        const textNode = document.createTextNode(textoCelda);
        celda.appendChild(textNode);
        
        celda.setAttribute('columna', atributo);
        celda.style.display = 'table-cell';
        return celda;
    };
    const crearBotonOpcion = (atributo, claseBoton = [], claseIcono = [], texto) => {
        const boton = document.createElement('buttom');
        const icono = document.createElement('i');
        const textoBoton = texto || texto === 0 ? texto : '';
        const textNode = document.createTextNode(textoBoton);
        claseBoton && boton.classList.add(...claseBoton);
        claseIcono && icono.classList.add(...claseIcono);
        boton.appendChild(icono);
        boton.appendChild(textNode);
        boton.setAttribute('id-row', atributo);

        return boton;
    }

    const crearRowData = (persona) => {
        const row = document.createElement('tr');
        row.classList.add('fila');
        arrayColumnas.forEach((columna) => {
            row.appendChild( crearCelda(persona[columna.atributo], columna.atributo) );
        });

        if (opciones) {

            //const celdaOpciones = crearCelda(null, colOpciones);//antes era 1 celda con 2 botones
            const celdaModificar = crearCelda(null, colModificar);
            celdaModificar.appendChild(crearBotonOpcion(persona.id, 'btn-modificar btn btn-opcion btn-azul'.split(' '), ['bx', 'bx-edit'], 'Modificar'));
            
            const celdaEliminar = crearCelda(null, colEliminar);
            celdaEliminar.appendChild(crearBotonOpcion(persona.id, 'btn-eliminar btn btn-opcion btn-rojo'.split(' '), ['bx', 'bx-trash'], 'Eliminar'));
            
            row.appendChild(celdaModificar);
            row.appendChild(celdaEliminar);

        }
        
        return row;
    }
    const generarEncabezadoTabla = () => {
        //const arrColumnas = Object.values(COLUMNAS);
        const fragment = new DocumentFragment();
        let celda = null;
        arrayColumnas.forEach((columna) => {
            celda = crearCelda(capitalizarPrimeraLetra(columna.titulo), columna.atributo, 'th');
            celda.appendChild(document.createElement('i'));
            fragment.appendChild( celda );
        });
        if (opciones) {
            //fragment.appendChild( crearCelda(capitalizarPrimeraLetra(colOpciones), colOpciones, 'th') );    
            fragment.appendChild( crearCelda(capitalizarPrimeraLetra(colModificar), colModificar, 'th') );    
            fragment.appendChild( crearCelda(capitalizarPrimeraLetra(colEliminar), colEliminar, 'th') );    
        }

        tabla.querySelector('thead').querySelector('tr').appendChild(fragment);
    }
    const limpiarTabla = () => {
        const tbody = tabla.querySelector('tbody');
        while (tbody.firstChild) {
            tbody.removeChild(tbody.firstChild);
        }
    }
    const igualarVisibilidadColumnas = () => {
        
        let display = 'table-cell';
        let atributoTh = null;
        const rowsHeader = tabla.querySelector('thead').querySelectorAll(`th`);
        const rowsBody = tabla.querySelector('tbody').querySelectorAll(`td`);

        for (const celdaTh of rowsHeader) {
            display = celdaTh.style.display;
            atributoTh = celdaTh.getAttribute('columna');
            if(atributoTh && atributoTh !== '' && display === 'none') {

                for (const celdaTd of rowsBody) {
                    if (atributoTh === celdaTd.getAttribute('columna')) {
                        celdaTd.style.display = 'none';
                    }
                }

            }
        }
    }

    const cargarTabla = async (data) => {
        
        try {
            limpiarTabla();

            const fragment = new DocumentFragment();
            let row;

            for (const u of data) {
                row = crearRowData(u);
                row.setAttribute('id-row', u.id);
                fragment.appendChild(row);
            }
            
            tabla.querySelector('tbody').appendChild(fragment);
            igualarVisibilidadColumnas();


        } catch (err) {
            console.log(err);
            alert('Error al cargar la  tabla: ' + err.message)
        }
    }

    const agregarRow = (persona) => {
        const row = crearRowData(persona);
        row.setAttribute('id-row', persona.id);
        tabla.querySelector('tbody').appendChild(row);
    }

    const setVisibilidadColumna = (columna, esVisible) => {
        
        const display = esVisible ? 'table-cell' : 'none';
        const rowsHeader = tabla.querySelector('thead').querySelectorAll(`th[columna="${columna}"]`);
        const rowsBody = tabla.querySelector('tbody').querySelectorAll(`td[columna="${columna}"]`);
        
        rowsHeader.forEach(celda => celda.style.display = display);
        rowsBody.forEach(celda => celda.style.display = display);
        
    }
    
    const setColumnaOrdenada = (columna, esAsc = true) => {
        const rowsHeader = tabla.querySelector('thead').querySelectorAll(`th`);
        let atributo = null;
        let icon = null;
        let claseCssAdd = esAsc ? 'bxs-down-arrow' : 'bxs-up-arrow';
        let claseCssRemove = esAsc ? 'bxs-up-arrow' : 'bxs-down-arrow';
        
        for (const th of rowsHeader) {
            atributo = th.getAttribute('columna');
            icon = th.querySelector('i');
            if (atributo === columna) {
                th.classList.add('columna-selecionada');
                icon && icon.classList.add('bx');
                icon && icon.classList.add(claseCssAdd);
                icon && icon.classList.remove(claseCssRemove);//cuando usaba spread borraba bx, pasar de una clase

            } else {
                th.classList.remove('columna-selecionada');
                icon && icon.classList.remove('bx', 'bxs-down-arrow', 'bxs-up-arrow');

            }
        }
    
        
    }

    const setTabla = (elementTable) => {
        if (!tabla || tabla.tagName !== 'TABLE') {
            tabla = elementTable;
            generarEncabezadoTabla();
        }
    }
    const crearDivConCheckboxYLabel = (atributo, titulo) => {
        const chbx = document.createElement('input');
        const label = document.createElement('label');
        const div = document.createElement('div');
        chbx.type = 'checkbox';
        chbx.value = atributo;
        chbx.checked = true;
        chbx.classList.add('checkbox-columna');
        label.appendChild( document.createTextNode(capitalizarPrimeraLetra(titulo)) );
        div.classList.add('container-checkbox-label');
        div.appendChild(chbx);
        div.appendChild(label);
        return div;
    }
    const generarCheckboxColumnas = () => {
        const fragment = new DocumentFragment();
        let div = null;
    
        arrayColumnas.forEach((columna) => {
            div = crearDivConCheckboxYLabel(columna.atributo, columna.titulo);
            fragment.appendChild(div);
    
        });

        if (opciones) {
            div = crearDivConCheckboxYLabel(colModificar, colModificar);
            fragment.appendChild(div);
            div = crearDivConCheckboxYLabel(colEliminar, colEliminar);
            fragment.appendChild(div);
        }

        return fragment;
    }

    const setOrden = (columna) => {
        
        if(ordenColumna.columna === columna) {
            ordenColumna.ordenAsc = !ordenColumna.ordenAsc;
        } else {
            ordenColumna.ordenAsc = true;
        }
    
        ordenColumna.columna = columna;

    }

    const agregarHandlerClickHead = (funcion) => {
        typeof funcion === 'function' && funcionesEventClickHead.push(funcion);
    }
    const agregarHandlerDblClickBody = (funcion) => {
        typeof funcion === 'function' && funcionesEventDblClickBody.push(funcion);
    }
    const agregarHandlerClickBody = (funcion) => {
        typeof funcion === 'function' && funcionesEventClickBody.push(funcion);
    }
    
    const handlerClickHead = (event) => {
        const target = event.target.closest('TH');
        const atributo = target?.getAttribute('columna');

        if (target.tagName === 'TH' && atributo !== colOpciones && atributo !== colModificar && atributo !== colEliminar) {
            setOrden(atributo);
            setColumnaOrdenada(atributo, ordenColumna.ordenAsc);
            funcionesEventClickHead.forEach(fn => fn(atributo, ordenColumna.ordenAsc, cargarTabla));
        }
    }

    const handlerDblClickBody = (event) => {
        const target = event.target.closest('TR');
        const id = target?.getAttribute('id-row');
        const boton = event.target.closest('BUTTOM.btn-opcion');
        
        if (target?.tagName === 'TR' && id && !boton) {
            funcionesEventDblClickBody.forEach(fn => fn(id, ESTADO.MODIFICAR, cargarTabla));
        }
    }

    const handlerClickBody = (event) => {
    
        const target = event.target.closest('BUTTOM.btn-opcion');
        const id = target?.getAttribute('id-row');
        const boolcheck = target?.tagName === 'BUTTOM' && id;
        const esModificar = target?.classList.contains('btn-modificar');
        const esEliminar = target?.classList.contains('btn-eliminar');
        const estado = esModificar ? ESTADO.MODIFICAR : esEliminar ? ESTADO.ELIMINAR : null;
        
        if (boolcheck && estado) {
            funcionesEventClickBody.forEach(fn => fn(id, estado, cargarTabla));
        }
    }

    const removerEventListeners = () => {
        tabla?.querySelector('thead')?.removerEventListeners('click', handlerClickHead);
        tabla?.querySelector('tbody')?.addEventListener('dblclick', handlerDblClickBody);
        tabla?.querySelector('tbody')?.addEventListener('click', handlerClickBody);
    }
    const agregarEventListeners = () => {
        tabla?.querySelector('thead')?.addEventListener('click', handlerClickHead);
        tabla?.querySelector('tbody')?.addEventListener('dblclick', handlerDblClickBody);
        tabla?.querySelector('tbody')?.addEventListener('click', handlerClickBody);

    }
    agregarEventListeners();

    if (tabla?.tagName === 'TABLE') {
        tabla = elementTable;
        generarEncabezadoTabla();
        cargarTabla(data);
    }

    return {
        cargarTabla,
        agregarRow,
        setVisibilidadColumna,
        generarCheckboxColumnas,
        agregarHandlerClickHead,
        agregarHandlerDblClickBody,
        agregarHandlerClickBody
    };
}

export default generarTabla;
