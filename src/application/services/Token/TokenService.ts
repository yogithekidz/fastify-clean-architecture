// src/application/service/auth/TokenService.ts
import jwt from 'jsonwebtoken';
import { RefreshTokenPayload } from '@domain/model/request/tokenRequestDto';

const JWT_SECRET = process.env.JWT_SECRET || 'access';
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh';

export function generateAccessToken(payload: RefreshTokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
}

export function generateRefreshToken(payload: RefreshTokenPayload): string {
  return jwt.sign(payload, REFRESH_SECRET, { expiresIn: '7d' });
}

export function verifyRefreshToken(token: string): RefreshTokenPayload {
  return jwt.verify(token, REFRESH_SECRET) as RefreshTokenPayload;
}
