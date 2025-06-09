/* `import React, { useState } from 'react';` is importing the `useState` hook from the React library.
The `useState` hook allows functional components to have state variables. By using `useState`, you
can add state to functional components without converting them to class components. */
import React, { useState } from 'react';
import { candidates, addCandidate } from '../../mock/users';

const ApplicationForm = ({ vacancyId, onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    cv: null,
    cartaDePresentacion: ''
  });

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'firstName':
      case 'lastName':
      case 'address':
        if (!value.trim()) error = 'Este campo es obligatorio';
        break;
      case 'email':
        if (!value.trim()) {
          error = 'Este campo es obligatorio';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Email inválido';
        }
        break;
      case 'phone':
        if (!value.trim()) {
          error = 'Este campo es obligatorio';
        } else if (!/^\+?\d{7,15}$/.test(value)) {
          error = 'Teléfono inválido';
        }
        break;
      case 'cv':
        if (!value) {
          error = 'Debe subir un archivo PDF';
        }
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Validate on change
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    let error = '';
    if (!file) {
      error = 'Debe subir un archivo PDF';
    } else if (file.type !== 'application/pdf') {
      error = 'Solo se permiten archivos PDF';
    } else if (file.size > 10 * 1024 * 1024) { // 10 MB limit
      error = 'El archivo no debe ser mayor a 10 Mb';
    }
    setErrors(prev => ({ ...prev, cv: error }));

    if (!error) {
      // Convert file to base64 string
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, cv: reader.result.split(',')[1] })); // store base64 string without prefix
      };
      reader.readAsDataURL(file);
    } else {
      e.target.value = null; // Reset file input
      setFormData(prev => ({ ...prev, cv: null }));
    }
  };

  const isFormValid = () => {
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid()) return;

    const newCandidate = {
      ...formData,
      vacancyId,
      applicationDate: new Date().toISOString()
    };
    addCandidate(newCandidate);
    onSubmit();
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Aplicar a Vacante</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 mb-1">Nombre</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 ${
                errors.firstName ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
              }`}
              required
            />
            {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Apellido</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 ${
                errors.lastName ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
              }`}
              required
            />
            {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 ${
              errors.email ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
            }`}
            required
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Teléfono</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 ${
              errors.phone ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
            }`}
            required
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Dirección</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 ${
              errors.address ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
            }`}
            required
          />
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Carta de presentación</label>
          <textarea
            name="cartaDePresentacion"
            value={formData.cartaDePresentacion}
            onChange={handleChange}
            rows={4}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Escriba una breve descripción sobre usted"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-1">CV (PDF)</label>
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 ${
              errors.cv ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
            }`}
            required
          />
          <p className="text-sm text-gray-500 mt-1">Suba su CV en pdf con la siguiente nomenclatura: CV_NombreCompleto</p>
          <p className="text-sm text-gray-500 mt-1">Archivo no mayor a 10 Mb</p>
          {errors.cv && <p className="text-red-500 text-sm mt-1">{errors.cv}</p>}
        </div>
        <button
          type="submit"
          disabled={Object.values(errors).some(error => error) || !formData.cv}
          className={`w-full py-2 px-4 rounded-lg transition-colors ${
            Object.values(errors).some(error => error) || !formData.cv
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          Enviar Aplicación
        </button>
      </form>
    </div>
  );
};

export default ApplicationForm;
