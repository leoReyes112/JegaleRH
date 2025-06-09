import { getVacancies, saveVacancies } from '../utils/storage';

const vacancies = getVacancies();

function addVacancy(vacancy) {
  vacancies.push(vacancy);
  saveVacancies(vacancies);
}

function updateVacancy(updatedVacancy) {
  const index = vacancies.findIndex(v => v.id === updatedVacancy.id);
  if (index !== -1) {
    vacancies[index] = updatedVacancy;
    saveVacancies(vacancies);
  }
}

export { vacancies, addVacancy, updateVacancy };
