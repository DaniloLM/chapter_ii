import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { CustomError } from "../errors/CustomError";
import { UserRepository } from "../modules/accounts/repositories/implementations/UserRepository";

interface IPayloadAuthenticate {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new CustomError("Token missing!!", 401);
  }

  const [, token] = authHeader.split(" ");
  try {
    const { sub: user_id } = verify(token, "lis") as IPayloadAuthenticate;
    const userRepository = new UserRepository();

    const user = userRepository.findById(user_id);

    if (!user) {
      throw new CustomError("User does not exists!!", 401);
    }

    next();
  } catch {
    throw new CustomError("Invalid token!!", 401);
  }
}
