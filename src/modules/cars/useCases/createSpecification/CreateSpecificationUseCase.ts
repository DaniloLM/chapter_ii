import { ISpecificationRepository } from "../../repositories/ISpecificationRepository";

interface IRequestSpecification {
  name: string;
  description: string;
}

class CreateSpecificationUseCase {
  constructor(private specificationsRepository: ISpecificationRepository) {}

  execute({ name, description }: IRequestSpecification): void {
    const specificationAlreadyExists =
      this.specificationsRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new Error("Specification already existis!!");
    }
    this.specificationsRepository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };
