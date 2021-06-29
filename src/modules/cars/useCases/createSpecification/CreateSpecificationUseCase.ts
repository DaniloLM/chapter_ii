import { inject, injectable } from "tsyringe";
import { CustomError } from "../../../../errors/CustomError";
import { ISpecificationRepository } from "../../repositories/ISpecificationRepository";

interface IRequestSpecification {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationRepository")
    private specificationsRepository: ISpecificationRepository
  ) {}

  async execute({ name, description }: IRequestSpecification): Promise<void> {
    const specificationAlreadyExists =
      await this.specificationsRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new CustomError("Specification already existis!!");
    }
    await this.specificationsRepository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };
