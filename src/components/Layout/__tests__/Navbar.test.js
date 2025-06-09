import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../Navbar';

describe('Navbar component', () => {
  const mockUser = { fullName: 'Test User' };
  const mockLogout = jest.fn();
  const mockBack = jest.fn();

  test('renders logo and title', () => {
    render(<Navbar user={null} onLogout={mockLogout} onBack={null} />);
    expect(screen.getByAltText('JEGALE')).toBeInTheDocument();
    expect(screen.getByText(/JEGALE RRHH/i)).toBeInTheDocument();
  });

  test('renders back button when onBack prop is provided', () => {
    render(<Navbar user={null} onLogout={mockLogout} onBack={mockBack} />);
    const backButton = screen.getByRole('button', { name: /volver/i });
    expect(backButton).toBeInTheDocument();
    fireEvent.click(backButton);
    expect(mockBack).toHaveBeenCalled();
  });

  test('renders user greeting and logout button when user is provided', () => {
    render(<Navbar user={mockUser} onLogout={mockLogout} onBack={null} />);
    expect(screen.getByText(/bienvenido, test user/i)).toBeInTheDocument();
    const logoutButton = screen.getByRole('button', { name: /cerrar sesión/i });
    expect(logoutButton).toBeInTheDocument();
    fireEvent.click(logoutButton);
    expect(mockLogout).toHaveBeenCalled();
  });
});
