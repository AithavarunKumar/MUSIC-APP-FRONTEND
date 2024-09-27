import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import './SignUp.css';
import { Link, useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';

interface FormData {
    userName: string;
    userEmail: string;
    password: string;
    confirmPassword: string;
}

interface FormErrors {
    userNameError: string;
    userEmailError: string;
    passwordError: string;
    confirmPasswordError: string;
}

const SignUp: React.FC = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const [formData, setFormData] = useState<FormData>({
        userName: '',
        userEmail: '',
        password: '',
        confirmPassword: ''
    });

    const [formErrors, setFormErrors] = useState<FormErrors>({
        userNameError: '',
        userEmailError: '',
        passwordError: '',
        confirmPasswordError: ''
    });

    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        handleBlur(e);  // Optionally call handleBlur here if needed
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name } = e.target;
        setFormErrors({
            ...formErrors,
            [`${name}Error` as keyof FormErrors]: ''
        });
    };

    const validateUsername = (userName: string): boolean => /^[A-Za-z0-9_-]{5,10}$/.test(userName);

    const validateEmail = (userEmail: string): boolean => /(\b[a-zA-Z0-9._%+-]+@(gmail|epam)\.com\b)/gi.test(userEmail);

    const validatePassword = (password: string): boolean => /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,10}$/.test(password);

    const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let errorMessage = '';

        switch (name) {
            case 'userEmail':
                if (value.trim() === '') {
                    errorMessage = 'Email is required';
                } else if (!validateEmail(value)) {
                    errorMessage = 'Invalid email format';
                }
                break;
            case 'password':
                if (value.trim() === '') {
                    errorMessage = 'Password is required';
                } else if (!validatePassword(value)) {
                    errorMessage = 'Password must be alphanumeric and should contain at least one special character, 8-10 characters';
                }
                break;
            case 'confirmPassword':
                if (value.trim() === '') {
                    errorMessage = 'Confirm Password is required';
                } else if (value !== formData.password) {
                    errorMessage = 'Passwords do not match';
                }
                break;
            case 'userName':
                if (value.trim() === '') {
                    errorMessage = 'Username is required';
                } else if (!validateUsername(value)) {
                    errorMessage = 'Username must be alphanumeric and 5-10 characters';
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
        const { userName, userEmail, password, confirmPassword } = formData;
        const isUsernameValid = validateUsername(userName);
        const isEmailValid = validateEmail(userEmail);
        const isPasswordValid = validatePassword(password);

        setIsButtonDisabled(!(isUsernameValid && isEmailValid && isPasswordValid && password === confirmPassword && userName && userEmail && password && confirmPassword));
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
        console.log("Encrypted Password: " + ciphertext);

        const { confirmPassword, ...rest } = formData;

        const secureData = {
            ...rest,
            password: ciphertext,
        };

        try {
            const response = await fetch('http://localhost:8081/user-management/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(secureData),
            });

            if (response.ok) {
                alert('Successfully signed up!');
                navigate('/email');
            } else if (response.status === 400) {
                const errorData = await response.json();
                setErrorMessage(errorData.message);
            } else {
                throw new Error('Failed to sign up');
            }

            setFormData({
                userName: '',
                userEmail: '',
                password: '',
                confirmPassword: ''
            });

            setFormErrors({
                userNameError: '',
                userEmailError: '',
                passwordError: '',
                confirmPasswordError: ''
            });

        } catch (error) {
            console.error('Error signing up:', error);
        }
    };

    useEffect(() => {
        validateForm();
    }, [formData]);

    return (
        <div className='signUp-container'>
            <div className='signupDiv'>
                <form onSubmit={handleSubmit}>
                    <fieldset>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                        <h1 data-testid="signup-header">SignUp</h1>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <div className="input-container">
                                            <input
                                                className='input'
                                                id="userName"
                                                data-testid="userName"
                                                type="text"
                                                name="userName"
                                                value={formData.userName}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                onFocus={handleFocus}
                                                placeholder=" "
                                            />
                                            <label className='label' htmlFor="userName">Username</label>
                                            {formErrors.userNameError && <p className="errorSignup" data-testid="userName-error">{formErrors.userNameError}</p>}
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="input-container">
                                            <input
                                                className='input'
                                                id="userEmail"
                                                data-testid="userEmail"
                                                type="text"
                                                name="userEmail"
                                                value={formData.userEmail}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                onFocus={handleFocus}
                                                placeholder=" "
                                            />
                                            <label className='label' htmlFor="userEmail">Email</label>
                                            {formErrors.userEmailError && <p className="errorSignup" data-testid="userEmail-error">{formErrors.userEmailError}</p>}
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
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="input-container">
                                            <input
                                                className='input'
                                                id="confirmPassword"
                                                data-testid="confirmPassword"
                                                type="password"
                                                name="confirmPassword"
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                onFocus={handleFocus}
                                                placeholder=" "
                                            />
                                            <label className='label' htmlFor="confirmPassword">Confirm Password</label>
                                            {formErrors.confirmPasswordError && <p className="errorSignup" data-testid="confirmPassword-error">{formErrors.confirmPasswordError}</p>}
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <button
                            type="submit"
                            data-testid="submit"
                            disabled={isButtonDisabled}
                        >
                            SignUp
                        </button>
                    </fieldset>
                </form>
                <p id='alreadyHaveAccount'>Already have an account?
                    <Link to={'./signin'} id='SignUpLink'>Sign In</Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
