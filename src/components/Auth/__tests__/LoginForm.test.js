import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from '../LoginForm';

describe('LoginForm component', () => {
  const mockLogin = jest.fn();
  const mockForgotPassword = jest.fn();

  beforeEach(() => {
    mockLogin.mockClear();
    mockForgotPassword.mockClear();
  });

  test('renders form inputs and buttons', () => {
    render(<LoginForm onLogin={mockLogin} onForgotPassword={mockForgotPassword} />);
    expect(screen.getByLabelText(/usuario/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /ingresar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /¿olvidaste tu contraseña\?/i })).toBeInTheDocument();
  });

  test('calls onLogin with correct data on submit', () => {
    render(<LoginForm onLogin={mockLogin} onForgotPassword={mockForgotPassword} />);
    fireEvent.change(screen.getByLabelText(/usuario/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/contraseña/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /ingresar/i }));
    expect(mockLogin).toHaveBeenCalledWith(expect.objectContaining({ username: 'testuser' }));
  });

  test('calls onForgotPassword when forgot password button is clicked', () => {
    render(<LoginForm onLogin={mockLogin} onForgotPassword={mockForgotPassword} />);
    fireEvent.click(screen.getByRole('button', { name: /¿olvidaste tu contraseña\?/i }));
    expect(mockForgotPassword).toHaveBeenCalled();
  });
});
