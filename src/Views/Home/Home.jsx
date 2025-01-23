import React, { useCallback, useEffect, useState } from 'react';
import Sidebar from '../../Components/NavigationBars/Sidebar'
import Topbar from '../../Components/NavigationBars/Topbar'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import './home.scss'
import { useLocation, useNavigate } from 'react-router-dom';
import callApisOnPageLoad from '../../Configs/callApisOnPageLoad';
import useFetchOnMount from '../Helper/ComponentHelper/useFetchOnMount';
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
const externalUrl = import.meta.env.VITE_EXTERNAL_URL;

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [loggedInUserData, setLoggedInUserData] = useState(null);

  const fetchLoggedInUser = useCallback(async () => {
    localStorage.setItem('FinancialYear', '2024');
    try {
      const token = localStorage.getItem('AccessToken');

      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await axios.post(`${apiUrl}/user/getloggedinuser`);

      const { user } = response?.data;

      // Store user data and access token in local storage
      localStorage.setItem("UserData", JSON.stringify(user));
      if (response.data.success) {
        setLoggedInUserData(response?.data?.user);
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.error('Error fetching logged-in user:', error);
      toast.error('Failed to fetch logged-in user data. Please try again later.');
    }
  }, []);

  useFetchOnMount(fetchLoggedInUser); // Use the custom hook for call API

  // set access token and userData in local storage form search params when the pages is loaded 
  useEffect(() => {
    // Parse the URL parameters
    const searchParams = new URLSearchParams(location.search);
    const accessToken = searchParams.get('AccessToken');
    const userData = searchParams.get('UserData');

    if (accessToken && userData) {
      localStorage.setItem('AccessToken', accessToken);
      localStorage.setItem('UserData', userData);
      navigate('/');
    }
  }, [location.search, navigate]);

  //for call api's on page load....
  useFetchOnMount(callApisOnPageLoad()); // Use the custom hook for call API

  return (
    <>
      <Topbar loggedInUserData={loggedInUserData} />
      <div id="mainbox">
        <Sidebar loggedInUserData={loggedInUserData} />
      </div>
    </>
  )
}
export default Home