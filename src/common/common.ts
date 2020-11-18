import jwt from 'jsonwebtoken';

export const authorize = async (token: string): Promise<boolean> => {
  let isAuth = false;

  const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
  if (decoded) {
    isAuth = true;
  }

  return isAuth;
};
