import { Button } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();
  const logout = async () => {
    const request = await fetch('/api/v1/auth/logout');

    if (request.status === 204) {
      localStorage.removeItem('loggedIn');
      navigate('/login');
    }
  };
  return (
    <Button onClick={logout} backgroundColor="red.500" color="white" mt="10">
      Logout
    </Button>
  );
};

export default Logout;
