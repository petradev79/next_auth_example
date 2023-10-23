'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';

import { useState, useEffect } from 'react';
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
} from '@chakra-ui/react';
import { EmailIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

const ChakraLogin = () => {
  const session = useSession();
  const router = useRouter();
  // const params = useSearchParams();
  // const callbackUrl = params.get('callbackUrl');
  // const searchParams = useSearchParams();
  // const callbackUrl = searchParams.get('callbackUrl');
  const [error, setError] = useState('');
  // const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  // console.log(session, params);

  const handleShowClick = () => setShowPassword(!showPassword);

  // useEffect(() => {
  //   setError(params.get('error'));
  //   // setSuccess(params.get('success'));
  // }, [params]);

  if (session.status === 'loading') {
    return <p>Loading...</p>;
  }

  const handleSubmit = e => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    signIn('credentials', {
      email,
      password,
      redirect: false,
    }).then(({ ok, error }) => {
      if (ok) {
        router?.push('/');
      } else {
        setError(error);
        console.log(error);
      }
    });
  };

  return (
    <Flex
      flexDirection='column'
      width='100wh'
      height='100vh'
      backgroundColor='gray.200'
      justifyContent='center'
      alignItems='center'
    >
      <Stack
        flexDir='column'
        mb='2'
        justifyContent='center'
        alignItems='center'
      >
        <Avatar bg='teal.500' />
        <Heading>Welcome</Heading>
        <Box minW={{ base: '90%', md: '468px' }}>
          <form onSubmit={handleSubmit}>
            <Stack
              spacing={4}
              p='1rem'
              backgroundColor='whiteAlpha.900'
              boxShadow='md'
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents='none'>
                    <EmailIcon color='gray.300' />
                  </InputLeftElement>
                  <Input type='email' placeholder='email address' required />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents='none' color='gray.300'>
                    {showPassword ? (
                      <ViewIcon color='gray.300' />
                    ) : (
                      <ViewOffIcon color='gray.300' />
                    )}
                  </InputLeftElement>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Password'
                    required
                  />
                  <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleShowClick}>
                      {showPassword ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText textAlign='right'>
                  <Link>forgot password?</Link>
                </FormHelperText>
              </FormControl>
              <Button
                borderRadius={0}
                type='submit'
                variant='solid'
                colorScheme='teal'
                width='full'
              >
                Login
              </Button>
            </Stack>
            {error && error}
          </form>
        </Box>
      </Stack>
      <Box>
        New to us?{' '}
        <Link color='teal.500' href='#'>
          Sign Up
        </Link>
      </Box>
      <Box minW={{ base: '90%', md: '468px' }} textAlign='center'>
        - OR -
        <Button
          onClick={() => signIn('google')}
          borderRadius={0}
          variant='solid'
          colorScheme='blue'
          width='full'
        >
          Signin with Google
        </Button>
      </Box>
    </Flex>
  );
};
export default ChakraLogin;
