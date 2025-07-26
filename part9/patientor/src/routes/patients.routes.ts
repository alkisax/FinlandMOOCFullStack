import express from 'express';
import patientService  from '../services/patientService';
import { Response } from 'express';
import { NonSsnPatientEntry } from "../types";
import toNewPatientEntry from '../utils/utils';
import { z } from 'zod';

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
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: 'unknown error' });
    }
  }
});

export default router;