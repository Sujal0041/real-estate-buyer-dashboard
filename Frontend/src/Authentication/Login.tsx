// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Login = () => {
//     const navigate = useNavigate();

//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [showPassword, setShowPassword] = useState(false);
//     const [rememberMe, setRememberMe] = useState(false);

//     const [error, setError] = useState('');
//     const [loading, setLoading] = useState(false);

//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();

//         setError('');

//         if (!email.trim() || !password.trim()) {
//             setError('Email and password are required.');
//             return;
//         }

//         try {
//             setLoading(true);

//             const response = await axios.post('http://localhost:5000/api/auth/login', {
//                 email: email.trim(),
//                 password,
//             });

//             const { token, user } = response.data;

//             localStorage.setItem('token', token);
//             localStorage.setItem('user', JSON.stringify(user));
//             localStorage.setItem('isLoggedIn', 'true');

//             if (rememberMe) {
//                 localStorage.setItem('rememberedEmail', email.trim());
//             } else {
//                 localStorage.removeItem('rememberedEmail');
//             }

//             navigate('/dashboard', { replace: true });
//         } catch (err: any) {
//             setError(err?.response?.data?.message || 'Login failed.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-light p-0">
//             <div
//                 className="card shadow-lg p-3 border-0 animate-in"
//                 style={{ width: '420px', borderRadius: '16px' }}
//             >
//                 <div className="card-body">
//                     <div className="mb-4">
//                         <h1
//                             className="display-6 fw-semibold text-dark mb-2"
//                             style={{ letterSpacing: '0.1rem' }}
//                         >
//                             Login
//                         </h1>
//                         <p className="text-muted small mb-0">Hi, Welcome back</p>
//                     </div>

//                     <form onSubmit={handleSubmit}>
//                         {error ? (
//                             <div className="alert alert-danger py-2 small" role="alert">
//                                 {error}
//                             </div>
//                         ) : null}

//                         <div className="mb-3 text-start">
//                             <label className="form-label text-dark fw-medium small mb-1">
//                                 Email
//                             </label>
//                             <input
//                                 type="email"
//                                 className="form-control form-control-lg border border-2 text-dark"
//                                 placeholder="E.g. johndoe@email.com"
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 style={{ fontSize: '14px', padding: '12px 16px' }}
//                                 required
//                             />
//                         </div>

//                         <div className="mb-4 position-relative text-start">
//                             <label className="form-label text-dark fw-medium small mb-1">
//                                 Password
//                             </label>

//                             <input
//                                 type={showPassword ? 'text' : 'password'}
//                                 className="form-control form-control-lg border border-2 text-dark"
//                                 placeholder="Enter your password"
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 style={{
//                                     fontSize: '14px',
//                                     padding: '12px 16px',
//                                     paddingRight: '50px',
//                                 }}
//                                 required
//                             />

//                             <button
//                                 type="button"
//                                 className="btn position-absolute p-0 border-0 bg-transparent text-muted"
//                                 style={{
//                                     right: '15px',
//                                     top: '41px',
//                                     zIndex: 10,
//                                 }}
//                                 onClick={() => setShowPassword((prev) => !prev)}
//                                 aria-label={showPassword ? 'Hide password' : 'Show password'}
//                             >
//                                 <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
//                             </button>
//                         </div>

//                         <div className="d-flex justify-content-between align-items-center mb-4">
//                             <div className="form-check">
//                                 <input
//                                     className="form-check-input"
//                                     type="checkbox"
//                                     id="rememberMe"
//                                     checked={rememberMe}
//                                     onChange={(e) => setRememberMe(e.target.checked)}
//                                 />
//                                 <label
//                                     className="form-check-label text-muted small ms-1"
//                                     htmlFor="rememberMe"
//                                 >
//                                     Remember Me
//                                 </label>
//                             </div>

//                             <a
//                                 href="#"
//                                 className="text-primary small text-decoration-none fw-medium"
//                             >
//                                 Forgot Password?
//                             </a>
//                         </div>

//                         <button
//                             type="submit"
//                             className="btn btn-primary btn-lg w-100 fw-bold py-3 mb-4"
//                             style={{
//                                 backgroundColor: '#5D2EFA',
//                                 border: 'none',
//                                 borderRadius: '1px',
//                                 letterSpacing: '0.01rem',
//                             }}
//                             disabled={loading}
//                         >
//                             {loading ? 'Signing In...' : 'Login'}
//                         </button>
//                     </form>

//                     <p className="text-muted small mb-0">
//                         Not registered yet?{' '}
//                         <Link to="/register" className="text-primary text-decoration-none fw-medium">
//                             Create an account
//                         </Link>
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Login;

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const rememberedEmail = localStorage.getItem('rememberedEmail');
        if (rememberedEmail) {
            setEmail(rememberedEmail);
            setRememberMe(true);
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        if (!email.trim() || !password.trim()) {
            setError('Email and password are required.');
            return;
        }

        try {
            setLoading(true);

            const response = await axios.post('http://localhost:5000/api/auth/login', {
                email: email.trim(),
                password,
            });

            const { token, user } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('isLoggedIn', 'true');

            if (rememberMe) {
                localStorage.setItem('rememberedEmail', email.trim());
            } else {
                localStorage.removeItem('rememberedEmail');
            }

            navigate('/dashboard', { replace: true });
        } catch (err: any) {
            setError(err?.response?.data?.message || 'Login failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-shell">
            <div className="card auth-card p-3">
                <div className="card-body">
                    <div className="mb-4">
                        <h1 className="auth-title">Login</h1>
                        <p className="auth-subtitle">Hi, welcome back</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        {error ? (
                            <div className="alert alert-danger py-2 small" role="alert">
                                {error}
                            </div>
                        ) : null}

                        <div className="mb-3 text-start">
                            <label className="form-label text-dark fw-medium small mb-1">Email</label>
                            <input
                                type="email"
                                className="form-control form-control-lg custom-input"
                                placeholder="E.g. johndoe@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-4 position-relative text-start">
                            <label className="form-label text-dark fw-medium small mb-1">Password</label>

                            <input
                                type={showPassword ? 'text' : 'password'}
                                className="form-control form-control-lg custom-input"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{ paddingRight: '50px' }}
                                required
                            />

                            <button
                                type="button"
                                className="btn position-absolute p-0 border-0 bg-transparent text-muted"
                                style={{ right: '15px', top: '41px', zIndex: 10 }}
                                onClick={() => setShowPassword((prev) => !prev)}
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                            </button>
                        </div>

                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="rememberMe"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                />
                                <label className="form-check-label text-muted small ms-1" htmlFor="rememberMe">
                                    Remember Me
                                </label>
                            </div>

                            <span className="text-primary small fw-medium">Forgot Password?</span>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary custom-btn w-100 mb-4"
                            disabled={loading}
                        >
                            {loading ? 'Signing In...' : 'Login'}
                        </button>
                    </form>

                    <p className="text-muted small mb-0">
                        Not registered yet?{' '}
                        <Link to="/register" className="text-primary text-decoration-none fw-medium">
                            Create an account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;