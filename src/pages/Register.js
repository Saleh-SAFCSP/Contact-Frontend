import { Button, Flex, Heading, Input, VStack } from '@chakra-ui/react';
import React from 'react';

const Register = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const login = async () => {
    const request = await fetch('/api/v1/auth/login', {
      method: 'POST',
      headers: {
        authorization: 'Basic ' + btoa(username + ':' + password),
      },
    });

    const data = await request.json();

    console.log(data);
  };

  return (
    <Flex justifyContent="center" alignItems="center" height="100vh">
      <VStack width="20rem" spacing="2rem">
        <Heading>Login !</Heading>
        <Input
          onChange={e => setUsername(e.target.value)}
          value={username}
          placeholder="Username"
        />
        <Input
          onChange={e => setPassword(e.target.value)}
          value={password}
          placeholder="Password"
        />
        <Button onClick={login} width="100%">
          Login
        </Button>
      </VStack>
    </Flex>
  );
};

export default Register;
