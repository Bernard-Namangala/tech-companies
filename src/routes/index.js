import Router from "express";
import controllers from "../controllers/";
import "core-js/stable";
import "regenerator-runtime/runtime";

const router = Router();

router.get("/", controllers.indexController);
router.post("/create-company", controllers.companiesController.create_company);
router.put(
  "/update-company/:id",
  controllers.companiesController.update_company
);
router.delete(
  "/delete-company/:id",
  controllers.companiesController.delete_company
);
router.get("/list-companies", controllers.companiesController.list_companies);
router.get("/get-company/:id", controllers.companiesController.getCompany);

export default router;
