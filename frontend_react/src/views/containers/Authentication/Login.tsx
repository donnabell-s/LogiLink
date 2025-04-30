import React, { useState, useEffect } from 'react';
import { loginUser, readAccessToken  } from '../../../services/authService'; // Adjust the import path as necessary
import { useNavigate } from 'react-router-dom';
import './auth.css';
// import { getAccessToken } from '../../services/authService';

export const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  // const [success, setSuccess] = useState<boolean>(false);
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        await loginUser (username, password); // Assuming this function sets the token in local storage or context
        setError(null);
        navigate('/dashboard'); // Navigate to the dashboard after successful login
    } catch (err) {
        setError('Failed to log in');
    }
};

  // Show loading indicator or login form based on loading state
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
  //       <form onSubmit={handleLogin} className='h-100 d-flex flex-row justify-content-center align-items-center'>
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
  //               type="password"
  //               placeholder="Password"
  //               value={password}
  //               onChange={(e) => setPassword(e.target.value)}
  //               required
  //             />
  //             <a className='mb-lg-4 mb-md-2'>Forgot your Password?</a>
  //             {error && <p style={{ color: 'red' }}>{error}</p>}
  //             <button type="submit" className='mt-auto'>Sign In</button>
  //           </div>
  //           {/* {success && <p>Login successful! 🎉</p>} */}
            
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
            <form onSubmit={handleLogin} className='h-100 d-flex flex-row justify-content-center align-items-center'>
                <div className="w-100 h-100 p-lg-5 p-md-4 p-5 d-flex flex-column justify-content-center gap-3 form">
                    <div className='d-flex flex-column gap-0 mb-lg-2 mb-md-1 mb-0'>
                        <div className='w-100 mb-lg-4 mb-md-2 mb-0 pe-lg-5 pe-md-0 pe-0'>
                            <h1>Sign in to start your session</h1>
                        </div>
                        <h5>Sign in to start your session</h5>
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
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <img src="/icons/lock.svg" alt="Password Icon" className="input-icon" />
                        </div>
                        <a className='mb-lg-4 mb-md-2'>Forgot your Password?</a>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        <button type="submit" className='mt-auto'>Sign In</button>
                    </div>
                    {/* {success && <p>Login successful! 🎉</p>} */}
                </div>
            </form>
        </div>
    </div>
);
};

// export default Login;