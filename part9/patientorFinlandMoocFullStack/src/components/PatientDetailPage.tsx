import { useEffect, useState } from 'react';
import { Patient, Gender, Diagnosis } from '../types';
import { useParams } from 'react-router-dom';
import patientService from '../services/patients';
import { TextField, Box, Typography, List, ListItem } from '@mui/material';
import { apiBaseUrl } from "../constants";
import axios from 'axios';

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
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

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

  useEffect (() => {
    const fetchDiagnoses = async () => {
      const diagnoses = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
      if (!diagnoses) return;
      console.log('diagnoses: ',diagnoses);
      setDiagnoses(diagnoses.data);
    };
    fetchDiagnoses();
  },[]);

return (
  <div>
    <form style={{ marginTop: '20px' }}>
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
      {/* <TextField
        label="Entries"
        fullWidth
        value={JSON.stringify(patientInfo.entries, null, 2)}
        InputProps={{ readOnly: true }}
      /> */}

      <TextField
        label="Gender"
        fullWidth
        value={patientInfo.gender}
        InputProps={{ readOnly: true }}
      />
    </form>

    <div>
      <h3>Entry info:</h3>
      {patientInfo.entries?.map((entry) => {
        return (
          
          <Box key={entry.id} sx={{ mb: 2, p: 2, border: '1px solid black' }}>
            <Typography variant='subtitle1'>{entry.date}&lt;-&gt;{entry.type}</Typography>
            <Typography variant='body2'>Specialist: {entry.specialist}</Typography>
            <Typography variant='body2'>Description: {entry.description}</Typography>
            <Box key={entry.id} sx={{ mb: 2, p: 2, border: '1px solid black' }}>
              {entry.diagnosisCodes && (
              <Typography variant='body2'>
                Diagnoses:
<List>
  {entry.diagnosisCodes.map(code => {
    const diag = diagnoses.find(d => d.code === code);
    return (
      <ListItem key={code} sx={{ pl: 2 }}>
        {`${code} - ${diag ? diag.name : 'Unknown diagnosis'} ${diag ? ' - ' + diag.latin : ''}`} 
      </ListItem>
    );
  })}
</List>
              </Typography>
              )}              
            </Box>

          </Box>
        );
      })}
    </div>
  </div>
);
};

export default PatientDetailPage;


