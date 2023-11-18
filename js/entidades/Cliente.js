import Persona from "./Persona.js";

class Cliente extends Persona {

    constructor({id = null, nombre, apellido, edad, compras, telefono}) {
        super(nombre, apellido, edad, id);
        this.compras = parseFloat(compras);
        this.telefono = telefono;
        this.#controlarParametros();
    }

    #controlarParametros() {
        if (this.compras <= 0) {
            throw new Error('La ventas deben ser mayor a cero');
        }
        if (!this.compras || !this.telefono) {
            throw new Error('Debe ingresar compras y telefono');
        }
    }

    static controlarParametros({nombre, apellido, edad, compras, telefono}) {
        super.controlarParametros(nombre, apellido, edad)
        compras = parseFloat(compras);

        
        if (compras <= 0) {
            throw new Error('La ventas deben ser mayor a cero');
        }
        if (!compras || !telefono) {
            throw new Error('Debe ingresar compras y telefono');
        }
        if (typeof compras !== 'number' && isNaN(compras)) {
            throw new Error('Compras deben ser un numero'); 
        }
    }

    static esCliente(objeto) {
        return !!objeto && objeto.hasOwnProperty('compras') && objeto.hasOwnProperty('telefono');
    }

    static crearCliente(objeto) {
        let entidad = null;
        if (Cliente.esCliente(objeto)) {
            entidad = new Cliente(objeto);
        }
        return entidad;
    }
}

export default Cliente;