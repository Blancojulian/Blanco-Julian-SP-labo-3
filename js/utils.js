
export const capitalizarPrimeraLetra = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export const esNumeroValido = (num) => num !== '' && !isNaN(num);

export const calcularPromedio = (propiedad, lista = []) => {

    if (!propiedad) {
        throw new Error('Debe ingresar la concepto a calcular promedio');
    }
    if (lista.length <= 0) {
        throw new Error('La lista debe contener personas');
    }
    const suma = lista.reduce((acumulador, entidad) => {
        return acumulador + entidad[propiedad];
    }, 0);
    
    return (suma / lista.length).toFixed(2);
}
//no funciona con los input que tienen disabled
export const formDataToObject = (formData) => {
    const object = {};
    formData.forEach((value, key) =>object[key] = value);
    return object;
}

export const guardarEnLocalStorage = (data = []) => {
    try {
        if (typeof(Storage) === "undefined") {
            throw new Error('LocalStorage no soportado en este navegador');
        }
        localStorage.setItem('data', JSON.stringify(data));
    } catch (err) {
        console.log(err.message);
        throw err;
    }
}

export const leerLocalStorage = () => {
    let data = null;
    try {
        if (typeof(Storage) === "undefined") {
            throw new Error('LocalStorage no soportado en este navegador');
        }
        data = localStorage.getItem('data');
    } catch (err) {
        console.log(err.message);
        throw err;
    }

    return data;
}

export const  parsearArray = (json, ...crearEntidadArr) => {
    const array = JSON.parse(json);
    const newArray = [];
    let entidadAux = null;

    for (const entidad of array) {

        entidadAux = null;
        
        for (const crearEntidad of crearEntidadArr) {
            entidadAux = crearEntidad(entidad);
            if (entidadAux) {
                break;
            }
        }
        entidadAux && newArray.push(entidadAux);
    }
    return newArray;
}

export const  convertirAArrayEntidad = (array, ...crearEntidadArr) => {
    
    const newArray = [];
    let entidadAux = null;

    for (const entidad of array) {

        entidadAux = null;
        
        for (const crearEntidad of crearEntidadArr) {
            entidadAux = crearEntidad(entidad);
            if (entidadAux) {
                break;
            }
        }
        entidadAux && newArray.push(entidadAux);
    }
    return newArray;
}
/*
export const  parsearArray = (json) => {
    const array = JSON.parse(json);
    const newArray = [];
    let entidad = null;

    for (const ent of array) {

        entidad = null;
        if (Heroe.esHeroe(ent)) {
            entidad = new Heroe(ent);
        } else if (Villano.esVillano(ent)) {
            entidad = new Villano(ent);
        }

        for (const esEntidad of fn) {
            if (fn(v)) {
                vehiculo = new Heroe(v);
            }
        }
        entidad && newArray.push(entidad);
    }
    return newArray;
}*/