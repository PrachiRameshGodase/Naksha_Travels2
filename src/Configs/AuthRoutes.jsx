import React, { Fragment } from "react";
import { Navigate, useLocation } from 'react-router-dom';
import { getCookie } from "../Views/Helper/ComponentHelper/ManageStorage/cookeeStorageUtils";
const externalUrl = import.meta.env.VITE_EXTERNAL_URL;

// export const ProtectedRouteForAuthSlash = ({ children }) => {
//   const authToken = getAuthTokenFromCookie();
//   if (authToken) {
//     return <Navigate to={"/"} replace={true}></Navigate>;
//   }
//   return children;
// };



// export const ProtectedRouteForUser = ({ children }) => {
//   const storedUserData = localStorage.getItem('AccessToken');


//   if (!storedUserData) {
//       return <Navigate to="/login" replace={true} />;
//   }

//   return children;
// };




export const ProtectedRouteForUser = ({ children }) => {
  const location = useLocation();
  // const storedAccessToken = localStorage.getItem('AccessToken');
  const storedAccessToken = getCookie('AccessToken');



  // Parse URL parameters
  const searchParams = new URLSearchParams(location.search);
  const urlAccessToken = searchParams.get('AccessToken');

  // Check if either the stored access token or URL access token exists
  if (!storedAccessToken && !urlAccessToken) {
    // return <Navigate to="/login" replace={true} />;//for local

    // const url = `${externalUrl}/login`;
    const url = `http://localhost:5173/login`;
    window.location.href = url;
    // return <Navigate to={`/${externalUrl}/login`} replace={true} />;//for live url
  }

  return children;
};