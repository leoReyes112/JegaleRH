import React from 'react';

const AboutModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">Sobre JEGALE</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="space-y-4">
          <p className="text-gray-700">
            JEGALE es una firma especializada en consultoría de talento humano con más de 15 años de experiencia 
            conectando a los mejores profesionales con las empresas más innovadoras.
          </p>
          <p className="text-gray-700">
            Nuestro sistema de gestión de reclutamiento está diseñado para optimizar todo el proceso de selección,
            desde la publicación de vacantes hasta la contratación del candidato ideal.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h4 className="font-medium text-blue-800 mb-2">Nuestra Misión</h4>
            <p className="text-blue-700">
              Transformar el proceso de reclutamiento mediante tecnología innovadora que beneficie 
              tanto a empresas como a candidatos.
            </p>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutModal;