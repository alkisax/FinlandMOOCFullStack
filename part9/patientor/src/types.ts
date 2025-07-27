export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
};

export enum Gender {
  Other = 'other',
  They = 'they',
  Female = 'female',
  Male = 'male'
}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {
}

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[]
};

export type NonSsnPatientEntry= Omit<Patient, 'ssn' | 'entries'>;
export type NewPatientEntry = Omit<Patient, 'id' | 'entries'>;


