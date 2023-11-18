import Persona from "./Persona.js";

class Empleado extends Persona {

    constructor({id = null, nombre, apellido, edad, sueldo, ventas}) {
        super(nombre, apellido, edad, id);
        this.sueldo = parseFloat(sueldo);
        this.ventas = parseFloat(ventas);

        this.#controlarParametros();
    }

    #controlarParametros() {
        if (this.sueldo <= 0) {
            throw new Error('El sueldo debe ser mayor a cero');
        }
        if (this.ventas <= 0) {
            throw new Error('La ventas deben ser mayor a cero');
        }
        if (!this.sueldo || !this.ventas) {
            throw new Error('Debe ingresar sueldo y ventas');
        }
    }

    static controlarParametros({nombre, apellido, edad, sueldo, ventas}) {
        super.controlarParametros(nombre, apellido, edad)
        sueldo = parseFloat(sueldo);
        ventas = parseFloat(ventas);
        
        if (sueldo <= 0) {
            throw new Error('El sueldo debe ser mayor a cero');
        }
        if (ventas <= 0) {
            throw new Error('La ventas deben ser mayor a cero');
        }
        if (!sueldo || !ventas) {
            throw new Error('Debe ingresar sueldo y ventas');
        }
        if ((typeof sueldo !== 'number' && isNaN(sueldo)) || (typeof ventas !== 'number' && isNaN(ventas))) {
            throw new Error('Sueldo y ventas deben ser un numero'); 
        }
    }

    static esEmpleado(objeto) {
        return !!objeto && objeto.hasOwnProperty('sueldo') && objeto.hasOwnProperty('ventas');
    }

    static crearEmpleado(objeto) {
        let entidad = null;
        if (Empleado.esEmpleado(objeto)) {
            entidad = new Empleado(objeto);
        }
        return entidad;
    }
}

export default Empleado;