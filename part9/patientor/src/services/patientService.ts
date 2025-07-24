import patients from '../data/patients';
import { NonSsnPatientEntry, Patient } from '../types';

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

export default {
  getNonSsnPatientEntry,
  getPatients
};