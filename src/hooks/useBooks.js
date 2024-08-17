import {useQuery } from '@apollo/client';
import { GET_BOOKS } from '../graphql/queries';

const useBooks = (variables) => {
  // const [books,setBooks]=useState()
  const {loading,data,fetchMore,refetch} = useQuery(GET_BOOKS,{
    fetchPolicy: 'cache-and-network',
    variables,
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.allBooks.pageInfo.hasNextPage
    if (!canFetchMore) {
      return;
    }
    fetchMore({
      variables: {
        after: data.allBooks.pageInfo.endCursor,
        ...variables
      },
    });
  };
 
  return {
    books:data?.allBooks,
    handleFetchMore,
    refetch
  }

};

export default useBooks;