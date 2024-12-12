import React from 'react';

const Poblacion = ({ countries }) => {
  return (
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
  );
};

export default Poblacion;