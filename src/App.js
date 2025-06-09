import React, { useReducer } from 'react';
import LoginForm from './components/Auth/LoginForm';
import ForgotPasswordForm from './components/Auth/ForgotPasswordForm';
import RecruiterDashboard from './components/Recruiter/RecruiterDashboard';
import CandidateDashboard from './components/Candidate/CandidateDashboard';
import Navbar from './components/Layout/Navbar';
import HomeHero from './components/Layout/HomeHero';

const initialState = {
  user: null,
  showCandidate: false,
  showRecruiter: false,
  showForgotPassword: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
        showRecruiter: action.payload.role === 'recruiter',
        showCandidate: false,
        showForgotPassword: false,
      };
    case 'LOGOUT':
      return {
        ...initialState,
      };
    case 'SHOW_CANDIDATE':
      return {
        ...state,
        showCandidate: true,
        showRecruiter: false,
        showForgotPassword: false,
      };
    case 'SHOW_RECRUITER':
      return {
        ...state,
        showRecruiter: true,
        showCandidate: false,
        showForgotPassword: false,
      };
    case 'BACK_TO_HOME':
      return {
        ...state,
        showCandidate: false,
        showRecruiter: false,
        showForgotPassword: false,
      };
    case 'SHOW_FORGOT_PASSWORD':
      return {
        ...state,
        showForgotPassword: true,
        showRecruiter: false,
      };
    case 'BACK_TO_LOGIN':
      return {
        ...state,
        showForgotPassword: false,
        showRecruiter: true,
      };
    default:
      return state;
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleLogin = (userData) => {
    dispatch({ type: 'LOGIN', payload: userData });
  };

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const handleShowCandidate = () => {
    dispatch({ type: 'SHOW_CANDIDATE' });
  };

  const handleShowRecruiter = () => {
    dispatch({ type: 'SHOW_RECRUITER' });
  };

  const handleBackToHome = () => {
    dispatch({ type: 'BACK_TO_HOME' });
  };

  const handleShowForgotPassword = () => {
    dispatch({ type: 'SHOW_FORGOT_PASSWORD' });
  };

  const handleBackToLogin = () => {
    dispatch({ type: 'BACK_TO_LOGIN' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        user={state.user} 
        onLogout={handleLogout} 
        onBack={(state.showCandidate || state.showRecruiter || state.showForgotPassword) && !state.user ? handleBackToHome : null}
      />
      
      {!state.user && !state.showCandidate && !state.showRecruiter && !state.showForgotPassword ? (
        <HomeHero 
          onShowCandidate={handleShowCandidate} 
          onShowRecruiter={handleShowRecruiter} 
        />
      ) : null}

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {!state.user && state.showRecruiter && !state.showForgotPassword ? (
          <LoginForm 
            onLogin={handleLogin} 
            onForgotPassword={handleShowForgotPassword}
          />
        ) : null}

        {!state.user && state.showForgotPassword ? (
          <ForgotPasswordForm onBackToLogin={handleBackToLogin} />
        ) : null}

        {state.user && state.user.role === 'recruiter' ? (
          <RecruiterDashboard />
        ) : null}

        {state.showCandidate ? (
          <CandidateDashboard onBack={handleBackToHome} />
        ) : null}
      </main>
    </div>
  );
};

export default App;

// Credenciales para iniciar sesión:
// Usuario: admin / Contraseña: admin123
// Usuario: reclutador1 / Contraseña: r123456
// Usuario: reclutador2 / Contraseña: r654321

// DONE