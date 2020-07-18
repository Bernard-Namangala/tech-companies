import Router from "express";
import controllers from "../controllers";
import "core-js/stable";
import "regenerator-runtime/runtime";

const router = Router();

router.get("/", controllers.indexController);
router.post("/create-company", controllers.companiesController.create_company);

export default router;
