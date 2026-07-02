import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [lista, setLista] = useState([]);
  const [busqueda, setBusqueda] = useState(''); 

  
  useEffect(() => {
    axios.get('http://localhost:3001/api/universidades')
      .then(respuesta => setLista(respuesta.data)) 
      .catch(error => console.error("Error al conectar:", error));
  }, []);

  
  const universidadesFiltradas = lista.filter(uni => 
    uni.name.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Buscador de Universidades</h1>
      <p style={{ color: '#666' }}>Ingresa Universidad</p>
      
      <input 
        type="text" 
        placeholder="Escribe para filtrar en tiempo real..." 
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)} 
        style={{ padding: '10px', width: '100%', maxWidth: '400px', marginBottom: '20px' }}
      />

     
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {universidadesFiltradas.map(uni => (
          <li key={uni.id} style={{ padding: '10px', marginBottom: '5px', background: '#f5f5f5', borderLeft: '5px solid #7B0000' }}>
            <strong>{uni.name}</strong> — {uni.country}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;