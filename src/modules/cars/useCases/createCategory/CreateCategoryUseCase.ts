import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequestCategory {
  name: string;
  description: string;
}

class CreateCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  execute({ name, description }: IRequestCategory): void {
    const categoryAlreadyExists = this.categoriesRepository.findByName(name);

    if (categoryAlreadyExists) {
      throw new Error("Category already existis!!");
    }
    this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
