import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { CustomError } from "../../../../errors/CustomError";
import { IUserRepository } from "../../repositories/IUserRepository";

interface IRequestAuthentication {
  email: string;
  password: string;
}

interface IResponseAuthentication {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute({
    email,
    password,
  }: IRequestAuthentication): Promise<IResponseAuthentication> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new CustomError("Email or password incorrect!!", 401);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new CustomError("Email or password incorrect!!", 401);
    }

    const token = sign({}, "lis", {
      subject: user.id,
      expiresIn: "1d",
    });

    const tokenReturn: IResponseAuthentication = {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    };

    return tokenReturn;
  }
}

export { AuthenticateUserUseCase };
