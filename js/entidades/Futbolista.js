import Persona from "./Persona.js";

class Futbolista extends Persona {

    constructor({id = null, nombre, apellido, edad, equipo, posicion, cantidadGoles}) {
        super(nombre, apellido, edad, id);
        this.cantidadGoles = parseInt(cantidadGoles);
        this.equipo = equipo;
        this.posicion = posicion;

        this.#controlarParametros();
    }

    #controlarParametros() {
        if (this.cantidadGoles <= -1) {
            throw new Error('El sueldo debe ser mayor a cero');
        }
        console.log(this);
        if (!this.equipo || !this.posicion || (this.cantidadGoles !== 0 && !this.cantidadGoles)) {
            throw new Error('Debe ingresar equipo, posicion y cantidad goles');
        }
    }

    static esFutbolista(objeto) {
        return !!objeto && objeto.hasOwnProperty('equipo') && objeto.hasOwnProperty('posicion') && objeto.hasOwnProperty('cantidadGoles');
    }

    static crearFutbolista(objeto) {
        let entidad = null;
        if (Futbolista.esFutbolista(objeto)) {
            entidad = new Futbolista(objeto);
        }
        return entidad;
    }
}

export default Futbolista;