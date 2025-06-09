import React, { useState } from 'react';
import DB from '../../mock/database';

const ForgotPasswordForm = ({ onBackToLogin }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const recruiter = DB.findRecruiterByEmail(email);
    
    if (recruiter) {
      try {
        const response = await fetch('http://localhost:4000/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            to: 'leonardoreyesbautista01@gmail.com',
            subject: 'Solicitud de recuperación de contraseña',
            text: `El reclutador con correo ${email} ha solicitado recuperación de contraseña. Por favor, atiendan esta solicitud.`,
          }),
        });
        if (response.ok) {
          setMessage(`Se ha enviado la solicitud de recuperación al equipo de Jegale.`);
          setError('');
        } else {
          setError('Error al enviar la solicitud de recuperación. Intente nuevamente.');
          setMessage('');
        }
      } catch (error) {
        setError('Error de red al enviar la solicitud de recuperación.');
        setMessage('');
      }
    } else {
      setError('No existe un reclutador con ese correo electrónico');
      setMessage('');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Recuperar Contraseña</h2>
      {error && (
        <p
          className="text-red-500 mb-4"
          role="alert"
          aria-live="assertive"
        >
          {error}
        </p>
      )}
      {message && (
        <p
          className="text-green-500 mb-4"
          role="status"
          aria-live="polite"
        >
          {message}
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="email">Correo Electrónico</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors mb-4"
        >
          Enviar Contraseña
        </button>
        <div className="text-center">
          <button
            type="button"
            onClick={onBackToLogin}
            className="text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Volver a Iniciar Sesión"
          >
            Volver a Iniciar Sesión
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;