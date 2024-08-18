import { useQuery } from '@apollo/client'
import { GET_AUTHORS_SYMPLY } from '../graphql/queries'

const useAuthorsSimply = () => {
  const { data, loading } = useQuery(GET_AUTHORS_SYMPLY)

  return {
    authors: data?.allAuthorSimply,
    loading,
  }
}

export default useAuthorsSimply
