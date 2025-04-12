import { signAccessToken, signRefreshToken } from "../common/signJWT.js";
import User from "../models/User.js";
export const registerService = async ({ payload }) => {
  const { username, email, password } = payload;
  const newUser = await User.create({ username, email, password });
  const acesssToken = signAccessToken({ id: newUser._id });
  return { message: "Register successfully !", acesssToken, newUser };
};

export const loginService = async ({ payload }) => {
  const { user } = payload;
  const accessToken = signAccessToken({ id: user._id });
  const refreshToken = signRefreshToken({ id: user._id });
  const userUpdated = await User.findByIdAndUpdate(
    { _id: user._id },
    { refreshToken }
  );
  console.log(userUpdated);
  return { message: "Login successfully !", accessToken, refreshToken };
};
