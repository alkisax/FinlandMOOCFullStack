import patients from '../data/patients';
import { NonSsnPatientEntry, Patient, NewPatientEntry } from '../types';
import { v1 as uuid } from 'uuid';

const getNonSsnPatientEntry = (): NonSsnPatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const getPatients = (): Patient[] => {
  return patients;
};

const addPatient = ( entry: NewPatientEntry ): Patient => {
  const id = uuid();
  const newPatientEntry = {
    id,
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getNonSsnPatientEntry,
  getPatients,
  addPatient
};