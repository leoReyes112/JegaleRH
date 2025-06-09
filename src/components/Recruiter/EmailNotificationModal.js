
import React, { useState, useEffect } from 'react';

const EmailNotificationModal = ({ candidate, onClose, onSend, type }) => {
  // type: 'accept' or 'reject'
  const defaultSubjects = {
    accept: 'Notificación de aceptación para la siguiente prueba',
    reject: 'Notificación de rechazo para la siguiente prueba',
  };

  const defaultMessages = {
    accept: `Hola ${candidate.firstName},

Nos complace informarte que has sido aceptado para la siguiente prueba del proceso de selección. Por favor, revisa los detalles y prepárate para la siguiente etapa.

Saludos cordiales,
Equipo de Reclutamiento`,
    reject: `Hola ${candidate.firstName},

Lamentamos informarte que no has sido seleccionado para continuar en el proceso de selección. Agradecemos tu interés y te deseamos éxito en tus futuros proyectos.

Saludos cordiales,
Equipo de Reclutamiento`,
  };

  const [subject, setSubject] = useState(defaultSubjects[type] || '');
  const [message, setMessage] = useState(defaultMessages[type] || '');

  useEffect(() => {
    setSubject(defaultSubjects[type] || '');
    setMessage(defaultMessages[type] || '');
  }, [type, candidate.firstName]);

  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);

  const handleSend = async () => {
    setSending(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:4000/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          to: candidate.email,
          subject,
          text: message
        })
      });
      if (!response.ok) {
        throw new Error('Error sending email');
      }
      alert('Correo enviado exitosamente');
      onSend({ subject, message, type });
    } catch (err) {
      setError('Error al enviar el correo. Intente nuevamente.');
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg">
        <h3 className="text-xl font-semibold mb-4">
          {type === 'accept' ? 'Enviar correo de aceptación a' : 'Enviar correo de rechazo a'} {candidate.firstName} {candidate.lastName}
        </h3>
        <div className="mb-4">
          <label className="block font-medium mb-1">Asunto</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full border rounded px-3 py-2"
            disabled={sending}
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Mensaje</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={6}
            className="w-full border rounded px-3 py-2"
            disabled={sending}
          />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
            disabled={sending}
          >
            Cancelar
          </button>
          <button
            onClick={handleSend}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            disabled={sending}
          >
            {sending ? 'Enviando...' : 'Enviar'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailNotificationModal;
