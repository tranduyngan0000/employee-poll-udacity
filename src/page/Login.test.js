import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import Login from './Login';
import { renderWithProviders } from '../common/test-cmn';

describe('Login Component', () => {
  it('should have username field, password field, and login button', () => {
    renderWithProviders(<Login />);

    expect(screen.getByTestId('username')).toBeInTheDocument();
    expect(screen.getByTestId('password')).toBeInTheDocument();
    expect(screen.getByTestId('button-submit')).toBeInTheDocument();
  });

  it('should show an error message when username is not provided', async () => {
    renderWithProviders(<Login />);
    fireEvent.change(screen.getByTestId('password'), {
      target: { value: 'exmaple' }
    });
    fireEvent.click(screen.getByTestId('button-submit'));

    await waitFor(async () => {
      const error = screen.getByTestId('error');
      expect(error.textContent).toBe(`Username or password can't empty`);
    });
  });

  it('should show an error message when password is not provided', async () => {
    renderWithProviders(<Login />);
    fireEvent.change(screen.getByTestId('username'), {
      target: { value: 'exmaple' }
    });
    fireEvent.click(screen.getByTestId('button-submit'));

    await waitFor(async () => {
      const error = screen.getByTestId('error');
      expect(error.textContent).toBe(`Username or password can't empty`);
    });
  });

  it('should show an error message when incorrect username or password is provided', async () => {
    const users = {
      tylermcginnis: {
        id: 'tylermcginnis',
        password: '$2a$10$fvwdpy3H7pUPIAM/exCyWO/E8ST.Xa1I8LcLREvr4UJ/bsunEB3vO'
      }
    };
    renderWithProviders(<Login />, { preloadedState: { users: { users } } });
    fireEvent.change(screen.getByTestId('username'), {
      target: { value: 'wronguser' }
    });
    fireEvent.change(screen.getByTestId('password'), {
      target: { value: 'wrongpassword' }
    });

    fireEvent.click(screen.getByTestId('button-submit'));

    await waitFor(async () => {
      const error = screen.getByTestId('error');
      expect(error.textContent).toBe('Invalid user name or password');
    });
  });

  it('should handle username and password field changes', () => {
    renderWithProviders(<Login />);

    const usernameInput = screen.getByTestId('username');
    const passwordInput = screen.getByTestId('password');

    fireEvent.change(usernameInput, { target: { value: 'user' } });
    fireEvent.change(passwordInput, { target: { value: 'pass' } });

    expect(usernameInput.value).toBe('user');
    expect(passwordInput.value).toBe('pass');
  });
});
