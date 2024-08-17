import { useMutation } from '@apollo/client'
import { EDIT_BOOK } from '../graphql/mutations'

const useEditBook = () => {
  const [mutate, result] = useMutation(EDIT_BOOK)

  const editBook = async ({
    id,
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
        id,
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

  return [editBook, result]
}

export default useEditBook
