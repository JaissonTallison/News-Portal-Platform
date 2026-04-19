import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;

export type TokenPayload = {
  id: string;
  role: string;
};

export function signToken(payload: TokenPayload) {
  return jwt.sign(payload, SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, SECRET) as TokenPayload;
  } catch {
    return null;
  }
}