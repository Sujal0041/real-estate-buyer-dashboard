// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Register = () => {
//     const navigate = useNavigate();

//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [showPassword, setShowPassword] = useState(false);

//     const [error, setError] = useState('');
//     const [success, setSuccess] = useState('');
//     const [loading, setLoading] = useState(false);

//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();

//         setError('');
//         setSuccess('');

//         if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
//             setError('All fields are required.');
//             return;
//         }

//         if (password !== confirmPassword) {
//             setError('Passwords do not match.');
//             return;
//         }

//         try {
//             setLoading(true);

//             const response = await axios.post('http://localhost:5000/api/auth/register', {
//                 name: name.trim(),
//                 email: email.trim(),
//                 password,
//             });

//             setSuccess(response.data.message || 'User registered successfully.');

//             setName('');
//             setEmail('');
//             setPassword('');
//             setConfirmPassword('');

//             setTimeout(() => {
//                 navigate('/', { replace: true });
//             }, 1000);
//         } catch (err: any) {
//             setError(err?.response?.data?.message || 'Registration failed.');
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
//                             Register
//                         </h1>
//                         <p className="text-muted small mb-0">Create your account</p>
//                     </div>

//                     <form onSubmit={handleSubmit}>
//                         {error ? (
//                             <div className="alert alert-danger py-2 small" role="alert">
//                                 {error}
//                             </div>
//                         ) : null}

//                         {success ? (
//                             <div className="alert alert-success py-2 small" role="alert">
//                                 {success}
//                             </div>
//                         ) : null}

//                         <div className="mb-3 text-start">
//                             <label className="form-label text-dark fw-medium small mb-1">
//                                 Full Name
//                             </label>
//                             <input
//                                 type="text"
//                                 className="form-control form-control-lg border border-2 text-dark"
//                                 placeholder="E.g. John Doe"
//                                 value={name}
//                                 onChange={(e) => setName(e.target.value)}
//                                 style={{ fontSize: '14px', padding: '12px 16px' }}
//                                 required
//                             />
//                         </div>

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

//                         <div className="mb-3 position-relative text-start">
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

//                         <div className="mb-4 text-start">
//                             <label className="form-label text-dark fw-medium small mb-1">
//                                 Confirm Password
//                             </label>
//                             <input
//                                 type={showPassword ? 'text' : 'password'}
//                                 className="form-control form-control-lg border border-2 text-dark"
//                                 placeholder="Confirm your password"
//                                 value={confirmPassword}
//                                 onChange={(e) => setConfirmPassword(e.target.value)}
//                                 style={{ fontSize: '14px', padding: '12px 16px' }}
//                                 required
//                             />
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
//                             {loading ? 'Creating Account...' : 'Register'}
//                         </button>
//                     </form>

//                     <div className="text-center mt-3 mb-3">
//                         <p className="text-muted small mb-0">
//                             Already have an account?{' '}
//                             <Link to="/" className="text-primary text-decoration-none fw-medium">
//                                 Sign In
//                             </Link>
//                         </p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Register;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setError('');
        setSuccess('');

        if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
            setError('All fields are required.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            setLoading(true);

            const response = await axios.post('http://localhost:5000/api/auth/register', {
                name: name.trim(),
                email: email.trim(),
                password,
            });

            const { token, user } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('isLoggedIn', 'true');

            setSuccess(response.data.message || 'User registered successfully.');

            setName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');

            setTimeout(() => {
                navigate('/dashboard', { replace: true });
            }, 800);
        } catch (err: any) {
            setError(err?.response?.data?.message || 'Registration failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-shell">
            <div className="card auth-card p-3">
                <div className="card-body">
                    <div className="mb-4">
                        <h1 className="auth-title">Register</h1>
                        <p className="auth-subtitle">Create your account</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        {error ? (
                            <div className="alert alert-danger py-2 small" role="alert">
                                {error}
                            </div>
                        ) : null}

                        {success ? (
                            <div className="alert alert-success py-2 small" role="alert">
                                {success}
                            </div>
                        ) : null}

                        <div className="mb-3 text-start">
                            <label className="form-label text-dark fw-medium small mb-1">Full Name</label>
                            <input
                                type="text"
                                className="form-control form-control-lg custom-input"
                                placeholder="E.g. John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

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

                        <div className="mb-3 position-relative text-start">
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

                        <div className="mb-4 text-start">
                            <label className="form-label text-dark fw-medium small mb-1">Confirm Password</label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className="form-control form-control-lg custom-input"
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary custom-btn w-100 mb-4"
                            disabled={loading}
                        >
                            {loading ? 'Creating Account...' : 'Register'}
                        </button>
                    </form>

                    <div className="text-center mt-3 mb-1">
                        <p className="text-muted small mb-0">
                            Already have an account?{' '}
                            <Link to="/" className="text-primary text-decoration-none fw-medium">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;