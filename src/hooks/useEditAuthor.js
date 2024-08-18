import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR } from '../graphql/mutations'

const useEditAuthor = () => {
  const [mutate, result] = useMutation(EDIT_AUTHOR)

  const editAuthor = async ({ id, name }) => {
    await mutate({
      variables: {
        id,
        name,
      },
    })
  }

  return [editAuthor, result]
}

export default useEditAuthor
