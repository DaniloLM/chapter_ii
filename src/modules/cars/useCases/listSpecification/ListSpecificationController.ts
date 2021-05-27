import { Request, Response } from "express";
import { ListSpecificationUseCase } from "./ListSpecificationUseCase";

class ListSpecificationController {
  constructor(private listSpecificationUseCase: ListSpecificationUseCase) {}

  handle(request: Request, response: Response) {
    return response.json(this.listSpecificationUseCase.execute());
  }
}

export { ListSpecificationController };
