import jwt from "jsonwebtoken";

export const generateToken = (userID: string): string => {
  const payload = { id: userID };
  const token = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRE! as any, //use any to match the type we can avoid by create a env.d.ts
  });
  return token;
};
