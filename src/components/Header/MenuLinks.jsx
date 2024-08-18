import { useState } from 'react'
import {
  Link,
  Box,
  Stack,
  Button,
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Icon,
  useDisclosure,
} from '@chakra-ui/react'
import { Link as ReachLink } from 'react-router-dom'
import { IoClose, IoMenu } from 'react-icons/io5'
import { AddIcon } from '@chakra-ui/icons'
import AddBook from '../AddBook'
import { useConfig } from '../../hooks/useConfig'
import PropTypes from 'prop-types'
import { FaAddressBook, FaSignOutAlt } from 'react-icons/fa'

const MenuToggle = ({ toggle, isMenuOpen }) => (
  <Box display={{ base: 'block', md: 'none' }} onClick={toggle}>
    {isMenuOpen ? <Icon as={IoClose} /> : <Icon as={IoMenu} />}
  </Box>
)

const MenuLinks = ({ signOut, data, refetch }) => {
  const [isMenuOpen, setisMenuOpen] = useState(false)
  //add book component
  const { isOpen, onOpen, onClose } = useDisclosure()

  const toggle = () => setisMenuOpen(!isMenuOpen)
  const config = useConfig()
  const showSignUp = config.REACT_APP_SHOW_SIGNUP === 'true'

  return (
    <>
      <MenuToggle toggle={toggle} isMenuOpen={isMenuOpen} />
      <Box
        display={{ base: isMenuOpen ? 'block' : 'none', md: 'block' }}
        flexBasis={{ base: '100%', md: 'auto' }}
      >
        <Stack
          spacing={4}
          align="center"
          justify={['center', 'space-between', 'flex-end', 'flex-end']}
          direction={['column', 'row', 'row', 'row']}
          pt={[2, 2, 0, 0]}
        >
          {data === null ? (
            <>
              <Link
                as={ReachLink}
                to="/SignIn"
                rounded={'md'}
                _hover={{
                  textDecoration: 'none',
                }}
              >
                <Button colorScheme="red" variant="ghost" size="md">
                  Sign in
                </Button>
              </Link>
              {showSignUp && (
                <Link
                  as={ReachLink}
                  to="/SignUp"
                  rounded={'md'}
                  _hover={{
                    textDecoration: 'none',
                  }}
                >
                  <Button colorScheme="red" variant="ghost" size="md">
                    Sign up
                  </Button>
                </Link>
              )}
            </>
          ) : (
            <>
              <Popover placement="bottom-start">
                {({ onClose: onClosePop }) => (
                  <>
                    <PopoverTrigger>
                      <Avatar
                        as={Button}
                        name={data.username}
                        size="md"
                        _hover={{ bg: 'teal.700' }}
                      />
                    </PopoverTrigger>
                    <PopoverContent border={0} boxShadow={'xl'} w={'2xs'}>
                      <Button
                        as={ReachLink}
                        to="/AuthorList"
                        _hover={{ textDecoration: 'none', bg: 'gray.100' }}
                        bg={'white'}
                        onClick={onClosePop}
                        leftIcon={<Icon as={FaAddressBook} />}
                      >
                        Author List
                      </Button>
                      <Button
                        _hover={{ textDecoration: 'none', bg: 'gray.100' }}
                        onClick={signOut}
                        bg={'white'}
                        leftIcon={<Icon as={FaSignOutAlt} />}
                      >
                        Logout
                      </Button>
                    </PopoverContent>
                  </>
                )}
              </Popover>
              {/* <Link as={ReachLink} to="/AddBook" rounded={'md'} _hover={{textDecoration: 'none',}}> */}
              <>
                <Button
                  leftIcon={<AddIcon />}
                  colorScheme="teal"
                  onClick={onOpen}
                >
                  New Book
                </Button>
                <AddBook isOpen={isOpen} onClose={onClose} refetch={refetch} />
              </>
              {/* </Link> */}
            </>
          )}
          {/* <Link as={ReachLink} to="/Migrate" rounded={'md'} _hover={{
        textDecoration: 'none',
      }}><Button colorScheme='red' variant='ghost' size='md'>
      Migrate
    </Button></Link> */}
        </Stack>
      </Box>
    </>
  )
}

MenuToggle.propTypes = {
  toggle: PropTypes.func.isRequired,
  isMenuOpen: PropTypes.bool.isRequired,
}

MenuLinks.propTypes = {
  signOut: PropTypes.func.isRequired,
  data: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }),
  refetch: PropTypes.func.isRequired,
}

export default MenuLinks
