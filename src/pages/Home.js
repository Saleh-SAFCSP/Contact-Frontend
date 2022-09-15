import {
  Box,
  Flex,
  VStack,
  Text,
  InputGroup,
  InputLeftAddon,
  Spinner,
  Input,
  Divider,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import AddContact from '../components/AddContact';
import Logout from '../components/Logout';

const Home = () => {
  const [contacts, setContacts] = useState([]);
  const toast = useToast();
  const [isUpdated, setIsUpdated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContact = async () => {
      setLoading(true);
      const request = await fetch('/api/v1/contact');
      const data = await request.json();
      if (request.status === 200) {
        setContacts(data);
        setLoading(false);
      }
    };
    fetchContact();
  }, [isUpdated]);

  const addContact = async (name, phoneNumber) => {
    console.log('name', name);
    console.log('phoneNumber', phoneNumber);
    if (!name || !phoneNumber) {
      toast({
        title: 'Error',
        description: 'Please enter a name and a phone number',
        status: 'error',
        duration: 2000,
        isClosable: false,
        position: 'top',
      });
      return;
    }

    const bodyValue = JSON.stringify({ name, phoneNumber });
    const request = await fetch('/api/v1/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: bodyValue,
    });
    const data = await request.json();
    if (request.status === 201) {
      toast({
        title: 'Success',
        description: data.message,
        status: 'success',
        duration: 2000,
        isClosable: false,
        position: 'top',
      });
      setIsUpdated(!isUpdated);
    }
  };

  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      {loading ? (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      ) : (
        <>
          <VStack
            width="20rem"
            p="5"
            border="2px solid lightgray"
            borderRadius="5"
          >
            {contacts.map(contact => (
              <Box id={contact.id} key={contact.id}>
                <Box p="3" borderRadius="5">
                  <InputGroup>
                    <InputLeftAddon children="Name :" />
                    <Input type="text" value={contact.name} readOnly />
                  </InputGroup>
                  <InputGroup>
                    <InputLeftAddon children="Phone number" />
                    <Input type="tel" value={contact.phoneNumber} readOnly />
                  </InputGroup>
                </Box>
                <Divider />
              </Box>
            ))}
          </VStack>
          <AddContact addContact={addContact} />
          <Logout />
        </>
      )}
    </Flex>
  );
};

export default Home;
