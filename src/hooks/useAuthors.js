import {useQuery } from '@apollo/client';
import { GET_AUTHORS } from '../graphql/queries';

const useAuthors = () => {

  const { data, loading, } = useQuery(GET_AUTHORS,);

  return {
    authors: data?.allAuthors,
    loading,
  };

};

export default useAuthors;