const express = require('express');
const cors = require('cors'); 
const axios = require('axios'); 
const app = express();

app.use(cors());
app.use(express.json());


app.get('/api/universidades', async (req, res) => {
  try {
    
    const respuestaExterna = await axios.get('https://universities.hipolabs.com/search?country=Peru', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows) AppleWebKit/537.36'
      }
    });

    
    const universidadesConId = respuestaExterna.data.map((uni, index) => ({
      id: index + 1, 
      name: uni.name,
      country: uni.country
    }));

    res.json(universidadesConId);
  } catch (error) {
    console.error("Error en puente:", error.message);
    res.status(500).json({ error: "No se pudieron obtener los datos de la API real" });
  }
});

app.listen(3001, () => console.log('Backend corriendo en el puerto 3001'));