import React from 'react';
import BuildingIcon from '../Icons/BuildingIcon';

const Navbar = ({ user, onLogout, onBack }) => {
  return (
    <nav className="bg-gray-900 shadow-xl rounded-b-lg" role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center space-x-4">
            <div className="bg-brandBlue p-3 rounded-lg shadow-md transition-transform transform hover:scale-105">
              <img src="/logo.png" width="40" height="30" alt="JEGALE" />
            </div>
            <h1 className="text-3xl font-extrabold text-white select-none">
              <span className="text-brandBlue-light">JEGALE</span> RRHH
            </h1>
          </div>
          <div className="flex items-center space-x-8">
            {onBack && (
              <button
                onClick={onBack}
                className="flex items-center text-gray-300 hover:text-white space-x-2 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-brandBlue-light rounded"
                aria-label="Volver"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="text-lg font-medium">Volver</span>
              </button>
            )}
            {user && (
              <div className="flex items-center space-x-6">
                <span className="text-gray-300 text-lg" aria-live="polite">Bienvenido, {user.fullName}</span>
                <button
                  onClick={onLogout}
                  className="text-gray-300 hover:text-white transition-colors duration-300 ease-in-out flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-brandBlue-light rounded"
                  aria-label="Cerrar sesión"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span className="text-lg font-medium">Cerrar sesión</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
