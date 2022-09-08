import Router from 'next/router';
import { useState, useEffect } from 'react';
import { magic } from '../lib/magic';
import { useUser } from '../lib/hooks';
import { Input, Icon, MonochromeIcons, CallToAction } from '@magiclabs/ui';

const Login = () => {
  const user = useUser();
  const [email, setEmail] = useState('');
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (user?.issuer) Router.push('/profile');
  }, [user]);

  const validateWithServer = async (didToken) => {
    return await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + didToken,
      },
    });
  }

  async function handleLoginWithEmail(e) {
    try {
      e.preventDefault();
      if (!email) return;
      setDisabled(true);
      const didToken = await magic.auth.loginWithEmailOTP({ email });
      const res = await validateWithServer(didToken)
      res.status === 200 && Router.push('/');
    } catch (error) {
      setDisabled(false);
      console.log(error);
    }
  }

  return (
    <div className='login'>
      <form onSubmit={handleLoginWithEmail}>
        <h3 className='form-header'>Login</h3>
        <div className='input-wrapper'>
          <Input
            placeholder='Enter your email'
            size='sm'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            prefix={<Icon inline type={MonochromeIcons.Envelope} size={22} />}
          />
        </div>
        <div>
          <CallToAction
            color='primary'
            size='sm'
            disabled={disabled}
            onClick={handleLoginWithEmail}
          >
            Send Email OTP
          </CallToAction>
        </div>
      </form>
      <style jsx>{`
        .login {
          max-width: 20rem;
          margin: 40px auto 0;
          padding: 1rem;
          border: 1px solid #dfe1e5;
          border-radius: 4px;
          text-align: center;
          box-shadow: 0px 0px 6px 6px #f7f7f7;
          box-sizing: border-box;
        }
        form {
          padding-bottom: 40px;
        }
        form,
        label {
          display: flex;
          flex-flow: column;
          text-align: center;
        }
        .form-header {
          font-size: 22px;
          margin: 25px 0;
        }
        .input-wrapper {
          width: 75%;
          margin: 0 auto 20px;
        }
      `}</style>
    </div>
  );
};

export default Login;
