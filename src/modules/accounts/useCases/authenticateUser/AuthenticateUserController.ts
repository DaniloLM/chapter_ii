import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);
    const authenticateData = await authenticateUserUseCase.execute({
      email,
      password,
    });

    return response.json(authenticateData);
  }
}

export { AuthenticateUserController };
