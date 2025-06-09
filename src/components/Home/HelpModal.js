import React from 'react';

const HelpModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">Guía de Uso</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="space-y-4">
          <div className="border-b pb-4">
            <h4 className="font-medium text-gray-800 mb-2">Para Candidatos</h4>
            <ol className="list-decimal pl-5 space-y-2 text-gray-700">
              <li>Haz clic en "Soy Candidato"</li>
              <li>Explora las vacantes disponibles</li>
              <li>Selecciona la vacante de tu interés</li>
              <li>Completa el formulario de aplicación</li>
              <li>Sube tu CV en formato PDF</li>
              <li>Envía tu aplicación</li>
            </ol>
          </div>
          <div>
            <h4 className="font-medium text-gray-800 mb-2">Para Reclutadores</h4>
            <ol className="list-decimal pl-5 space-y-2 text-gray-700">
              <li>Haz clic en "Soy Reclutador"</li>
              <li>Inicia sesión con tus credenciales</li>
              <li>Gestiona vacantes desde el panel</li>
              <li>Crea, edita o elimina vacantes</li>
              <li>Revisa las aplicaciones recibidas</li>
            </ol>
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

export default HelpModal;