import {
  Badge,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  IconButton,
  Input,
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
import { useState } from 'react'
import PropTypes from 'prop-types'
import useEditAuthor from '../hooks/useEditAuthor'

const AuthorList = ({ authorsFetch }) => {
  const [authorToEdit, setAuthorToEdit] = useState({ name: '' })
  const [value, setValue] = useState(false)
  const [editAuthor] = useEditAuthor()
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

  const authors = authorsFetch.authorsCursor
    ? authorsFetch.authorsCursor.edges.map((edge) => edge.node)
    : []

  const openEditModal = (author) => {
    setAuthorToEdit(author)
    onOpen()
  }

  const handleDelete = (author) => {}

  const handleInputChange = (e) => {
    setAuthorToEdit((prevAuthor) => ({
      ...prevAuthor,
      name: e.target.value,
    }))
  }

  const handleEditAuthor = async () => {
    try {
      await editAuthor(authorToEdit)
      onClose()
      toast({
        title: 'Edit successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    } catch (error) {
      toast({
        title: error.graphQLErrors[0].message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  }

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
        <Text fontSize="2xl">
          Total: {authorsFetch.authorsCursor.totalCount}
        </Text>
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
                onClick={() => openEditModal(b)}
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
          <ModalHeader>Author: {authorToEdit?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              type="text"
              value={authorToEdit.name}
              onChange={handleInputChange}
              placeholder={authorToEdit?.name}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleEditAuthor}>
              Edit
            </Button>
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
