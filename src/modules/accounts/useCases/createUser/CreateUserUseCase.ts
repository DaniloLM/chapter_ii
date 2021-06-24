import { inject, injectable } from "tsyringe";
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
    await this.userRepository.create({
      name,
      password,
      driver_license,
      email,
    });
  }
}

export { CreateUserUseCase };
