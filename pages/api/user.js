import jwt from 'jsonwebtoken';

export default async function user(req, res) {
  try {
    if (!req.cookies.token) return res.json({ user: null });
    let token = req.cookies.token;
    let user = jwt.verify(token, process.env.JWT_SECRET);
    user.token = token;
    res.status(200).json({ user });
  } catch (error) {
    res.status(200).json({ user: null });
  }
}
