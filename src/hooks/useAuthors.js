import { useQuery } from '@apollo/client'
import { GET_AUTHORS } from '../graphql/queries'

const useAuthors = (variables) => {
  const { data, loading, fetchMore, refetch, error } = useQuery(GET_AUTHORS, {
    fetchPolicy: 'cache-and-network',
    variables,
  })

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.allAuthors.pageInfo.hasNextPage

    if (!canFetchMore) {
      return
    }

    fetchMore({
      variables: {
        after: data.allAuthors.pageInfo.endCursor,
        ...variables,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return previousResult

        return {
          allAuthors: {
            __typename: previousResult.allAuthors.__typename,
            edges: [
              ...previousResult.allAuthors.edges,
              ...fetchMoreResult.allAuthors.edges,
            ],
            pageInfo: fetchMoreResult.allAuthors.pageInfo,
            totalCount: fetchMoreResult.allAuthors.totalCount,
          },
        }
      },
    })
  }

  return {
    authorsCursor: data?.allAuthors,
    loading,
    handleFetchMore,
    refetch,
    error,
  }
}

export default useAuthors
