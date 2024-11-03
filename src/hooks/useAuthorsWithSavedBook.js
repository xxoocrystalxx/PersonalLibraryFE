import { useQuery } from "@apollo/client";
import { GET_AUTHORS_SAVED_BOOKS } from "../graphql/queries";

const useAuthorsWithSavedBook = () => {
  const { data, loading } = useQuery(GET_AUTHORS_SAVED_BOOKS);

  return {
    authors: data?.authorsWithSavedBook,
    loading,
  };
};

export default useAuthorsWithSavedBook;
