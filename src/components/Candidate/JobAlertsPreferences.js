import React, { useState, useEffect } from 'react';

const JobAlertsPreferences = ({ userPreferences, onSave }) => {
  const [preferences, setPreferences] = useState({
    jobType: userPreferences?.jobType || '',
    location: userPreferences?.location || '',
    salaryMin: userPreferences?.salaryMin || '',
    salaryMax: userPreferences?.salaryMax || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPreferences(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(preferences);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Preferencias de Alertas de Empleo</h2>
      <div className="mb-4">
        <label htmlFor="jobType" className="block text-gray-700 mb-1">Tipo de Trabajo</label>
        <input
          type="text"
          id="jobType"
          name="jobType"
          value={preferences.jobType}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="Ejemplo: Tiempo completo, Medio tiempo"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="location" className="block text-gray-700 mb-1">Ubicación</label>
        <input
          type="text"
          id="location"
          name="location"
          value={preferences.location}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="Ciudad, Estado o País"
        />
      </div>
      <div className="mb-4 flex space-x-4">
        <div className="flex-1">
          <label htmlFor="salaryMin" className="block text-gray-700 mb-1">Salario Mínimo</label>
          <input
            type="number"
            id="salaryMin"
            name="salaryMin"
            value={preferences.salaryMin}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="0"
            min="0"
          />
        </div>
        <div className="flex-1">
          <label htmlFor="salaryMax" className="block text-gray-700 mb-1">Salario Máximo</label>
          <input
            type="number"
            id="salaryMax"
            name="salaryMax"
            value={preferences.salaryMax}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="0"
            min="0"
          />
        </div>
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
      >
        Guardar Preferencias
      </button>
    </form>
  );
};

export default JobAlertsPreferences;
