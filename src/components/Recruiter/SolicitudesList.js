import React, { useState } from 'react';
import EmailNotificationModal from './EmailNotificationModal';

const SolicitudesList = ({ candidates, setCandidates }) => {
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [emailType, setEmailType] = useState('accept'); // 'accept' or 'reject'

  // Sort candidates by applicationDate descending (newest first)
  const sortedCandidates = [...candidates].sort((a, b) => new Date(b.applicationDate) - new Date(a.applicationDate));

  const handleViewCV = (cvFile) => {
    if (!cvFile) {
      alert('No CV available');
      return;
    }
    if (typeof cvFile === 'string') {
      // Check if string is a data URI
      if (cvFile.startsWith('data:')) {
        window.open(cvFile, '_blank');
      } else {
        // Clean base64 string
        const base64String = cvFile.replace(/\s/g, '');
        try {
          const byteCharacters = atob(base64String);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], { type: 'application/pdf' });
          const url = URL.createObjectURL(blob);
          window.open(url, '_blank');
        } catch (error) {
          alert('Error al procesar el archivo CV.');
          console.error('Error decoding base64 CV:', error);
        }
      }
    } else {
      // cvFile is a Blob or File
      const url = URL.createObjectURL(cvFile);
      window.open(url, '_blank');
    }
  };

  const handleDelete = (email) => {
    if (window.confirm('¿Está seguro de que desea eliminar esta solicitud?')) {
      setCandidates(prev => prev.filter(candidate => candidate.email !== email));
    }
  };

  const handleAcceptClick = (candidate) => {
    if (window.confirm('¿Está seguro de que desea aceptar esta solicitud?')) {
      setSelectedCandidate(candidate);
      setEmailType('accept');
      setShowEmailModal(true);
    }
  };

  const handleRejectClick = (candidate) => {
    if (window.confirm('¿Está seguro de que desea rechazar esta solicitud?')) {
      setSelectedCandidate(candidate);
      setEmailType('reject');
      setShowEmailModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowEmailModal(false);
    setSelectedCandidate(null);
  };

  const handleSendEmail = ({ subject, message, type }) => {
    // Update candidate status in UI (optional)
    setCandidates(prev =>
      prev.map(c =>
        c.email === selectedCandidate.email ? { ...c, status: type === 'accept' ? 'Aceptado' : 'Rechazado' } : c
      )
    );
    alert(`Correo enviado a ${selectedCandidate.email} con asunto: "${subject}"`);
    // Close modal after sending
    handleCloseModal();
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Solicitudes de Candidatos</h2>
      {sortedCandidates.length === 0 ? (
        <p className="text-gray-600">No hay solicitudes de candidatos aún.</p>
      ) : (
        <div className="space-y-6">
          {sortedCandidates.map((candidate, index) => (
            <div key={index} className="border rounded-lg p-6 shadow-lg bg-gradient-to-r from-blue-50 to-white">
              <p><strong>Nombre:</strong> {candidate.firstName} {candidate.lastName}</p>
              <p><strong>Email:</strong> {candidate.email}</p>
              <p><strong>Teléfono:</strong> {candidate.phone}</p>
              <p><strong>Dirección:</strong> {candidate.address}</p>
              <p><strong>Fecha de Aplicación:</strong> {new Date(candidate.applicationDate).toLocaleString()}</p>
              <p><strong>Estado:</strong> {candidate.status || 'Pendiente'}</p>
              <div className="mt-4 flex space-x-3">
                <button
                  onClick={() => handleAcceptClick(candidate)}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                >
                  Aceptado
                </button>
                <button
                  onClick={() => handleRejectClick(candidate)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                >
                  Rechazado
                </button>
                <button
                  onClick={() => handleDelete(candidate.email)}
                  className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition-colors"
                >
                  Eliminar Solicitud
                </button>
                <button
                  onClick={() => handleViewCV(candidate.cv)}
                  className="ml-auto bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors"
                >
                  Ver CV (PDF)
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {showEmailModal && selectedCandidate && (
        <EmailNotificationModal
          candidate={selectedCandidate}
          onClose={handleCloseModal}
          onSend={handleSendEmail}
          type={emailType}
        />
      )}
    </div>
  );
};

export default SolicitudesList;
