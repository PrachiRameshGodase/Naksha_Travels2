import React, { useEffect, useState } from 'react';
import Sidebar from '../../Components/NavigationBars/Sidebar'
import Topbar from '../../Components/NavigationBars/Topbar'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import './home.scss'
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchCurrencies, fetchGetCountries, fetchMasterData, fetchTexRates } from '../../Redux/Actions/globalActions';
import { useDispatch } from 'react-redux';
import { itemLists, vendorsLists } from '../../Redux/Actions/listApisActions';
import { customersList } from '../../Redux/Actions/customerActions';
import { callApisOnPageLoad } from '../../Configs/callApisOnPageLoad';

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const Home = () => {
  const [loggedInUserData, setLoggedInUserData] = useState(null);

  useEffect(() => {
    localStorage.setItem('FinancialYear', '2024');
    // localStorage.setItem('warehouseId', '0');

    const fetchLoggedInUser = async () => {
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
    };

    fetchLoggedInUser();

    // Clean up function
    return () => {
      // Cleanup if needed
    };
  }, []);

  const location = useLocation();
  const navigate = useNavigate();

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

  const dispatch = useDispatch();
  //call api's
  useEffect(() => {
    callApisOnPageLoad(dispatch);
  }, [dispatch]);

  const urlParams = new URLSearchParams(window.location.search);
  const accessToken = urlParams.get('AccessToken');
  const userData = urlParams.get('UserData');

  if (accessToken && userData) {
    localStorage.setItem('AccessToken', accessToken);
    localStorage.setItem('UserData', userData);
    window.location.href = '/';
  }

  // You can now check if the AccessToken exists in localStorage for session management
  const storedAccessToken = localStorage.getItem('AccessToken');
  if (!storedAccessToken) {
    // If no token is found in localStorage, redirect to the login page
    window.location.href = '/login';
  }

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