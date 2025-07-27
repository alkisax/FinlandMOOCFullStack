import { Patient } from '../types';
import toNewPatientEntry from '../utils/utils';

const data = [
    {
        "id": "d2773336-f723-11e9-8f0b-362b9e155667",
        "name": "John McClane",
        "dateOfBirth": "1986-07-09",
        "ssn": "090786-122X",
        "gender": "male",
        "occupation": "New york city cop",
        "entries": []
    },
    {
        "id": "d2773598-f723-11e9-8f0b-362b9e155667",
        "name": "Martin Riggs",
        "dateOfBirth": "1979-01-30",
        "ssn": "300179-77A",
        "gender": "male",
        "occupation": "Cop",
        "entries": []
    },
    {
        "id": "d27736ec-f723-11e9-8f0b-362b9e155667",
        "name": "Hans Gruber",
        "dateOfBirth": "1970-04-25",
        "ssn": "250470-555L",
        "gender": "other",
        "occupation": "Technician",
        "entries": []
    },
    {
        "id": "d2773822-f723-11e9-8f0b-362b9e155667",
        "name": "Dana Scully",
        "dateOfBirth": "1974-01-05",
        "ssn": "050174-432N",
        "gender": "female",
        "occupation": "Forensic Pathologist",
        "entries": []
    },
    {
        "id": "d2773c6e-f723-11e9-8f0b-362b9e155667",
        "name": "Matti Luukkainen",
        "dateOfBirth": "1971-04-09",
        "ssn": "090471-8890",
        "gender": "male",
        "occupation": "Digital evangelist",
        "entries": []
    }
];

// const patients: Patient[] = data.map(obj => {
//   const object = toNewPatientEntry(obj) as Patient;
//   object.id = obj.id;
//   return object;
// });

const patients: Patient[] = data.map(obj => {
  const validated = toNewPatientEntry(obj);
  const patient: Patient = {
    id: obj.id,
    ...validated,
    entries: obj.entries ?? [] // ensure entries exist
  };
  return patient;
});


export default patients;


/*
i make a util tha asserts that the incomming object from the front is correctly typed

among this there is gender
ths takes a string param and checks if my param is included in the gender enum
const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param);
};

and this my Gender enum in types.ts
export enum Gender {
  Other = 'other',
  They = 'they',
  Female = 'female',
  Male = 'male'
}

this func is called in the parsedGender wich takes an unkown gender from the params and asserts that it exists and that it is realy of Gender type
const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
      throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};
 then util takes this validator and all the other params validators and  returns an object of type NewPatientEntry (wich is type Patient but without the id wich will be added later in the router file)

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }
  
  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object)  {
    const newPatient: NewPatientEntry = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation)
    };
    return newPatient;    
  }
throw new Error('Incorrect data: some fields are missing');
};

This toNewPatientEntry takes an object type unkown, from the client request, wich as it comes from front we can not be sure that its the correct type and asserts that its a patient without id AKA NewPatientEntry

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
};
export type NewPatientEntry = Omit<Patient, 'id'>;

this now creates a new problem. Since we changed our types from gender: string; to gender: Gender; now we have a problem accessing our data

import { Patient } from '../types';

// this : Patient[] was a huge problem
//const patientEntries: Patient[] = [

const patientEntries: Patient[] = [
    {
        "id": "d2773336-f723-11e9-8f0b-362b9e155667",
        "name": "John McClane",
        "dateOfBirth": "1986-07-09",
        "ssn": "090786-122X",
        "gender": "male",
        "occupation": "New york city cop"
    },
...
];

export default patientEntries;

 following the lesson we rename patientEntries to data

add a new function wich takes each entry of our patientEntries (data.map(obj=>{}) and passes this entrie through our toNewPatientEntry (wich inputs unkown/whatever/Patient and outputs NewPatientEntry) so as to remove the id

then here because my new obj is NewPatientEntry and has no id, i reasign the id to make it back to Patient type, this time type checked
object.id = obj.id;

and then returns this instead of our initial patientEntry

const patients: Patient[] = data.map(obj => {
  const object = toNewPatientEntry(obj) as Patient;
  object.id = obj.id;
  return object;
});

export default patients;

now i will move to routes and service part that will create the end point and the push to data functionality

import patients from '../data/patients';
import { NonSsnPatientEntry, Patient, NewPatientEntry } from '../types';
import { v1 as uuid } from 'uuid';
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
*/

