import { useMutation } from "@apollo/client";
import { DELETE_AUTHOR } from "../graphql/mutations";

const useDeleteAuthor = () => {
  const [mutate, result] = useMutation(DELETE_AUTHOR);

  const deleteAuthor = async (id) => {
    await mutate({
      variables: {
        id,
      },
    });
  };

  return [deleteAuthor, result];
};

export default useDeleteAuthor;
