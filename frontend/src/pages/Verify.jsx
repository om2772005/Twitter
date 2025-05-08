import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Change useHistory to useNavigate

const VerifyPage = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const verifyToken = async () => {
      const token = new URLSearchParams(window.location.search).get('token');
      if (!token) {
        navigate('/sign'); 
        return;
      }

      try {
        const response = await axios.get(`/api/verify?token=${token}`);
        const { redirect } = response.data;
        navigate(redirect); // Use navigate to redirect to /home or /sign
      } catch (error) {
        console.error('Verification failed:', error);
        navigate('/sign'); // Redirect to /sign in case of any error
      }
    };

    verifyToken();
  }, [navigate]); // Make sure navigate is included in the dependencies

  return <div>Verifying...</div>;
};

export default VerifyPage;
