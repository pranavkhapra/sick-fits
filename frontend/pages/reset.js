/* eslint-disable react/prop-types */
import RequestReset from '../components/RequestReset';
import Reset from '../components/Reset';
// so now basically when you go to requestRest component and request a password it will get you a token and from there we will have to send the user an email having a link with token in the url of it
// so now when we send token in url the user or the reset page can grab the token and use it in ht reset component where we reset the password having the token there as a mutation value
// we just left to  send the token url through email

export default function ResetPage({ query }) {
  if (!query?.token) {
    return (
      <div>
        <p>Sorry you must supply a token</p>
        {/* //where we request to get the token there */}
        <RequestReset />
      </div>
    );
  }
  return (
    <div>
      <p>RESET YOUR PASSWORD</p>
      {/* //where we actually change the password and all */}
      <Reset token={query.token} />
    </div>
  );
}
