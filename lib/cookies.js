import { serialize } from 'cookie';

const TOKEN_NAME = 'token';
const MAX_AGE = 60 * 60 * 24 * process.env.SESSION_LENGTH_IN_DAYS;

export function setTokenCookie(res, token) {
  const cookie = serialize(TOKEN_NAME, token, {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // if true, cookie will only be set if https (won't be set if http)
    path: '/',
    sameSite: 'lax',
  });
  res.setHeader('Set-Cookie', cookie);
}

export function removeTokenCookie(res) {
  const cookie = serialize(TOKEN_NAME, '', {
    maxAge: -1,
    path: '/',
  });

  res.setHeader('Set-Cookie', cookie);
}
