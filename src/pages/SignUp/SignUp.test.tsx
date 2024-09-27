import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import SignUp from './SignUp';
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from 'react-router-dom';

const mockUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUsedNavigate,
}));

describe('SignUp component', () => {

  it('renders SignUp component correctly', () => {
    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    )
    const headerElement = screen.getByTestId('signup-header');
    expect(headerElement).toBeInTheDocument();
  });

  it('disables SignUp button initially', () => {
    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    )
    const submitButton = screen.getByTestId('submit') as HTMLButtonElement;
    expect(submitButton).toBeDisabled();
  });

  it('validates userName input', () => {
    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    )


    const usernameInput = screen.getByTestId('userName');

    // Valid input
    fireEvent.change(usernameInput, { target: { value: 'test123' } });
    expect(usernameInput).toHaveValue('test123');

    // Invalid input
    fireEvent.change(usernameInput, { target: { value: 'test' } });
    fireEvent.blur(usernameInput);
    const usernameError = screen.getByTestId('userName-error');
    expect(usernameError).toHaveTextContent('userName must be alphanumeric and 5-10 characters');
  });

  it('validates userEmail input', () => {
    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    )
    const emailInput = screen.getByTestId('userEmail');

    // Valid email
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput).toHaveValue('test@example.com');

    // Invalid email
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.blur(emailInput);
    const emailError = screen.getByTestId('email-error');
    expect(emailError).toHaveTextContent('Invalid email format');
  });

  it('validates password input', () => {
    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    )
    const passwordInput = screen.getByTestId('password');

    // Valid password
    fireEvent.change(passwordInput, { target: { value: 'pass1234' } });
    expect(passwordInput).toHaveValue('pass1234');

    // Invalid password
    fireEvent.change(passwordInput, { target: { value: 'short' } });
    fireEvent.blur(passwordInput);
    const passwordError = screen.getByTestId('password-error');
    expect(passwordError).toHaveTextContent('Password must be alphanumeric and should contain atleast one special character 8-10 characters');
  });

  it('validates confirmPassword input', () => {
    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    )
    const passwordInput = screen.getByTestId('password');
    const confirmPasswordInput = screen.getByTestId('confirmPassword');

    // Matching passwords
    fireEvent.change(passwordInput, { target: { value: 'pass1234' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'pass1234' } });
    expect(confirmPasswordInput).toHaveValue('pass1234');

    // Non-matching passwords
    fireEvent.change(confirmPasswordInput, { target: { value: 'different' } });
    fireEvent.blur(confirmPasswordInput);
    const confirmPasswordError = screen.getByTestId('confirmPassword-error');
    expect(confirmPasswordError).toHaveTextContent('Passwords do not match');
  });
  it('encrypts the password and constructs secureData correctly', async () => {
    const consoleSpy = jest.spyOn(console, 'log');
    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    );

    // Fill the form with valid data
    fireEvent.change(screen.getByTestId('userName'), { target: { value: 'testUser' } });
    fireEvent.change(screen.getByTestId('userEmail'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByTestId('password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByTestId('confirmPassword'), { target: { value: 'password123' } });

    // Submit the form
    const form = screen.getByTestId('submit'); // This should target the submit button correctly
    fireEvent.submit(form);

    // Wait for and assert the expected console log
    await waitFor(() => {
      // Check that the console log was called with a string that starts with "Encrypted Password: "
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Encrypted Password: '));
      // Ensure that the encrypted password is not the plaintext password
      expect(consoleSpy).not.toHaveBeenCalledWith(expect.stringContaining('Password@1'));
    });

    consoleSpy.mockRestore();
  });

})
