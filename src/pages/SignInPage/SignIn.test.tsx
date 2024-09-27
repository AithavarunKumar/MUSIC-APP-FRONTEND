import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import SignIn from './SignIn';
import { useNavigate } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

const renderSignIn = () => render(
    <Router>
        <SignIn onLogin={jest.fn()} />
    </Router>
);

describe('SignIn Component', () => {
    test('renders sign-in form elements', () => {
        renderSignIn();
        expect(screen.getByTestId('signup-header')).toBeInTheDocument();
        expect(screen.getByTestId('username')).toBeInTheDocument();
        expect(screen.getByTestId('password')).toBeInTheDocument();
        expect(screen.getByTestId('submit')).toBeInTheDocument();
        expect(screen.getByText('Forget Password?')).toBeInTheDocument();
    });

    test('updates input fields on user input', async () => {
        renderSignIn();
        const usernameInput = screen.getByTestId('username');
        const passwordInput = screen.getByTestId('password');
        await userEvent.type(usernameInput, 'testUser');
        await userEvent.type(passwordInput, 'Password!23');
        expect(usernameInput).toHaveValue('testUser');
        expect(passwordInput).toHaveValue('Password!23');
    });

    test('validates username and password fields', async () => {
        renderSignIn();
        const usernameInput = screen.getByTestId('username');
        const passwordInput = screen.getByTestId('password');
        const submitButton = screen.getByTestId('submit');
        await userEvent.type(usernameInput, 'usr'); // Invalid username
        await userEvent.type(passwordInput, 'pass'); // Invalid password
        fireEvent.blur(usernameInput);
        fireEvent.blur(passwordInput);
        expect(screen.getByTestId('username-error')).toBeInTheDocument();
        expect(screen.getByTestId('password-error')).toBeInTheDocument();
        expect(submitButton).toBeDisabled();
    });

    test('enables submit button when form is valid', async () => {
        renderSignIn();
        const usernameInput = screen.getByTestId('username');
        const passwordInput = screen.getByTestId('password');
        const submitButton = screen.getByTestId('submit');
        await userEvent.type(usernameInput, 'validUser');
        await userEvent.type(passwordInput, 'ValidPass!23');
        fireEvent.blur(usernameInput);
        fireEvent.blur(passwordInput);
        await waitFor(() => {
            expect(screen.queryByTestId('username-error')).not.toBeInTheDocument();
            expect(screen.queryByTestId('password-error')).not.toBeInTheDocument();
            expect(submitButton).not.toBeDisabled();
        });
    });

    test('handles form submission and navigates on success', async () => {
        const mockNavigate = jest.fn();
        (useNavigate as jest.Mock).mockImplementation(() => mockNavigate);

        renderSignIn();
        const usernameInput = screen.getByTestId('username');
        const passwordInput = screen.getByTestId('password');
        const submitButton = screen.getByTestId('submit');
        await userEvent.type(usernameInput, 'validUser');
        await userEvent.type(passwordInput, 'ValidPass!23');
        fireEvent.blur(usernameInput);
        fireEvent.blur(passwordInput);

        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({
                    email: 'test@example.com',
                    token: 'token123',
                    username: 'validUser'
                })
            })
        ) as jest.Mock;

        await userEvent.click(submitButton);

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/allsongs');
        });
    });

    test('displays sign-in error on failure', async () => {
        renderSignIn();
        const usernameInput = screen.getByTestId('username');
        const passwordInput = screen.getByTestId('password');
        const submitButton = screen.getByTestId('submit');
        await userEvent.type(usernameInput, 'validUser');
        await userEvent.type(passwordInput, 'ValidPass!23');
        fireEvent.blur(usernameInput);
        fireEvent.blur(passwordInput);

        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: false,
                status: 400,
                json: () => Promise.resolve({ error: 'Sign in failed' })
            })
        ) as jest.Mock;

        await userEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByTestId('signIn-error')).toBeInTheDocument();
            expect(screen.getByText('Sign in failed')).toBeInTheDocument();
        });
    });
});
