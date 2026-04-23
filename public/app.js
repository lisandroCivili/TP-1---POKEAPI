async function buscarPokemon() {
    const input = document.getElementById('pokeInput').value.trim();
    const divResultado = document.getElementById('resultado');
    const mensajeError = document.getElementById('mensajeError');

    // Limpiamos la vista antes de buscar
    divResultado.style.display = 'none';
    mensajeError.innerText = '';

    if (!input) {
        mensajeError.innerText = 'Ingrese numero o nombre';
        return;
    }

    try {
        // Le pegamos a NUESTRO backend, no directo a la pokeapi
        const respuesta = await fetch(`/api/pokemon/${input}`);
        const data = await respuesta.json();

        if (!respuesta.ok) {
            mensajeError.innerText = data.error || 'No se encontró nada.';
            return;
        }

        // Si salió todo bien, llenamos los datos en el HTML
        document.getElementById('pokeNombre').innerText = data.nombre.toUpperCase();
        document.getElementById('pokeNum').innerText = data.numero;
        document.getElementById('pokeImg').src = data.imagen;
        document.getElementById('pokeAltura').innerText = data.altura;
        document.getElementById('pokePeso').innerText = data.peso;
        document.getElementById('pokeTipos').innerText = data.tipos;

        // Mostramos la tarjeta
        divResultado.style.display = 'block';

    } catch (error) {
        mensajeError.innerText = 'Hubo un problema de conexión con el servido.';
    }
}