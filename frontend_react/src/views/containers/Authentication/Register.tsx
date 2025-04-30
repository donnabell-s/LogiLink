import React, { useState, useEffect } from 'react';
import { registerUser, readAccessToken } from '../../../services/authService'; // Adjust the import path as necessary
import { useNavigate } from 'react-router-dom';
// import { getAccessToken } from '../../services/authService'; // Adjust the import path as necessary


export const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const navigate = useNavigate(); // Use useNavigate for redirection

  // Check if the user is already authenticated
  useEffect(() => {
    const checkAccessToken = async () => {
      const token = await readAccessToken();
      if (token) {
        navigate('/dashboard'); // Redirect to home if authenticated
      } else {
        setLoading(false); // Set loading to false if not authenticated
      }
    };
    checkAccessToken();
  }, [navigate]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser(username, email, password);
      setSuccess(true);
      setError(null);
      // Optionally redirect or auto-login after successful registration
    } catch (err) {
      setError('Failed to register');
      setSuccess(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>; // You can replace this with a spinner or loading animation
  }

  // return (
  //   <div className='container-flex d-flex flex-row h-100'>
  //     <div className='d-none d-md-flex flex-column w-100 justify-content-end bg gap-4 p-5'>
  //       <div className='logo'></div>
  //       <h1 className='me-lg-5  me-md-3 me-0 pe-lg-5 pe-md-3 pe-0'>Your Trusted Logistics Partner</h1>
  //     </div>
  //     <div className='w-100 p-lg-5 p-md-2 p-0 right'>
  //       <form onSubmit={handleRegister} className='h-100 d-flex flex-row justify-content-center align-items-center'>
  //         <div className="w-100 h-100 p-lg-5 p-md-4 p-5 d-flex flex-column justify-content-center gap-3 form">
  //           <div className='d-flex flex-column gap-0 mb-lg-2 mb-md-1 mb-0'>
  //             <div className='w-100 mb-lg-4 mb-md-2 mb-0 pe-lg-5 pe-md-0 pe-0'>
  //               <h1>Sign in to start your session</h1>
  //             </div>
  //             <h5>Sign in to start your session</h5>
  //           </div>
  //           <div className='d-flex flex-column gap-2 input'>
  //             <input
  //               type="text"
  //               placeholder="Username"
  //               value={username}
  //               onChange={(e) => setUsername(e.target.value)}
  //               required
  //             />
  //             <input
  //               type="email"
  //               placeholder="Email"
  //               value={email}
  //               onChange={(e) => setEmail(e.target.value)}
  //               required
  //             />
  //             <input
  //               type="password"
  //               placeholder="Password"
  //               value={password}
  //               onChange={(e) => setPassword(e.target.value)}
  //               required
  //             />
  //             <button type="submit" className='mt-auto'>Register</button>
  //           </div>
  //           {success && <p>Registration successful! 🎉</p>}
  //           {error && <p style={{ color: 'red' }}>{error}</p>}
  //         </div>
  //       </form>
  //     </div>
  //   </div>
  // );

  return (
    <div className='container-flex d-flex flex-row h-100'>
        <div className='d-none d-md-flex flex-column w-100 justify-content-end bg gap-4 p-5'>
            <div className='logo'></div>
            <h1 className='me-lg-5 me-md-3 me-0 pe-lg-5 pe-md-3 pe-0'>Your Trusted Logistics Partner</h1>
        </div>
        <div className='w-100 p-lg-5 p-md-2 p-0 right'>
            <form onSubmit={handleRegister} className='h-100 d-flex flex-row justify-content-center align-items-center'>
                <div className="w-100 h-100 p-lg-5 p-md-4 p-5 d-flex flex-column justify-content-center gap-3 form">
                    <div className='d-flex flex-column gap-0 mb-lg-2 mb-md-1 mb-0'>
                        <div className='w-100 mb-lg-4 mb-md-2 mb-0 pe-lg-5 pe-md-0 pe-0'>
                            <h1>Create Your Account</h1>
                        </div>
                        <h5>Sign up to start your journey</h5>
                    </div>
                    <div className='d-flex flex-column gap-2 input'>
                        <div className="input-container">
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                            <img src="/icons/user.svg" alt="User  Icon" className="input-icon" />
                        </div>
                        <div className="input-container">
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <img src="/icons/mail.svg" alt="Email Icon" className="input-icon" />
                        </div>
                        <div className="input-container">
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <img src="/icons/lock.svg" alt="Password Icon" className="input-icon" />
                        </div>
                        <button type="submit" className='mt-auto'>Register</button>
                    </div>
                    {success && <p>Registration successful! 🎉</p>}
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </div>
            </form>
        </div>
    </div>
);

};

// export default Register;
