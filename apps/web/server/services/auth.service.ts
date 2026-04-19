import { hashPassword, comparePassword } from "@/lib/hash";
import {
  createUser,
  findUserByEmail,
} from "../repositories/user.repository";
import { signToken } from "@/lib/jwt";

export async function registerUser(
  name: string,
  email: string,
  password: string
) {
  const userExists = await findUserByEmail(email);

  if (userExists) {
    throw new Error("Usuário já existe");
  }

  const passwordHash = await hashPassword(password);

  const user = await createUser({
    name,
    email,
    passwordHash,
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}

export async function loginUser(email: string, password: string) {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new Error("Credenciais inválidas");
  }

  const isValid = await comparePassword(
    password,
    user.passwordHash
  );

  if (!isValid) {
    throw new Error("Credenciais inválidas");
  }

  //  TOKEN CORRETO
  const token = signToken({
    userId: user.id,
    role: user.role,
  });

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  };
}