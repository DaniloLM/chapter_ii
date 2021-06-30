import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";
import { CustomError } from "../../../../errors/CustomError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUserRepository } from "../../repositories/IUserRepository";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute({
    name,
    password,
    driver_license,
    email,
  }: ICreateUserDTO): Promise<void> {
    const userEmailAlreadyExists = await this.userRepository.findByEmail(email);

    if (userEmailAlreadyExists) {
      throw new CustomError("User already exists!!");
    }
    const hashPassword = await hash(password, 2);

    await this.userRepository.create({
      name,
      password: hashPassword,
      driver_license,
      email,
    });
  }
}

export { CreateUserUseCase };
