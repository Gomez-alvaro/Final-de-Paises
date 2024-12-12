import React, { useState, useEffect } from 'react';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [countries, setCountries] = useState([]);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (searchTerm) {
      const fetchCountries = async () => {
        try {
          const response = await fetch(`https://restcountries.com/v3.1/name/${searchTerm}`);
          if (!response.ok) throw new Error('No se encontraron resultados');
          const data = await response.json();
          setCountries(data);
          setError('');
          // Actualizar historial
          setHistory(prevHistory => {
            const newHistory = [data[0].name.common, ...prevHistory];
            return [...new Set(newHistory)].slice(0, 5); // Sin duplicados y solo los últimos 5
          });
        } catch (err) {
          setCountries([]);
          setError(err.message);
        }
      };

      fetchCountries();
    } else {
      setCountries([]);
      setError('');
    }
  }, [searchTerm]);

  return (
    <div>
      <h1>Búsqueda de Países</h1>
      <input
        type="text"
        placeholder="Ingresa el nombre de un país"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {error && <p>{error}</p>}
      <div>
        {countries.length > 0 ? (
          countries.map((country) => (
            <div key={country.cca3}>
              <h2>{country.name.common}</h2>
              <p>Capital: {country.capital ? country.capital[0] : 'No disponible'}</p>
              <p>Población: {country.population}</p>
              <img src={country.flags.png} alt={`Bandera de ${country.name.common}`} width="100" />
            </div>
          ))
        ) : (
          <p>No hay resultados</p>
        )}
      </div>
      <h2>Historial de Búsquedas</h2>
      <ul>
        {history.map((country, index) => (
          <li key={index}>{country}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;