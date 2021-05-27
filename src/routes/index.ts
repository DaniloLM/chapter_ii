import { Router } from "express";
import { categoriesRoutes } from "./categories.routes";
import { mainRoute } from "./main.routes";
import { specificationsRoutes } from "./specifications.routes";

const router = Router();

router.use(mainRoute);
router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationsRoutes);

export { router };
