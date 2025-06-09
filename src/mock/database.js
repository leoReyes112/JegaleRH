// Base de datos simulada
import { getCandidates, saveCandidates, getVacancies, saveVacancies } from '../utils/storage';
import applications from './applications';

const database = {
  recruiters: [
    {
      id: 1,
      username: "admin",
      password: "admin123",
      email: "leonardoreyesbautista01@gmail.com",
      fullName: "Administrador Principal"
    },
    {
      id: 2,
      username: "reclutador1",
      password: "r123456",
      email: "reclutador1@talentharbor.com",
      fullName: "Carlos Mendoza"
    },
    {
      id: 3,
      username: "reclutador2",
      password: "r654321",
      email: "reclutador2@talentharbor.com",
      fullName: "Laura Jiménez"
    }
  ],
  candidates: getCandidates(),
  vacancies: getVacancies(),
  applications: applications
};

// Simulación de operaciones de base de datos
const DB = {
  findRecruiterByUsername: (username) => {
    return database.recruiters.find(r => r.username === username);
  },
  findRecruiterByEmail: (email) => {
    return database.recruiters.find(r => r.email === email);
  },
  updateRecruiterPassword: (email, newPassword) => {
    const recruiter = database.recruiters.find(r => r.email === email);
    if (recruiter) {
      recruiter.password = newPassword;
      return true;
    }
    return false;
  },
  getActiveVacancies: () => {
    return database.vacancies.filter(v => v.status === 'active');
  },
  getAllVacancies: () => {
    return [...database.vacancies]; // Devuelve una copia del array
  },
  getAllApplications: () => {
    return [...database.applications]; // Devuelve una copia del array
  },
  createVacancy: (vacancy) => {
    const newVacancy = {
      ...vacancy,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      status: vacancy.status || 'active' // Asegurar que siempre tenga status
    };
    database.vacancies.push(newVacancy);
    saveVacancies(database.vacancies);
    return newVacancy;
  },
  updateVacancy: (id, updates) => {
    const index = database.vacancies.findIndex(v => v.id === id);
    if (index !== -1) {
      database.vacancies[index] = { 
        ...database.vacancies[index], 
        ...updates,
        status: updates.status || database.vacancies[index].status // Mantener status si no viene en updates
      };
      saveVacancies(database.vacancies);
      return database.vacancies[index];
    }
    return null;
  },
  deleteVacancy: (id) => {
    database.vacancies = database.vacancies.filter(v => v.id !== id);
    saveVacancies(database.vacancies);
    return true;
  },
  addCandidate: (candidate) => {
    database.candidates.push(candidate);
    saveCandidates(database.candidates);
  },
  getCandidates: () => {
    return [...database.candidates];
  }
};

export default DB;
