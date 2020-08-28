import Router from 'express';
import controllers from '../controllers';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const router = Router();
const { companiesController } = controllers;
const {
	createCompany,
	updateCompany,
	deleteCompany,
	listCompanies,
	getCompany,
} = companiesController;

router.get('/', controllers.indexController);

router.post('/create-company', createCompany);

router.put('/update-company/:id', updateCompany);

router.delete('/delete-company/:id', deleteCompany);

router.get('/list-companies', listCompanies);

router.get('/get-company/:id', getCompany);

export default router;
