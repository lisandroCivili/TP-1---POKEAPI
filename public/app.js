async function buscarPokemon() {
    const input = document.getElementById('pokeInput').value.trim();
    const divResultado = document.getElementById('resultado');
    const mensajeError = document.getElementById('mensajeError');

    divResultado.style.display = 'none';
    mensajeError.innerText = '';

    if (!input) {
        mensajeError.innerText = 'Ingresa nombre o numero por favor';
        return;
    }

    try {
        // Usamos axios en vez de fetch
        const respuesta = await axios.get(`/api/pokemon/${input}`);
        
        // Acordate que en axios la info viene adentro de ".data"
        const data = respuesta.data;

        document.getElementById('pokeNombre').innerText = data.nombre.toUpperCase();
        document.getElementById('pokeNum').innerText = data.numero;
        document.getElementById('pokeImg').src = data.imagen;
        document.getElementById('pokeAltura').innerText = data.altura;
        document.getElementById('pokePeso').innerText = data.peso;
        document.getElementById('pokeTipos').innerText = data.tipos;

        divResultado.style.display = 'block';

    } catch (error) {
        // Atrapamos el error que nos manda nuestro propio backend (el 404 o el 500)
        if (error.response && error.response.data && error.response.data.error) {
            mensajeError.innerText = error.response.data.error;
        } else {
            mensajeError.innerText = 'Hubo un problema de conexión con el servidor';
        }
    }
}