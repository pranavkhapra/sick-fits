import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import DisplayError from './DisplayError';

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    #   if this is succesfull it will send null and fuck off thats weird
    sendUserPasswordResetLink(email: $email) {
      code
      message
    }
  }
`;
export default function RequestReset() {
  const { handleChange, inputs, resetForm } = useForm({
    email: '',
  });
  const [reset, { data, loading, error }] = useMutation(
    REQUEST_RESET_MUTATION,
    {
      variables: inputs,
    }
  );
  async function handleFormSubmit(event) {
    event.preventDefault();
    // send the email to the graphql api
    await reset();
    // console.log(response);
    resetForm();
  }

  return (
    <Form method="POST" onSubmit={handleFormSubmit}>
      <h2>Request a Password Request</h2>
      <DisplayError error={error} />
      <fieldset>
        {data?.sendUserPasswordResetLink === null && (
          <p>Success! Check your email for a link!</p>
        )}
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="Your Email Address"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Request Reset</button>
      </fieldset>
    </Form>
  );
}
