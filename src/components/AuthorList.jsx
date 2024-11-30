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
  Select,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import Loader from "./Loader";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useEditAuthor from "../hooks/useEditAuthor";
import BookCard from "./BookCard";
import useDeleteAuthor from "../hooks/useDeleteAuthor";

const AuthorList = ({ authorsFetch }) => {
  const [authorToEdit, setAuthorToEdit] = useState({ name: "" });
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [value, setValue] = useState(false);
  const [orderBy, setOrderBy] = useState();
  const [editAuthor] = useEditAuthor();
  const [deleteAuthor] = useDeleteAuthor();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    // Refetch data whenever the sort option changes
    authorsFetch.refetch({ sort: orderBy });
  }, [orderBy, authorsFetch.refetch]);

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

  const authors =
    authorsFetch.authorsCursor?.edges.map((edge) => edge.node) || [];

  const openEditModal = (author) => {
    setAuthorToEdit(author);
    onOpen();
  };

  const handleAuthorClick = (author) => {
    setSelectedAuthor(selectedAuthor === author ? null : author);
  };

  const handleDelete = async (author) => {
    try {
      await deleteAuthor(author.id);
      onClose();
      toast({
        title: `Delete ${author.name} successfully!`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      authorsFetch.refetch();
    } catch (error) {
      toast({
        title: error.graphQLErrors[0].message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

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

  const handleFetchMore = () => {
    authorsFetch.handleFetchMore();
    setValue(true);
    setTimeout(() => {
      setValue(false);
    }, 1000);
  };

  const handleSelectOrder = (event) => {
    const value = event.target.value;
    setOrderBy(value);
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
          Total: {authorsFetch.authorsCursor.totalCount}
        </Text>
        <Text fontSize="2xl" ml={3} color="white">
          Order By:
        </Text>
        <Select
          ml={5}
          width="auto"
          variant="filled"
          value={orderBy}
          onChange={handleSelectOrder}
        >
          <option value="_id:-1"> Desc</option>
          <option value="bookCount:-1"> BookCount</option>
        </Select>
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
                <Text ms={2}>{b.alias.join("/")}</Text>
                <Badge
                  ml={2}
                  colorScheme="green"
                  variant="outline"
                  fontSize="0.9em"
                >
                  {b.bookCount}
                </Badge>
                <Badge ml={2} colorScheme="red" fontSize="0.9em">
                  {b.books.filter((book) => book.saved).length}
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
  );
};

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
};
export default AuthorList;
