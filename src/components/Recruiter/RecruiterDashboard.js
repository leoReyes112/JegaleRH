import React, { useState, useEffect } from 'react';
import { VacancyList } from './VacancyList';
import VacancyForm from './VacancyForm';
import DB from '../../mock/database';
import DocumentIcon from '../Icons/DocumentIcon';
import SolicitudesList from './SolicitudesList';
import RecruiterAnalyticsDashboard from './RecruiterAnalyticsDashboard';
import { candidates as initialCandidates } from '../../mock/users';
import eventBus from '../../utils/eventBus';

const RecruiterDashboard = () => {
  const [vacancies, setVacancies] = useState([]);
  const [candidates, setCandidates] = useState(initialCandidates);
  const [showForm, setShowForm] = useState(false);
  const [currentVacancy, setCurrentVacancy] = useState(null);
  const [activeTab, setActiveTab] = useState('vacantes');

  useEffect(() => {
    // Obtenemos todas las vacantes usando el nuevo método
    setVacancies(DB.getAllVacancies());

    // Subscribe to candidateAdded event to update candidates state
    const onCandidateAdded = (newCandidate) => {
      setCandidates(prevCandidates => [...prevCandidates, newCandidate]);
    };
    eventBus.on('candidateAdded', onCandidateAdded);

    // Cleanup subscription on unmount
    return () => {
      eventBus.off('candidateAdded', onCandidateAdded);
    };
  }, []);

  const handleCreate = () => {
    setCurrentVacancy(null);
    setShowForm(true);
  };

  const handleEdit = (vacancy) => {
    setCurrentVacancy(vacancy);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    DB.deleteVacancy(id);
    setVacancies(DB.getAllVacancies());
  };

  const handleSubmit = (vacancy) => {
    if (currentVacancy) {
      DB.updateVacancy(currentVacancy.id, vacancy);
    } else {
      DB.createVacancy(vacancy);
    }
    setVacancies(DB.getAllVacancies());
    setShowForm(false);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-3">
          <DocumentIcon />
          <h1 className="text-2xl font-bold text-gray-800">Gestión de Vacantes</h1>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab('vacantes')}
            className={`px-4 py-2 rounded-lg font-semibold ${
              activeTab === 'vacantes' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Vacantes
          </button>
          <button
            onClick={() => setActiveTab('solicitudes')}
            className={`px-4 py-2 rounded-lg font-semibold ${
              activeTab === 'solicitudes' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Solicitudes
          </button>
          <button
            onClick={() => setActiveTab('analitica')}
            className={`px-4 py-2 rounded-lg font-semibold ${
              activeTab === 'analitica' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Analítica
          </button>
          {activeTab === 'vacantes' && (
            <button
              onClick={handleCreate}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>Crear Vacante</span>
            </button>
          )}
        </div>
      </div>

      {activeTab === 'vacantes' ? (
        showForm ? (
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <VacancyForm
              vacancy={currentVacancy}
              onSubmit={handleSubmit}
              onCancel={() => setShowForm(false)}
            />
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <VacancyList
              vacancies={vacancies}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        )
      ) : activeTab === 'solicitudes' ? (
        <SolicitudesList
          candidates={candidates}
          setCandidates={setCandidates}
        />
      ) : activeTab === 'analitica' ? (
        <RecruiterAnalyticsDashboard
          vacancies={vacancies}
          candidates={candidates}
        />
      ) : null
      }
    </div>
  );
};

export default RecruiterDashboard;
