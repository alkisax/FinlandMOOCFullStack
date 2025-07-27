import { NewPatientEntry } from '../types';
import { newEntrySchema } from '../schema/zodSchema';


const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  return newEntrySchema.parse(object);
};

export default toNewPatientEntry;

