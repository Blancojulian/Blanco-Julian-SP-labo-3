class Col {
    constructor(atributo, titulo) {
        this.atributo = atributo;
        this.titulo = titulo;
    }
}

export const COLUMNAS_PERSONAS = {
    ID: new Col('id', 'id'),
    NOMBRE: new Col('nombre', 'nombre'),
    APELLIDO: new Col('apellido', 'apellido'),
    EDAD: new Col('edad', 'edad'),
    //FUTBOLISTA
    EQUIPO: new Col('equipo', 'equipo'),
    POSICION: new Col('posicion', 'posicion'),
    CANTIDAD_GOLES: new Col('cantidadGoles', 'cantidad Goles'),
    //PROFESIONAL
    TITULO: new Col('titulo', 'titulo'),
    FACULTAD: new Col('facultad', 'facultad'),
    AÑO_GRADUACION: new Col('añoGraduacion', 'año Graduacion')
}

Object.freeze(COLUMNAS_PERSONAS);
Object.seal(COLUMNAS_PERSONAS);
/*
export const COLUMNAS_PERSONAS = {
    ID: new Col('id', 'id'),
    NOMBRE: new Col('nombre', 'nombre'),
    APELLIDO: new Col('apellido', 'apellido'),
    EDAD: new Col('edad', 'edad'),
    //EMPLEADO
    SUELDO: new Col('sueldo', 'sueldo'),
    VENTAS: new Col('ventas', 'ventas'),
    //CLIENTE
    COMPRAS: new Col('compras', 'compras'),
    TELEFONO: new Col('telefono', 'telefono'),
}

Object.freeze(COLUMNAS_PERSONAS);
Object.seal(COLUMNAS_PERSONAS);
*/
export const FILTROS = {
    TODOS: 'todos',
    FUTBOLISTA: 'futbolista',
    PROFESIONAL: 'profesional'

}

Object.freeze(FILTROS);
Object.seal(FILTROS);

export const ESTADO = {
    ALTA: 'alta',
    MODIFICAR: 'modificar',
    ELIMINAR: 'eliminar'

}

Object.freeze(ESTADO);
Object.seal(ESTADO);
