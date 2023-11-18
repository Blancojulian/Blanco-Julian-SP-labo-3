class Persona{
    
    constructor(nombre, apellido, edad, id = null) {
        this.id = id ? parseInt(id) : null;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = parseInt(edad);
        this.#controlarParametros();
    }

    toString() {

    }

    #controlarParametros() {
        /*if (typeof this.id !== 'number') {
            throw new Error('Id debe ser un numero');
        }*/
        if (typeof this.edad !== 'number') {
            throw new Error('Edad debe ser un numero');
            
        }
        if (this.edad <= 15) {
            throw new Error('La edad debe ser mayor a cero');
        }
        
        if (!this.nombre || !this.apellido || !this.edad) {
            throw new Error('Debe ingresar un id, nombre, apellido y edad');
        }
        
        
    }

    static controlarParametros(nombre, apellido, edad) {
        
        edad = parseInt(edad);
        if (typeof edad !== 'number') {
            throw new Error('Edad debe ser un numero'); 
        }
        if (edad <= 0) {
            throw new Error('La edad debe ser mayor a cero');
        }
        
        if (!nombre || !apellido || !edad) {
            throw new Error('Debe ingresar un id, nombre, apellido y edad');
        }
        
        
    }

}

export default Persona;