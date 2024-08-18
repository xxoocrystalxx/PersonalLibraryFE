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
  useToast,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react'
import { StarIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { RiMenLine, RiWomenLine, RiShieldUserLine } from 'react-icons/ri'
import PropTypes from 'prop-types'
import AddBook from './AddBook'

const BookList = ({ booksCursor, handleFetchMore, error, refetch, token }) => {
  const [value, setValue] = useState(false)
  const [bookToEdit, setBookToEdit] = useState()
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()

  if (!booksCursor) return ''
  const books = booksCursor ? booksCursor.edges.map((edge) => edge.node) : []

  if (error) {
    toast({
      title: 'Fetch book',
      description: error.graphQLErrors[0].message,
      status: 'error',
      duration: 5000,
      isClosable: true,
    })
  }
  const handle = () => {
    handleFetchMore()
    setValue(true)
    setTimeout(() => {
      setValue(false)
    }, 1000)
  }

  const handleDelete = () => {
    console.log('delte')
  }

  const handleEdit = (b) => {
    setBookToEdit(b)
    onOpen()
  }
  return (
    <Box>
      {books.map((b) => (
        <Flex
          key={b.id}
          shadow="md"
          borderWidth="1px"
          p={2}
          justifyContent="space-between"
          _hover={{ shadow: 'xl' }}
          m={2}
          bg={b.saved ? 'green.50' : 'white'}
        >
          <Box alignItems={'flex-start'} flex="1">
            <Box display="flex" justifyContent="space-between">
              <Heading as="h4" size="md" p={1}>
                {b.title}
              </Heading>
              <Heading as="h4" size="md" p={1}>
                {b.time}
              </Heading>
            </Box>
            <Text fontSize="xs" color="gray.600" p={1}>
              <Icon as={RiMenLine} w={4} h={4} /> {b.male}
            </Text>
            <Text fontSize="xs" color="gray.600" pl={1}>
              <Icon as={RiWomenLine} w={4} h={4} /> {b.female}
            </Text>
            <Stack direction="row" p={1}>
              <Text
                fontSize="xs"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Icon as={RiShieldUserLine} w={4} h={4} mr={1} />{' '}
                {b.author.name}
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
          {token && (
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
            >
              <IconButton
                colorScheme="blue"
                icon={<EditIcon />}
                onClick={() => handleEdit(b)}
              />
              <IconButton
                colorScheme="red"
                icon={<DeleteIcon />}
                onClick={handleDelete}
              />
            </Box>
          )}
        </Flex>
      ))}
      <Center p={2}>
        <Button
          colorScheme="teal"
          variant="solid"
          onClick={handle}
          isLoading={value}
          isDisabled={!booksCursor.pageInfo.hasNextPage}
        >
          Load More
        </Button>
      </Center>
      <AddBook
        isOpen={isOpen}
        onClose={onClose}
        refetch={refetch}
        book={bookToEdit}
      />
    </Box>
  )
}

BookList.propTypes = {
  booksCursor: PropTypes.shape({
    edges: PropTypes.arrayOf(
      PropTypes.shape({
        cursor: PropTypes.string,
        node: PropTypes.shape(),
      })
    ),
    pageInfo: PropTypes.shape({
      endCursor: PropTypes.string,
      hasNextPage: PropTypes.bool,
    }),
    totalCount: PropTypes.number,
  }),
  // books: PropTypes.arrayOf(
  //   PropTypes.shape({
  //     title: PropTypes.string.isRequired,
  //     author: PropTypes.shape({
  //       name: PropTypes.string.isRequired,
  //     }),
  //     male: PropTypes.string,
  //     female: PropTypes.string,
  //     description: PropTypes.string,
  //     comment: PropTypes.string,
  //     time: PropTypes.string,
  //     rating: PropTypes.number,
  //     genres: PropTypes.arrayOf(
  //       PropTypes.shape({
  //         name: PropTypes.string.isRequired,
  //       })
  //     ),
  //     saved: PropTypes.bool,
  //     id: PropTypes.string,
  //   })
  // ),
  handleFetchMore: PropTypes.func.isRequired,
  error: PropTypes.func,
  refetch: PropTypes.func,
  token: PropTypes.string,
}

export default BookList
