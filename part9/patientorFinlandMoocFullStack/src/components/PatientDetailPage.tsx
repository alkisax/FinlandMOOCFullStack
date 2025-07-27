import { useEffect, useState } from 'react';
import { Patient, Gender } from '../types';
import { useParams } from 'react-router-dom';
import patientService from '../services/patients';
import { TextField, InputLabel, Select, MenuItem } from '@mui/material';


type Params = {
  id: string;
};

const PatientDetailPage = () => {
  const { id } = useParams<Params>();
  const [patientInfo, setPatientInfo] = useState<Patient>({
      id: '',
      name: '',
      occupation: '',
      gender: Gender.Other,
      ssn: '',
      dateOfBirth: '',
      entries: []
  });

  useEffect(() => {
    if (!id) return;
    const fetchPatient = async () => {
      try {
        const response = await patientService.getById(id);
        setPatientInfo(response.data);
      } catch (e) {
        console.error('Failed to fetch patient:', e);
        // optionally set error state here or navigate back
      }
    };
    fetchPatient();
  },[id]);

  // const patient = (): Patient => {
  //   let patient = patients.find((patient) => id === patient.id);
  //   if (!patient) {
  //     patient = {
  //     id: '',
  //     name: 'Unknown',
  //     occupation: '',
  //     gender: Gender.Other,
  //     ssn: '',
  //     dateOfBirth: '',
  //     entries: []
  //     };
  //     return patient;
  //   }
  //   return patient;
  // };

return (
  <div>
    <form>
      <TextField
        label="Name"
        fullWidth
        value={patientInfo.name}
        InputProps={{ readOnly: true }}
      />
      <TextField
        label="Social security number"
        fullWidth
        value={patientInfo.ssn}
        InputProps={{ readOnly: true }}
      />
      <TextField
        label="Date of birth"
        fullWidth
        value={patientInfo.dateOfBirth}
        InputProps={{ readOnly: true }}
      />
      <TextField
        label="Occupation"
        fullWidth
        value={patientInfo.occupation}
        InputProps={{ readOnly: true }}
      />

      <InputLabel style={{ marginTop: 20 }}>Gender</InputLabel>
      <Select
        fullWidth
        value={patientInfo.gender}
        disabled
      >
        <MenuItem value={Gender.Male}>Male</MenuItem>
        <MenuItem value={Gender.Female}>Female</MenuItem>
        <MenuItem value={Gender.Other}>Other</MenuItem>
      </Select>
    </form>
  </div>
);
};

export default PatientDetailPage;