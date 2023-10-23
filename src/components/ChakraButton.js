'use client';

import { signOut } from 'next-auth/react';
import { Button } from '@chakra-ui/react';

const ChakraButton = () => {
  return (
    <>
      <Button onClick={() => signOut()} borderRadius={0} variant='solid'>
        Sign out
      </Button>
    </>
  );
};
export default ChakraButton;
