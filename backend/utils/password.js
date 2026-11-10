import { hash, compare } from 'bcryptjs';

const hashPassword = async (password) => {
  if (typeof password !== 'string' || password.length === 0) {
    throw new Error('Password must be a non-empty string.');
  }

  if (Buffer.byteLength(password, 'utf8') > 72) {
    throw new Error('Password must be at most 72 UTF-8 bytes.');
  }

  return hash(password, 12);
};

const verifyPassword = async (password, passwordHash) => {
  if (typeof password !== 'string' || typeof passwordHash !== 'string') {
    return false;
  }

  return compare(password, passwordHash);
};

export { hashPassword, verifyPassword };
