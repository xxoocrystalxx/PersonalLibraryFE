import { useState } from 'react'
import {
  Flex,
  Heading,
  Button,
  Stack,
  chakra,
  Box,
  Avatar,
} from '@chakra-ui/react'
import { FaUserAlt, FaLock } from 'react-icons/fa'
import { Formik, Form } from 'formik'
import * as yup from 'yup'
import useSignIn from '../../hooks/useSignIn'
import { useNavigate } from 'react-router-dom'
import TextInput from '../Formik/TextInput'
import PropTypes from 'prop-types'
import { useToast } from '@chakra-ui/react'

const CFaUserAlt = chakra(FaUserAlt)
const CFaLock = chakra(FaLock)

const initialValues = {
  username: '',
  password: '',
}

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('password is required'),
})

const SignIn = ({ setToken }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [login] = useSignIn({ setToken })
  const toast = useToast()
  let navigate = useNavigate()

  const handleShowClick = () => setShowPassword(!showPassword)

  const onSubmit = async (values) => {
    // console.log(values);
    const { username, password } = values
    try {
      await login({ username, password })
      navigate('/')
    } catch (e) {
      toast({
        title: 'Login',
        description: e.graphQLErrors[0].message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  }

  return (
    <Flex
      flexDirection="row"
      // w="100wh"
      // minH="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Stack mb="2" justifyContent="center" alignItems="center">
        <Avatar bg="teal.500" />
        <Heading color="teal.400">Welcome</Heading>
        <Box minW={{ base: '90%', md: '468px' }}>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {() => (
              <Form>
                <Stack
                  spacing={4}
                  p="1rem"
                  backgroundColor="whiteAlpha.900"
                  boxShadow="md"
                >
                  <TextInput
                    left={<CFaUserAlt color="gray.300" />}
                    name="username"
                    type="username"
                    placeholder="user name"
                  />
                  <TextInput
                    left={<CFaLock color="gray.300" />}
                    right={
                      <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                        {showPassword ? 'Hide' : 'Show'}
                      </Button>
                    }
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                  />
                  <Button
                    borderRadius={0}
                    type="submit"
                    variant="solid"
                    colorScheme="teal"
                    width="full"
                  >
                    Login
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </Box>
      </Stack>
    </Flex>
  )
}

SignIn.propTypes = {
  setToken: PropTypes.func.isRequired,
}

export default SignIn
