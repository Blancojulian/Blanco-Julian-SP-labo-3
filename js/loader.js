const generarLoader = (idLoader = 'loader') => {

    const loader = document.getElementById(idLoader);

    const mostrarLoader = () => {
        loader.style.display = 'flex';
    }

    const ocultarLoader = () => {
        loader.style.display = 'none';
    }

    return {
        mostrarLoader,
        ocultarLoader
    }
}

export default generarLoader;