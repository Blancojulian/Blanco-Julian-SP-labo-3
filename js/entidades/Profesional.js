import Persona from "./Persona.js";

class Profesional extends Persona {

    constructor({id = null, nombre, apellido, edad, titulo, facultad, añoGraduacion}) {
        super(nombre, apellido, edad, id);
        this.añoGraduacion = parseInt(añoGraduacion);
        this.titulo = titulo;
        this.facultad = facultad;
        this.#controlarParametros();
    }

    #controlarParametros() {
        if (this.añoGraduacion <= 1950) {
            throw new Error('El año graduacion debe ser mayor a 1950');
        }
        if (!this.titulo || !this.facultad || !this.añoGraduacion) {
            throw new Error('Debe ingresar titulo, facultad y año graduacion');
        }
    }

    static esProfesional(objeto) {
        return !!objeto && objeto.hasOwnProperty('titulo') && objeto.hasOwnProperty('facultad') && objeto.hasOwnProperty('añoGraduacion');
    }

    static crearProfesional(objeto) {
        let entidad = null;
        if (Profesional.esProfesional(objeto)) {
            entidad = new Profesional(objeto);
        }
        return entidad;
    }
}

export default Profesional;