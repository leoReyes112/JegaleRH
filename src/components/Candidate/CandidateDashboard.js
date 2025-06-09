import React, { useState, useEffect } from 'react';
import VacancyCard from './VacancyCard';
import ApplicationForm from './ApplicationForm';
import DB from '../../mock/database';
import UserIcon from '../Icons/UserIcon';
const CandidateDashboard = ({ onBack }) => {
  const [selectedVacancy, setSelectedVacancy] = useState(null);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [activeVacancies, setActiveVacancies] = useState([]);

  useEffect(() => {
    // Obtenemos solo las vacantes activas para el candidato
    setActiveVacancies(DB.getActiveVacancies());
  }, []);

  const handleApply = (vacancyId) => {
    setSelectedVacancy(vacancyId);
    setApplicationSubmitted(false);
  };

  const handleSubmitSuccess = () => {
    setApplicationSubmitted(true);
    setSelectedVacancy(null);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center space-x-3 mb-8">
        <UserIcon />
        <h1 className="text-2xl font-bold text-gray-800">Vacantes Disponibles</h1>
      </div>

      {onBack && (
        <button
          onClick={onBack}
          className="mb-6 flex items-center text-gray-600 hover:text-gray-900 space-x-1"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Regresar</span>
        </button>
      )}

      {applicationSubmitted ? (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-8">
          ¡Tu aplicación ha sido enviada con éxito! Nos pondremos en contacto contigo pronto.
        </div>
      ) : null}

      {selectedVacancy ? (
        <div className="bg-white rounded-xl shadow-md p-6">
          <ApplicationForm 
            vacancyId={selectedVacancy} 
            onSubmit={handleSubmitSuccess} 
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeVacancies.map(vacancy => (
            <VacancyCard 
              key={vacancy.id} 
              vacancy={vacancy} 
              onApply={handleApply} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CandidateDashboard;

// DONE