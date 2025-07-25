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

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
};

export type NonSsnPatientEntry= Omit<Patient, 'ssn'>;
export type NewPatientEntry = Omit<Patient, 'id'>;


