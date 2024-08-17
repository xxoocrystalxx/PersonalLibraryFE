import {useQuery } from '@apollo/client';
import { GET_GENRES } from '../graphql/queries';

const useGenres = () => {

  const { data, loading, } = useQuery(GET_GENRES);

  return {
    genres: data?.allGenres,
    loading,
  };

};

export default useGenres;