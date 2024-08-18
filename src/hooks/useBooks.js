import { useQuery } from '@apollo/client'
import { GET_BOOKS } from '../graphql/queries'

const useBooks = (variables) => {
  // const [books,setBooks]=useState()
  const { loading, data, fetchMore, refetch, error } = useQuery(GET_BOOKS, {
    fetchPolicy: 'cache-and-network',
    variables,
  })

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.allBooks.pageInfo.hasNextPage
    if (!canFetchMore) {
      return
    }
    fetchMore({
      variables: {
        after: data.allBooks.pageInfo.endCursor,
        ...variables,
      },
    })
  }

  if (error) {
    console.log('query error')
    console.log(error)
    console.log(error.graphQLErrors[0].message)
  }

  return {
    booksCursor: data?.allBooks,
    handleFetchMore,
    refetch,
    error,
  }
}

export default useBooks
