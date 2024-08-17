import { useMutation } from '@apollo/client'
import { SIGN_UP } from '../graphql/mutations'

const useSignUp = () => {
  const [mutate, result] = useMutation(SIGN_UP)

  const signUp = async ({ username, password }) => {
    // console.log(username,password)
    await mutate({ variables: { username, passwordHash: password } })
  }

  return [signUp, result]
}

export default useSignUp
