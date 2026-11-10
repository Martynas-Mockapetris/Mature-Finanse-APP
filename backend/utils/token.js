import jsonwebtoken from 'jsonwebtoken';

const { sign, verify } = jsonwebtoken;

const signToken = (user) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is missing from the environment.');
  }

  return sign({ sub: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });
};

const verifyToken = (token) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is missing from the environment.');
  }

  return verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] });
};

export { signToken, verifyToken };
