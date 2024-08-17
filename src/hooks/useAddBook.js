import { useMutation } from '@apollo/client'
import { CREATE_BOOK } from '../graphql/mutations'

const useAddBook = () => {
  const [mutate, result] = useMutation(CREATE_BOOK)

  const addBook = async ({
    title,
    author,
    male,
    female,
    description,
    comment,
    time,
    rating,
    genres,
    saved,
  }) => {
    await mutate({
      variables: {
        title,
        author,
        male,
        female,
        description,
        comment,
        time,
        rating,
        genres,
        saved,
      },
    })
  }

  return [addBook, result]
}

export default useAddBook
