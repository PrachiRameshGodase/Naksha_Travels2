import { useLocation } from 'react-router-dom';
const externalUrlWithHome = import.meta.env.VITE_EXTERNAL_URL_Home;

export const ProtectedRouteForUser = ({ children }) => {
  const location = useLocation();
  const storedAccessToken = localStorage.getItem('AccessToken');

  // Parse URL parameters
  const searchParams = new URLSearchParams(location.search);
  const urlAccessToken = searchParams.get('AccessToken');

  // Check if either the stored access token or URL access token exists
  if (!storedAccessToken && !urlAccessToken) {
    // return <Navigate to="/login" replace={true} />;//for local
    const url = `${externalUrlWithHome}/?isLogout=1`;
    window.location.href = url;
  }

  return children;
};