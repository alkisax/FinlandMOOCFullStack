import express from 'express';
import patientService  from '../services/patientService';
import { Response, Request } from 'express';
import { NonSsnPatientEntry } from "../types";
import { Patient } from '../types';
import toNewPatientEntry from '../utils/utils';
import { z } from 'zod';

const router = express.Router();

router.get ('/', (_req, res: Response<NonSsnPatientEntry[]>) => {
  res.send(patientService.getNonSsnPatientEntry());
});

router.get ('/:id', (req: Request<{ id: string }>, res: Response<Patient | { error: string}> ) => {
    const patient = patientService.findById(req.params.id);
    if (!patient){
      res.status(400).send({ error:'patient not found'});
      return;
    }
    res.status(200).json(patient);  
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