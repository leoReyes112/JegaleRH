import React, { useState, useMemo } from 'react';
import BriefcaseIcon from '../Icons/BriefcaseIcon';

const VacancyList = ({ vacancies = [], onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    department: '',
    status: '',
  });

  const filteredVacancies = useMemo(() => {
    return vacancies.filter(vacancy => {
      const matchesSearch = vacancy.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDepartment = filters.department ? vacancy.department === filters.department : true;
      const matchesStatus = filters.status ? vacancy.status === filters.status : true;
      return matchesSearch && matchesDepartment && matchesStatus;
    });
  }, [vacancies, searchTerm, filters]);

  // Extract unique departments and statuses for filter options
  const departments = useMemo(() => {
    const depts = new Set(vacancies.map(v => v.department));
    return Array.from(depts);
  }, [vacancies]);

  const statuses = useMemo(() => {
    const stats = new Set(vacancies.map(v => v.status));
    return Array.from(stats);
  }, [vacancies]);

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center space-x-4">
        <input
          type="text"
          placeholder="Buscar por título..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-64"
        />
        <select
          value={filters.department}
          onChange={e => setFilters(prev => ({ ...prev, department: e.target.value }))}
          className="border border-gray-300 rounded px-3 py-2"
        >
          <option value="">Todos los departamentos</option>
          {departments.map(dept => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>
        <select
          value={filters.status}
          onChange={e => setFilters(prev => ({ ...prev, status: e.target.value }))}
          className="border border-gray-300 rounded px-3 py-2"
        >
          <option value="">Todos los estados</option>
          {statuses.map(status => (
            <option key={status} value={status}>{status === 'active' ? 'Activa' : 'Inactiva'}</option>
          ))}
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center">
                  <BriefcaseIcon />
                  <span className="ml-2">Título</span>
                </div>
              </th>
              <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Departamento
              </th>
              <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Salario
              </th>
              <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredVacancies.length > 0 ? (
              filteredVacancies.map(vacancy => (
                <tr key={vacancy.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{vacancy.title}</div>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{vacancy.department}</div>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <div className="text-sm text-gray-900 font-medium">{vacancy.salary}</div>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${vacancy.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {vacancy.status === 'active' ? 'Activa' : 'Inactiva'}
                    </span>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => onEdit(vacancy)}
                        className="text-blue-600 hover:text-blue-900 flex items-center"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Editar
                      </button>
                      <button
                        onClick={() => onDelete(vacancy.id)}
                        className="text-red-600 hover:text-red-900 flex items-center"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-8 text-center text-gray-500">
                  <div className="flex flex-col items-center justify-center">
                    <BriefcaseIcon />
                    <p className="mt-2">No hay vacantes registradas</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export { VacancyList };
