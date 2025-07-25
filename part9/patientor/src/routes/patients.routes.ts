import express from 'express';
import patientService  from '../services/patientService';
import { Response } from 'express';
import { NonSsnPatientEntry } from "../types";
import toNewPatientEntry from '../utils/utils';

const router = express.Router();

router.get ('/', (_req, res: Response<NonSsnPatientEntry[]>) => {
  res.send(patientService.getNonSsnPatientEntry());
});


router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);

    const addedEntry = patientService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;