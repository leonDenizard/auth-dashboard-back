// src/modules/auth/auth.service.ts
import { User } from "../models/user.model";
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";

export class AuthService {
  async login(username: string, password: string) {
    const user = await User.findOne({ username });

    if (!user) {
      const error = new Error("Usuário não encontrado");
      (error as any).statusCode = 401;
      throw error;
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      const error = new Error("Credenciais inválidas");
      (error as any).statusCode = 401;
      throw error;
    }

    const payload = { id: user.id, username: user.username };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    // (futuramente salva o refreshToken no banco)
    return {
      message: "Login realizado com sucesso",
      accessToken,
      refreshToken,
      user: { id: user.id, username: user.username, email: user.email },
    };
  }

  async getUserById(id: string) {
    return User.findById(id).select("-password");
  }

  async getUserByEmail(email: string) {
    return User.findOne({email}).select("-password")
  }
  async getUserByUsername(username: string) {
    return User.findOne({username}).select("-password")
  }

  async changePassword(email: string, username: string, newPassword: string) {
    const user = await User.findOne({email, username})

    if(!user){

      const error = new Error("Usuário não encontrado");
      (error as any).statusCode = 401;
      throw error;
    }

    user.password = newPassword
    await user.save()

    return{
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email
      }
    }
  }

}
