import { useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import { magic } from '../lib/magic';
import Loading from '../components/loading';

const Callback = () => {
  const router = useRouter();

  // The redirect contains a `provider` query param if the user is logging in with a social provider
  useEffect(() => {
    router.query.provider ? finishSocialLogin() : finishEmailRedirectLogin();
  }, [router.query]);

  // `getRedirectResult()` returns an object with user data from Magic and the social provider
  const finishSocialLogin = async () => {
    magic.oauth.getRedirectResult().then((result) => authenticateWithServer(result.magic.idToken));
  };

  // `loginWithCredential()` returns a didToken for the user logging in
  const finishEmailRedirectLogin = () => {
    if (router.query.magic_credential)
      magic.auth.loginWithCredential().then((didToken) => authenticateWithServer(didToken));
  };

  // Send token to server to validate
  const authenticateWithServer = async (didToken) => {
    let res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + didToken,
      },
    });
    res.status === 200 && Router.push('/');
  };

  return <Loading />;
};

export default Callback;
