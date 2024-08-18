import {
  Badge,
  Box,
  Button,
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
} from '@chakra-ui/react'
import useAuthors from '../hooks/useAuthors'
import Loader from './Loader'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { useCallback, useState } from 'react'

const AuthorList = () => {
  const { authors, loading } = useAuthors()
  const [author, setAuthor] = useState()
  const { isOpen, onOpen, onClose } = useDisclosure()

  // const handleEdit = useCallback(
  //   (author) => {
  //     setAuthor(author)
  //     onOpen()
  //   },
  //   [onOpen]
  // )

  // const handleDelete = useCallback((author) => {
  //   // Delete logic here
  // }, [])

  if (loading) return <Loader />

  console.log('render')

  const handleEdit = (author) => {
    console.log('edit')
    console.log(author)
    // setAuthor(author)
    onOpen()
  }
  console.log(authors.length)

  const handleDelete = (author) => {}
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

export default AuthorList
