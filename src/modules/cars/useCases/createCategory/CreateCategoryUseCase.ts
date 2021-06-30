import { inject, injectable } from "tsyringe";
import { CustomError } from "../../../../errors/CustomError";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequestCategory {
  name: string;
  description: string;
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute({ name, description }: IRequestCategory): Promise<void> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name
    );

    if (categoryAlreadyExists) {
      throw new CustomError("Category already existis!!");
    }
    this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
