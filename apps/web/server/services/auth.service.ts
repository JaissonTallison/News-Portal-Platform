// apps/web/server/services/auth.service.ts

import { signToken } from "@/lib/jwt";
import { userRepository } from "../repositories/user.repository";
import bcrypt from "bcrypt";

interface RegisterDTO {
  name: string;
  email: string;
  password: string;
}

export async function registerUser(data: RegisterDTO) {
  const existingUser = await userRepository.findByEmail(data.email);

  if (existingUser) {
    throw new Error("Email já cadastrado");
  }

  const passwordHash = await bcrypt.hash(data.password, 12);

  const user = await userRepository.create({
    name: data.name,
    email: data.email,
    passwordHash: passwordHash,
    role: "USER",
  });

  const token = signToken({
    id: user.id,
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

export async function loginUser(email: string, password: string) {
  const user = await userRepository.findByEmail(email);

  if (!user) {
    throw new Error("Credenciais inválidas");
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);

  if (!isValid) {
    throw new Error("Credenciais inválidas");
  }

  const token = signToken({
    id: user.id,
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