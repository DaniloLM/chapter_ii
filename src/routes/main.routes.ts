import { Router } from "express";
import { v4 as uuidV4 } from "uuid";

const mainRoute = Router();

mainRoute.get("/main", (request, response) => {
  return response.status(200).send("Hello World!!");
});

export { mainRoute };
