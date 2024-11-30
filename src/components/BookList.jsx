import { useState } from "react";
import {
  Box,
  Text,
  Button,
  Center,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import AddBook from "./AddBook";
import BookCard from "./BookCard";
import Loader from "./Loader";
import useDeleteBook from "../hooks/useDeleteBook";

const BookList = ({
  booksCursor,
  loading,
  handleFetchMore,
  error,
  refetch,
  token,
}) => {
  const [value, setValue] = useState(false);
  const [bookToEdit, setBookToEdit] = useState();
  const [deleteBook] = useDeleteBook();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (loading) return <Loader />;
  const books = booksCursor ? booksCursor.edges.map((edge) => edge.node) : [];

  if (error) {
    toast({
      title: "Fetch book",
      description: error.graphQLErrors[0].message,
      status: "error",
      duration: 5000,
      isClosable: true,
    });
    return;
  }
  const handle = () => {
    handleFetchMore();
    setValue(true);
    setTimeout(() => {
      setValue(false);
    }, 1000);
  };

  const handleDelete = async (book) => {
    try {
      await deleteBook(book.id);
      onClose();
      toast({
        title: `Delete ${book.title} successfully!`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      refetch();
    } catch (error) {
      toast({
        title: error.graphQLErrors[0].message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleEdit = (b) => {
    setBookToEdit(b);
    onOpen();
  };
  return (
    <Box>
      <Box borderWidth="1px" borderRadius="lg" p={2}>
        <Text fontSize="2xl">Total: {booksCursor.totalCount}</Text>
      </Box>
      {books.map((b) => (
        <BookCard
          key={b.id}
          book={b}
          onEdit={handleEdit}
          onDelete={handleDelete}
          token={token}
        />
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
  );
};

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
  loading: PropTypes.bool,
  error: PropTypes.func,
  refetch: PropTypes.func,
  token: PropTypes.string,
};

export default BookList;
