import {
  Badge,
  Box,
  Button,
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
} from "@chakra-ui/react";
import Loader from "./Loader";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useState } from "react";
import useEditAuthor from "../hooks/useEditAuthor";
import BookCard from "./BookCard";
import useAuthorsWithSavedBook from "../hooks/useAuthorsWithSavedBook";

const AuthorListWithSavedBook = () => {
  const [authorToEdit, setAuthorToEdit] = useState({ name: "" });
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [editAuthor] = useEditAuthor();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const authorsFetch = useAuthorsWithSavedBook();

  if (authorsFetch.loading) return <Loader />;

  if (authorsFetch.error) {
    console.log(authorsFetch.error);
    toast({
      title: "Fetch book",
      description: authorsFetch.error.graphQLErrors[0].message,
      status: "error",
      duration: 5000,
      isClosable: true,
    });
    return;
  }

  const authors = authorsFetch.authors || [];

  const openEditModal = (author) => {
    setAuthorToEdit(author);
    onOpen();
  };

  const handleAuthorClick = (author) => {
    setSelectedAuthor(selectedAuthor === author ? null : author);
  };

  const handleDelete = (author) => {};

  const handleInputChange = (e) => {
    setAuthorToEdit((prevAuthor) => ({
      ...prevAuthor,
      name: e.target.value,
    }));
  };

  const handleEditAuthor = async () => {
    try {
      await editAuthor(authorToEdit);
      onClose();
      toast({
        title: "Edit successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: error.graphQLErrors[0].message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Flex
        borderWidth="1px"
        bgGradient="linear(to-r, #ff6e7f, #bfe9ff)"
        borderRadius="lg"
        m={2}
        p={2}
        alignItems="center"
      >
        <Text fontSize="2xl" color="white" pr={3} borderEnd="1px">
          Total Authors: {authors.length}
        </Text>
      </Flex>
      <Box>
        {authors.map((b) => (
          <div key={b.name}>
            <Flex
              key={b.name}
              shadow="md"
              borderWidth="1px"
              p={2}
              justifyContent="space-between"
              _hover={{ shadow: "xl" }}
              m={2}
              cursor="pointer"
              onClick={() => handleAuthorClick(b)}
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
                  Total books:
                  {b.bookCount}
                </Badge>
                <Badge ml={2} colorScheme="red" fontSize="0.9em">
                  Saved books:
                  {b.savedBookCount}
                </Badge>
              </Box>

              <Box display="flex">
                <IconButton
                  colorScheme="blue"
                  mr={2}
                  icon={<EditIcon />}
                  onClick={(e) => {
                    e.stopPropagation();
                    openEditModal(b);
                  }}
                />
                <IconButton
                  colorScheme="red"
                  icon={<DeleteIcon />}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(b);
                  }}
                />
              </Box>
            </Flex>

            {selectedAuthor?.name === b.name && (
              <Box px={3}>
                {b.books.map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    // onEdit={handleEdit}
                    onDelete={() => console.log("Delete")}
                    // token={token}
                  />
                ))}
              </Box>
            )}
          </div>
        ))}
      </Box>
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
  );
};

export default AuthorListWithSavedBook;
