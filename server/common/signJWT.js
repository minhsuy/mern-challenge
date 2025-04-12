import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { TOKEN_TYPE } from "../enum/tokenType.js";
dotenv.config();
export const signAccessToken = ({ id, role = "user", privateKey }) => {
  const accessToken = jwt.sign(
    { id, role, tokenType: TOKEN_TYPE.ACCESS_TOKEN },
    (privateKey = process.env.ACCESS_TOKEN_SECRECT),
    {
      expiresIn: "1h",
    }
  );
  return accessToken;
};

/*******  46e71765-cc74-4145-a8c9-677a71444249  *******/ export const signRefreshToken =
  ({ id, privateKey }) => {
    const refreshToken = jwt.sign(
      { id, tokenType: TOKEN_TYPE.REFRESH_TOKEN },
      (privateKey = process.env.REFRESH_TOKEN_SECRECT),
      {
        expiresIn: "7d",
      }
    );
    return refreshToken;
  };
