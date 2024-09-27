import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import './SignIn.css';
import { Link, useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';

interface FormData {
    username: string;
    password: string;
}

interface FormErrors {
    userNameError: string;
    passwordError: string;
}

interface SignInProps {
    onLogin: (status: boolean) => void;
}

const SignIn: React.FC<SignInProps> = ({ onLogin }) => {
    const navigate = useNavigate();
    const [signInError, setSignInError] = useState('');
    const [formData, setFormData] = useState<FormData>({
        username: '',
        password: '',
    });
    const [formErrors, setFormErrors] = useState<FormErrors>({
        userNameError: '',
        passwordError: '',
    });
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name } = e.target;
        setFormErrors({
            ...formErrors,
            [`${name}Error` as keyof FormErrors]: ''
        });
    };

    const validateUsername = (username: string): boolean => /^[A-Za-z0-9_-]{5,10}$/.test(username);
    const validatePassword = (password: string): boolean => /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,10}$/.test(password);

    const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let errorMessage = '';

        switch (name) {
            case 'username':
                if (value.trim() === '') {
                    errorMessage = 'Username is required';
                } else if (!validateUsername(value)) {
                    errorMessage = 'Invalid username format';
                }
                break;
            case 'password':
                if (value.trim() === '') {
                    errorMessage = 'Password is required';
                } else if (!validatePassword(value)) {
                    errorMessage = 'Password must be alphanumeric and 8-10 characters';
                }
                break;
            default:
                break;
        }

        setFormErrors({
            ...formErrors,
            [`${name}Error` as keyof FormErrors]: errorMessage
        });

        validateForm();
    };

    const validateForm = () => {
        const { username, password } = formData;
        const isUsernameValid = validateUsername(username);
        const isPasswordValid = validatePassword(password);
        setIsButtonDisabled(!(isUsernameValid && isPasswordValid));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const secretKey = "secret key 12356";
        const plainTextPassword = formData.password;

        const encryptPassword = (password: string, key: string): string => {
            const keyUtf8 = CryptoJS.enc.Utf8.parse(key);
            const encrypted = CryptoJS.AES.encrypt(password, keyUtf8, {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
            });
            return encrypted.toString();
        };

        const ciphertext = encryptPassword(plainTextPassword, secretKey);

        const secureData = {
            ...formData,
            password: ciphertext,
        };

        try {
            const response = await fetch('http://localhost:8081/user-management/users/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(secureData),
            });

            if (response.ok) {
                const userData = await response.json();
                const { email, token, username } = userData;

                localStorage.setItem('email', email);
                localStorage.setItem('username', username);
                localStorage.setItem('token', token);

                if (token) {
                    alert('Successfully signed in!');
                    onLogin(true);
                    navigate('/allsongs');
                } else {
                    alert('Verification status is not successful.');
                }

                setFormData({
                    username: '',
                    password: '',
                });

                setFormErrors({
                    userNameError: '',
                    passwordError: '',
                });
            } else if (response.status === 400) {
                const errorData = await response.json();
                setSignInError('Sign in failed');
            } else {
                throw new Error('Failed to sign in');
            }
        } catch (error) {
            console.error('Error signing in:', error);
            setSignInError('Sign in failed. Please try again later.');
        }
    };

    useEffect(() => {
        validateForm();
    }, [formData]);

    return (
        <div className='signIn-container'>
            <div className='signinDiv'>
                <form onSubmit={handleSubmit}>
                    <fieldset>
                        <h1 data-testid="signup-header">Sign In</h1>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <div className="input-container">
                                            <input
                                                className='input'
                                                id="username"
                                                data-testid="username"
                                                type="text"
                                                name="username"
                                                value={formData.username}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                onFocus={handleFocus}
                                                placeholder=" "
                                            />
                                            <label className='label' htmlFor="username">Username</label>
                                            {formErrors.userNameError && <p className="errorSignup" data-testid="username-error">{formErrors.userNameError}</p>}
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="input-container">
                                            <input
                                                className='input'
                                                id="password"
                                                data-testid="password"
                                                type="password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                onFocus={handleFocus}
                                                placeholder=" "
                                            />
                                            <label className='label' htmlFor="password">Password</label>
                                            {formErrors.passwordError && <p className="errorSignup" data-testid="password-error">{formErrors.passwordError}</p>}
                                        </div>
                                        <h5>
                                            <Link to="/ForgetPassword">Forget Password?</Link>
                                        </h5>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <button
                            type="submit"
                            data-testid="submit"
                            disabled={isButtonDisabled}
                        >
                            Sign In
                        </button>
                    </fieldset>
                </form>
                {signInError && <p className="SignInDetailsError" data-testid="signIn-error">{signInError}</p>}
            </div>
        </div>
    );
};

export default SignIn;
