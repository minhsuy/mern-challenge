import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();
export const verifyToken = ({
  token,
  privateKey = process.env.ACCESS_TOKEN_SECRECT,
  options,
}) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, privateKey, options, (err, decoded) => {
      if (err) reject(err);
      else resolve(decoded);
    });
  });
};
