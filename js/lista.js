import { FILTROS } from "./constantes.js";
import Empleado from "./entidades/Empleado.js";
import Cliente from "./entidades/Cliente.js";
import Futbolista from "./entidades/Futbolista.js";
import Profesional from "./entidades/Profesional.js";

const generarLista = (array = []) => {

    let lista = array;
    let listaFiltrada = array;

    const getLastId = () => lista.length === 0 ? 1 : (Math.max(...lista.map((item) => item.id)) + 1);

    const addItem = (item) => {
        if (!item) {
            throw new Error('Debe ingresar un item');
        }
        if (!item.hasOwnProperty('id')) {
            throw new Error('Debe ingresar un id para el item');
        }
        
        lista.push(item);
    }
    
    const deleteItem = (id) => {
        id = parseInt(id);
        lista = lista.filter((item) => item.id !== id);
        listaFiltrada = listaFiltrada.filter((item) => item.id !== id);
    }
    
    const updateItem = (id, item) => {
        id = parseInt(id);
        const i = lista.findIndex((item) => item.id === id);

        if (i !== -1) {
            lista[i] = item;
        }
    }

    const getItem = (id) => {
        id = parseInt(id);
        const i = lista.findIndex((item) => item.id === id);
        let item = null;
        if (i !== -1) {
            item = lista[i];
        }
        
        return item;
    }

    const filtarLista = (filtro) => {
        filtro = filtro.toLowerCase();

        listaFiltrada = lista.filter((item) => {
            return (filtro === FILTROS.FUTBOLISTA && item instanceof Futbolista) ||
            (filtro === FILTROS.PROFESIONAL && item instanceof Profesional) || filtro === FILTROS.TODOS;
        });
        
        return listaFiltrada;
    }
    const ordenarLista = (campo) => {
        lista.sort((a, b) => {
            if (a[campo] > b[campo] || (a[campo] === undefined && b.hasOwnProperty(campo))) {
                return 1;
              }
              if (a[campo] < b[campo] || (b[campo] === undefined && a.hasOwnProperty(campo)/*[campo]*/)) {
                return -1;
              }
              return 0;
        });
    }
    //VER
    const ordenarListaAscDes = (campo, esAsc) => {
        lista.sort((a, b) => {
            const aAux = typeof a[campo] === 'string' ? a[campo].toLowerCase() : a[campo];
            const bAux = typeof b[campo] === 'string' ? b[campo].toLowerCase() : b[campo];

            const AMayor = aAux > bAux;
            const BMayor = aAux < bAux;
            const ANulo = aAux === undefined && b.hasOwnProperty(campo);
            const BNulo = bAux === undefined && a.hasOwnProperty(campo);
            const ambosNulos = aAux === undefined && bAux === undefined;
            const res = a.id - b.id;
            if ( (esAsc && AMayor) || (!esAsc && BMayor) || ANulo || (ambosNulos && ((esAsc && res > 0) || (!esAsc && !(res > 0)))) ) {
                return 1;
            }
            if ( (esAsc && BMayor) || (!esAsc && AMayor) || BNulo || (ambosNulos && ((esAsc && res < 0) || (!esAsc && !(res < 0)))) ) {
                return -1;
            }
            return 0;
        });
    }

    const getLista = () => structuredClone(lista);

    const getListaFiltrada = () => structuredClone(listaFiltrada);

    return {
        getLista,
        getListaFiltrada,
        addItem,
        deleteItem,
        updateItem,
        filtarLista,
        ordenarLista,
        ordenarListaAscDes,
        getItem,
        getLastId
    }
}

export default generarLista;