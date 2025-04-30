// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { getAccessToken } from '../services/authService'; // Adjust the path as necessary
// import { PATH } from "../constant/constants";

// interface AuthGuardProps {
//     children: React.ReactNode; // Allows multiple children
//   }

// const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
//   const token = getAccessToken();

//   if (!token) {
//     // Redirect to login page if no access token is found
//     return <Navigate to={PATH.REGSTER.path} replace />;
//   }

//   // Allow access to the protected route if the user is authenticated
//   return children;
// };

// export default AuthGuard;
