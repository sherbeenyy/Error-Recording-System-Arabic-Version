const express = require('express');
const router = express.Router();
const { renderForm, submitForm } = require('../controllers/formController');
//const {renderDetailedAnalysisPage , compareMachines} = require('../controllers/analysisController');
const {viewData, downloadExcel,deleteRecord} = require('../controllers/viewController');

router.get('/', renderForm);
//router.post('/submit', handleFormSubmit);
//router.get('/analysis', renderDetailedAnalysisPage);
//router.get('/compare', compareMachines);
router.get('/view', viewData);
router.post('/submit',submitForm);
router.get('/download-excel', downloadExcel);
router.post('/delete/:index', deleteRecord); 

module.exports = router;
