import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';

const SIGN_OUT_MUTATION = gql`
  mutation {
    endSession
  }
`;

export default function SignOut() {
  const [signout, { loading, error }] = useMutation(SIGN_OUT_MUTATION, {
    // SO THAT IT GETS RE-RENDER AND WE CAN GET SIGNOUT WITH THE NAV AND ALL
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  return (
    <>
      <button type="button" onClick={() => signout()}>
        Sign Out
      </button>
    </>
  );
}
