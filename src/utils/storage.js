const CANDIDATES_KEY = 'candidates_data';
const VACANCIES_KEY = 'vacancies_data';

export function getCandidates() {
  const data = localStorage.getItem(CANDIDATES_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveCandidates(candidates) {
  localStorage.setItem(CANDIDATES_KEY, JSON.stringify(candidates));
}

export function getVacancies() {
  const data = localStorage.getItem(VACANCIES_KEY);
  if (data) {
    return JSON.parse(data);
  }
  // Default vacancies if none in localStorage
  return [
    {
      id: 1,
      title: "Desarrollador Frontend",
      department: "Tecnología",
      description: "Buscamos experto en React con 3+ años de experiencia",
      status: "active",
      salary: "$60,000 - $80,000",
      createdAt: "2023-05-15"
    }
  ];
}

export function saveVacancies(vacancies) {
  localStorage.setItem(VACANCIES_KEY, JSON.stringify(vacancies));
}
