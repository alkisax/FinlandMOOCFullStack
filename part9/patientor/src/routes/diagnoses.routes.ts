import express from 'express';
import diagnosesController from '../services/diagnoses.controller';

const router = express.Router();

router.get ('/', diagnosesController.getAllDiagnoses);

export default router;