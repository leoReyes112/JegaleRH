import { getCandidates, saveCandidates } from '../utils/storage';

const users = [
  {
    id: 1,
    email: "reclutador@empresa.com",
    password: "admin123",
    role: "recruiter"
  }
];

const candidates = getCandidates();

import eventBus from '../utils/eventBus';

function addCandidate(candidate) {
  candidates.push(candidate);
  saveCandidates(candidates);
  eventBus.emit('candidateAdded', candidate);
}

export { users, candidates, addCandidate };
