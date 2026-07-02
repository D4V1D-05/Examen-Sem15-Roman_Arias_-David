import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [lista, setLista] = useState([]);
  const [busqueda, setBusqueda] = useState(''); 

  // useEffect con [] se ejecuta una sola vez al montar el componente en pantalla
  useEffect(() => {
    axios.get('http://localhost:3001/api/universidades')
      .then(respuesta => {
        setLista(respuesta.data); // Guarda el JSON convertido por Axios
      })
      .catch(error => {
        console.error("Error al conectar con el backend:", error);
      });
  }, []);

  
  const universidadesFiltradas = lista.filter(uni => 
    uni.name.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Buscador de Universidades </h1>
      <p style={{ color: '#666' }}>Ingrese la Universidad</p>
      
      {}
      <input 
        type="text" 
        placeholder="Buscar universidad por nombre..." 
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        style={{ 
          padding: '10px', 
          width: '100%', 
          maxWidth: '400px', 
          marginBottom: '20px',
          borderRadius: '4px',
          border: '1px solid #ccc'
        }}
      />

      {/* Renderizado dinámico usando .map() con prop key única basada en el ID*/}
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {universidadesFiltradas.map(uni => (
          <li 
            key={uni.id} 
            style={{ 
              padding: '12px', 
              marginBottom: '8px', 
              background: '#f9f9f9', 
              borderLeft: '5px solid #7B0000', 
              borderRadius: '4px' 
            }}
          >
            <strong>{uni.name}</strong> — <span style={{ color: '#888' }}>{uni.country}</span>
          </li>
        ))}
      </ul>
      
      {universidadesFiltradas.length === 0 && <p style={{ color: 'red' }}>No se encontraron resultados.</p>}
    </div>
  );
}

export default App;