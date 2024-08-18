import {
  Badge,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import Loader from './Loader'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { useCallback, useState } from 'react'
import PropTypes from 'prop-types'

const AuthorList = ({ authorsFetch }) => {
  const [author, setAuthor] = useState()
  const [value, setValue] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  if (authorsFetch.loading) return <Loader />

  if (authorsFetch.error) {
    toast({
      title: 'Fetch book',
      description: authorsFetch.error.graphQLErrors[0].message,
      status: 'error',
      duration: 5000,
      isClosable: true,
    })
  }

  // console.log('author render')

  const authors = authorsFetch.authorsCursor
    ? authorsFetch.authorsCursor.edges.map((edge) => edge.node)
    : []

  const handleEdit = (author) => {
    console.log('edit')
    console.log(author)
    // setAuthor(author)
    onOpen()
  }

  const handleDelete = (author) => {}

  const handleFetchMore = () => {
    authorsFetch.handleFetchMore()
    setValue(true)
    setTimeout(() => {
      setValue(false)
    }, 1000)
  }
  return (
    <>
      <Box borderWidth="1px" borderRadius="lg" p={2}>
        <Text fontSize="2xl">Total: {authors.length}</Text>
      </Box>
      <Box>
        {authors.map((b) => (
          <Flex
            key={b.name}
            shadow="md"
            borderWidth="1px"
            p={2}
            justifyContent="space-between"
            _hover={{ shadow: 'xl' }}
            m={2}
          >
            <Box flex="1" alignItems="center" display="flex" pl={2}>
              <Heading as="h4" size="md">
                {b.name}
              </Heading>
              <Badge
                ml={2}
                colorScheme="green"
                variant="outline"
                fontSize="0.9em"
              >
                {b.bookCount}
              </Badge>
            </Box>

            <Box display="flex">
              <IconButton
                colorScheme="blue"
                mr={2}
                icon={<EditIcon />}
                onClick={() => handleEdit(b)}
              />
              <IconButton
                colorScheme="red"
                icon={<DeleteIcon />}
                onClick={() => handleDelete(b)}
              />
            </Box>
          </Flex>
        ))}
      </Box>
      <Center p={2}>
        <Button
          colorScheme="teal"
          variant="solid"
          onClick={handleFetchMore}
          isLoading={value}
          isDisabled={!authorsFetch.authorsCursor.pageInfo.hasNextPage}
        >
          Load More
        </Button>
      </Center>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{author?.name}</ModalBody>
          {author?.name}
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

AuthorList.propTypes = {
  authorsFetch: PropTypes.shape({
    authorsCursor: PropTypes.shape(),
    handleFetchMore: PropTypes.func,
    refetch: PropTypes.func,
    error: PropTypes.shape(),
    loading: PropTypes.bool,
    // edges: PropTypes.arrayOf(
    //   PropTypes.shape({
    //     cursor: PropTypes.string,
    //     node: PropTypes.shape(),
    //   })
    // ),
  }),
}
export default AuthorList
