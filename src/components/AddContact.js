import { Button, Input, VStack } from '@chakra-ui/react';
import React from 'react';

const AddContact = ({ addContact }) => {
  const [name, setName] = React.useState('');
  const [number, setNumber] = React.useState('');
  return (
    <VStack mt="5" width="20rem" spacing="2">
      <Input
        value={name}
        onChange={e => setName(e.target.value)}
        type="text"
        placeholder="Contact name"
      />
      <Input
        value={number}
        onChange={e => setNumber(e.target.value)}
        type="number"
        placeholder="Contact number"
      />
      <Button
        onClick={() => {
          addContact(name, number);
        }}
      >
        Add Contact
      </Button>
    </VStack>
  );
};

export default AddContact;
