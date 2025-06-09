import React from 'react';
import BriefcaseIcon from '../Icons/BriefcaseIcon';

const VacancyCard = ({ vacancy, onApply }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-100">
      <div className="p-6">
        <div className="flex items-start space-x-4">
          <div className="bg-blue-100 p-3 rounded-lg">
            <BriefcaseIcon />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{vacancy.title}</h3>
                <p className="text-gray-600">{vacancy.department}</p>
              </div>
              <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-medium">
                {vacancy.salary}
              </span>
            </div>
            <p className="mt-4 text-gray-700">{vacancy.description}</p>
            <div className="mt-6 flex justify-between items-center">
              <span className="text-sm text-gray-500">
                Publicado: {new Date(vacancy.createdAt).toLocaleDateString()}
              </span>
              <button
                onClick={() => onApply(vacancy.id)}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Aplicar</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default VacancyCard;