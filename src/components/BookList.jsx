import { useState } from 'react'
import {
  Box,
  Flex,
  Stack,
  Text,
  Heading,
  Spacer,
  Badge,
  Icon,
  Button,
  Center,
} from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'
import { RiMenLine, RiWomenLine, RiShieldUserLine } from 'react-icons/ri'
import PropTypes from 'prop-types'

const BookList = ({ books, handleFetchMore }) => {
  const [value, setValue] = useState(false)
  // if(!books) return null

  const handle = () => {
    handleFetchMore()
    setValue(true)
    setTimeout(() => {
      setValue(false)
    }, 1000)
  }
  return (
    <Box>
      {books.map((b) => (
        <Flex
          key={b.id}
          // w="100%"
          shadow="md"
          borderWidth="1px"
          p={2}
          justifyContent="space-between"
          _hover={{ shadow: 'xl' }}
          m={2}
          bg={b.saved ? 'green.50' : 'white'}
        >
          <Box alignItems={'flex-start'} flex="1">
            <Heading as="h4" size="md" p={1}>
              {b.title}
            </Heading>
            <Text fontSize="xs" color="gray.600" p={1}>
              <Icon as={RiMenLine} w={4} h={4} /> {b.male}
            </Text>
            <Text fontSize="xs" color="gray.600" pl={1}>
              <Icon as={RiWomenLine} w={4} h={4} /> {b.female}
            </Text>
            <Stack direction="row" p={1}>
              <Text fontSize="xs">
                {' '}
                <Icon as={RiShieldUserLine} w={4} h={4} /> {b.author.name}
              </Text>
              <Spacer />
              {b.genres.map((g) => (
                <Badge variant="outline" colorScheme="cyan" key={g.name}>
                  {g.name}
                </Badge>
              ))}
            </Stack>
          </Box>
          <Box alignItems={'flex-start'} flex="3">
            <Text fontSize="xs" noOfLines={[1, 2, 2]} color="gray.600" p={1}>
              {b.description}
            </Text>
            <Text color="red.300" fontSize="xs" p={1}>
              {b.comment}
            </Text>
            <Box display="flex" p={1} alignItems="center">
              {Array(5)
                .fill('')
                .map((_, i) => (
                  <StarIcon
                    key={i}
                    color={i < b.rating ? 'teal.500' : 'gray.300'}
                  />
                ))}
            </Box>
          </Box>
        </Flex>
      ))}
      <Center p={2}>
        <Button
          colorScheme="teal"
          variant="solid"
          onClick={handle}
          isLoading={value}
        >
          Load More
        </Button>
      </Center>
    </Box>
  )
}

BookList.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      author: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }),
      male: PropTypes.string,
      female: PropTypes.string,
      description: PropTypes.string,
      comment: PropTypes.string,
      time: PropTypes.string,
      rating: PropTypes.number,
      genres: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
        })
      ),
      saved: PropTypes.bool,
      id: PropTypes.string,
    })
  ),
  handleFetchMore: PropTypes.func.isRequired,
}

export default BookList
