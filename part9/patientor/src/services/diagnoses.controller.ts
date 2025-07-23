import diagnoses from '../data/diagnoses';
import { Diagnosis } from '../types';
import { Request, Response } from 'express';

const getAllDiagnoses = (_req: Request, res: Response<Diagnosis[]>): void => {
  res.json(diagnoses);
};

export default {
  getAllDiagnoses,
};