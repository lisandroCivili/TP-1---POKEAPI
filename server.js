const express = require('express');
const cors = require('cors');
const axios = require('axios'); 
const app = express();
const port = 3000;

app.use(cors());
app.use(express.static('public'));

app.get('/api/pokemon/:identificador', async (req, res) => {
    const pokemon = req.params.identificador.toLowerCase();
    
    try {
        const respuesta = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        
        const data = respuesta.data;

        const pokeData = {
            nombre: data.name,
            numero: data.id,
            imagen: data.sprites.front_default,
            altura: data.height,
            peso: data.weight,
            tipos: data.types.map(t => t.type.name).join(', ')
        };

        res.json(pokeData);

    } catch (error) {
        if (error.respuesta && error.respuesta.status === 404) {
            return res.status(404).json({ error: 'Pokemón no econtrado' });
        }
        
        console.log("Error en el servidor:", error.message);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo de ruta en http://localhost:${port}`);
});