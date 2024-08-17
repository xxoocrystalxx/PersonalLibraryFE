import { useMutation } from '@apollo/client';
import { LOGIN } from '../graphql/mutations';
import { useApolloClient } from '@apollo/client';

const useSignIn = ({setToken}) => {
  const [mutate, result] = useMutation(LOGIN);
  const apolloClient = useApolloClient();
  const login = async ({ username, password }) => {
    // console.log(username,password)
    try {
      const {data} = await mutate({variables: {username, password}});
      setToken(data.login.value)
      localStorage.setItem('library-user-token', data.login.value)
      apolloClient.resetStore();
    } catch (e) {
      console.log('E', e);
      throw e;
    }
  };

  return [login, result];
};

export default useSignIn;