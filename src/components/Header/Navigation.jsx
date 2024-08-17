import { Flex } from '@chakra-ui/react'
import { IoLibrary } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import { useApolloClient } from '@apollo/client'
import useUserInfo from '../../hooks/useUserInfo'
import Logo from './Logo'
import MenuLinks from './MenuLinks'
import SearchBar from './SearchBar'
import PropTypes from 'prop-types'

const Navigation = ({ setToken, refetch }) => {
  let history = useNavigate()

  const { data, loading } = useUserInfo()

  const apolloClient = useApolloClient()

  if (loading) return 'loading'

  const signOut = () => {
    setToken(null)
    localStorage.clear()
    apolloClient.resetStore()
    history.push('/')
  }

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      w="100%"
      borderTop="3px solid"
      borderTopColor={'pink.400'}
      boxShadow="lg"
      mb={8}
      p={2}
      bg="white"
      sx={{
        position: '-webkit-sticky', //standar value
        WebkitPosition: 'sticky', //for Safari
        top: '0',
      }}
      wrap={{ base: 'wrap', md: 'nowrap' }}
    >
      <Logo
        w="20%"
        bgGradient="linear(to-r, red.400, orange.300, pink.500,pink.100)"
        bgClip="text"
        name="CrystalSpace"
        icon={IoLibrary}
      />
      <SearchBar refetch={refetch} />
      {/* <MenuToggle toggle={toggle} isOpen={isOpen} /> */}
      <MenuLinks signOut={signOut} data={data} />
    </Flex>
  )
}

Navigation.propTypes = {
  setToken: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired,
}

export default Navigation
