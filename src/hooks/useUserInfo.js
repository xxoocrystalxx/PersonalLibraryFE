import {useQuery } from '@apollo/client';
import { USER_INFO } from '../graphql/queries';

const useUserInfo = () => {

  const { data, loading, } = useQuery(USER_INFO,);

  return {
    data: data?.me,
    loading,
  };

};

export default useUserInfo;