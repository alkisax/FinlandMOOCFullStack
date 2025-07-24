import express from 'express';
import patientService  from '../services/patientService';
import { Response } from 'express';
import { NonSsnPatientEntry } from "../types";

const router = express.Router();

router.get ('/', (_req, res: Response<NonSsnPatientEntry[]>) => {
  res.send(patientService.getNonSsnPatientEntry());
});

export default router;