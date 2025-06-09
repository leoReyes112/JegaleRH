import React, { useState } from 'react';
import BriefcaseIcon from '../Icons/BriefcaseIcon';
import TeamIcon from '../Icons/TeamIcon';
import AboutModal from '../Home/AboutModal';
import HelpModal from '../Home/HelpModal';
import CorporateImage from '../Graphics/CorporateImage';
import vistarecursos from '../Graphics/vistarecursos.jpg';

/**
 * The HomeHero component takes in two functions as props and manages state for showing the About and
 * Help sections.
 */
const HomeHero = ({ onShowCandidate, onShowRecruiter }) => {
  const [showAbout, setShowAbout] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  return (
    <>
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white min-h-screen flex flex-col">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-grow">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">
            <div className="text-center lg:text-left flex flex-col justify-center h-full">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="text-blue-400">JEGALE</span> Gestión de Recursos Humanos.
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                La plataforma de reclutamiento más completa para empresas y profesionales
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 mb-12 justify-center lg:justify-start">
                <button
                  onClick={onShowCandidate}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-6 rounded-lg font-medium transition-all flex items-center justify-center space-x-2 w-full sm:w-48"
                >
                  <TeamIcon className="w-12 h-12" />
                  <span>Buscar Empleo</span>
                </button>
                <button
                  onClick={onShowRecruiter}
                  className="bg-gray-700 hover:bg-gray-600 border border-gray-600 text-white px-12 py-6 rounded-lg font-medium transition-all flex items-center justify-center space-x-2 w-full sm:w-48"
                >
                  <BriefcaseIcon className="w-12 h-12" />
                  <span>Acceso Empresas</span>
                </button>
              </div>

              {/* New section for Sobre Nosotros and Ayuda in divided boxes */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start mb-12">
              <button
                onClick={() => setShowAbout(true)}
                className="cursor-pointer bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-lg p-3 flex flex-col items-center justify-center w-full sm:w-48 focus:outline-none focus:ring-2 focus:ring-blue-400"
                aria-label="Mostrar información Sobre Nosotros"
              >
                <svg className="w-5 h-5 mb-1 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-blue-400 font-semibold text-sm">Sobre Nosotros</span>
              </button>
              <button
                onClick={() => setShowHelp(true)}
                className="cursor-pointer bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-lg p-3 flex flex-col items-center justify-center w-full sm:w-48 focus:outline-none focus:ring-2 focus:ring-blue-400"
                aria-label="Mostrar información de Ayuda"
              >
                <svg className="w-5 h-5 mb-1 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-blue-400 font-semibold text-sm">Ayuda</span>
              </button>
              </div>
            </div>
            <div className="hidden lg:flex flex-col items-start justify-center">
              <img src={vistarecursos} alt="Vista Recursos" loading="lazy" className="w-104 h-auto -mt-6 border border-gray-400 border-opacity-50 rounded" />
            </div>
          </div>
        </div>

        {/* Footer section */}
        <footer className="bg-gray-900 text-gray-400 py-6 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div>
              <h4 className="text-white font-semibold mb-2">Contacto</h4>
              <p>Email: contactojegale@gmail.com</p>
              <p>Teléfono: +52 789 121 4019</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" aria-label="Facebook" className="hover:text-white">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54v-2.89h2.54V9.845c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.772-1.63 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-white">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14.86 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                </svg>
              </a>
              <a href="#" aria-label="Instagram" className="hover:text-white">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 3a1 1 0 110 2 1 1 0 010-2zm-5 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z" />
                </svg>
              </a>
            </div>
            <div className="text-sm text-gray-500">
              © 2025 JEGALE. Todos los derechos reservados.
            </div>
          </div>
        </footer>
      </div>

      {showAbout && <AboutModal onClose={() => setShowAbout(false)} />}
      {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}
    </>
  );
};
export default HomeHero;
