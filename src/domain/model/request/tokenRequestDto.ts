// import { JwtPayload } from "jsonwebtoken";

export type RefreshTokenRequestDto = {
  username: string;
  password: string;
  refreshToken: string;
};

export type RefreshTokenPayload = {
  id: number;
  username: string;
};