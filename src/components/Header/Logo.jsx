import PropTypes from 'prop-types'
import { Link, Box, Icon, Text } from '@chakra-ui/react'
import { Link as ReachLink } from 'react-router-dom'

const Logo = ({ name, icon, ...props }) => (
  <Box {...props}>
    <Link
      as={ReachLink}
      fontSize="x-large"
      fontWeight="bold"
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
      }}
      to="/"
    >
      <Text display={{ base: 'none', md: 'inline' }}> {name} </Text>
      <Icon as={icon} color={'red.400'} />
    </Link>
  </Box>
)
Logo.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.func.isRequired,
}

export default Logo
