
class Modal{

    constructor(idModal) {
        this.modal = document.getElementById(idModal);
        this.btnAceptar = this.modal.querySelector('.btn-modal-aceptar');
        this.btnCancelar = this.modal.querySelector('.btn-modal-cancelar');
        this.titulo = this.modal.querySelector('.titulo-modal');
        this.texto = this.modal.querySelector('.texto-modal');
        this.botones = this.modal.querySelector('.botones-modal');
        this.fondo = this.modal.querySelector('.modal-container');

    }

    #limpiarTexto() {
        while (this.titulo.firstChild) {
            this.titulo.removeChild(this.titulo.firstChild);
        }
        while (this.texto.firstChild) {
            this.texto.removeChild(this.texto.firstChild);
        }
    }

    #setTituloYTexto(titulo = '', texto = '') {
        this.#limpiarTexto();
        const textNodeTitulo = document.createTextNode(titulo);
        const textNodeTexto = document.createTextNode(texto);
        this.titulo.appendChild(textNodeTitulo);
        this.texto.appendChild(textNodeTexto);
    }

    #mostrarModal(titulo, texto) {
        this.modal.style.display = 'block';
        this.#setTituloYTexto(titulo, texto);
    }
    

    #cerrarModal() {
        this.modal.style.display = 'none';
        this.#setTituloYTexto();
    }
    #setDisabledBtnCancelar(isDisabled){
        this.btnCancelar.disabled = isDisabled;
        this.btnCancelar.style.visibility = isDisabled ? 'hidden' : 'visible';
    }

    async pedirRespuesta(titulo, texto) {
        this.#setDisabledBtnCancelar(false);
        this.#mostrarModal(titulo, texto);

        const respuesta = await new Promise((resolve, reject) => {

            const darRespuesta = (event) => {
                const target = event.target;
                if (target.classList.contains('btn-modal')) {
                    this.botones.removeEventListener('click', darRespuesta);
                    resolve(target.classList.contains('btn-modal-aceptar'));
                }
            }
            this.botones.addEventListener('click', darRespuesta);
          });
        this.#cerrarModal();
        return respuesta;
    }
    //#crearPromesa
    async mostrarMensaje(titulo, texto) {
        this.#setDisabledBtnCancelar(true);
        this.#mostrarModal(titulo, texto);

        const respuesta = await new Promise((resolve, reject) => {

            const darRespuesta = (event) => {
                const target = event.target;
                if (target.classList.contains('btn-modal') && target.classList.contains('btn-modal-aceptar')) {
                    this.botones.removeEventListener('click', darRespuesta);
                    resolve(null);
                }
            }
            this.botones.addEventListener('click', darRespuesta);
          });
        this.#cerrarModal();
        return respuesta;
    }
}

export default Modal;