import { useState } from 'react'
import {
  Flex,
  Heading,
  Button,
  Stack,
  chakra,
  Box,
  Avatar,
  useToast,
} from '@chakra-ui/react'
import { FaUserAlt, FaLock } from 'react-icons/fa'
import { Formik, Form } from 'formik'
import * as yup from 'yup'
import useSignUp from '../../hooks/useSignUp'
import { useNavigate } from 'react-router-dom'
import TextInput from '../Formik/TextInput'

const CFaUserAlt = chakra(FaUserAlt)
const CFaLock = chakra(FaLock)

const initialValues = {
  username: '',
  password: '',
  passwordConfirm: '',
}

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required').min(4).max(30),
  password: yup.string().required('password is required').min(5).max(50),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null])
    .required('Password confirm is required'),
})

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [signUp] = useSignUp()
  let navigate = useNavigate()
  const toast = useToast()

  const handleShowClick = () => setShowPassword(!showPassword)

  const onSubmit = async (values) => {
    const { username, password } = values
    try {
      await signUp({ username, password })
      navigate('/')
    } catch (e) {
      toast({
        title: 'SignUp',
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
                  <TextInput
                    left={<CFaLock color="gray.300" />}
                    name="passwordConfirm"
                    type="password"
                    placeholder="confirm password"
                  />
                  <Button
                    borderRadius={0}
                    type="submit"
                    variant="solid"
                    colorScheme="teal"
                    width="full"
                  >
                    Sign Up
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </Box>
      </Stack>
      {/* <Box>
        New to us?{" "}
        <Link color="teal.500" href="#">
          Sign Up
        </Link>
      </Box> */}
    </Flex>
  )
}

export default SignUp
