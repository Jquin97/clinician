import { QueryClient, QueryClientProvider } from 'react-query';
import API_URLS, { protectedapiClient } from '../config/apiConfig';
const queryClient = new QueryClient({});
function QueryProvider({ children }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

const getPatients = () => {
  return protectedapiClient.get('/patient');
};
const getPatientsByName = (name) => {
  return protectedapiClient.get(`/patient/search/${name}`);
};

const createPatient = (data) => {
  return protectedapiClient.post('/patient', data);
};

const deletePatient = (id) => {
  return protectedapiClient.delete(`/patient/${id}`);
};

const getPatientByID = (id) => {
  return protectedapiClient.get(`/patient/${id}`);
};

const editPatientByID = (data) => {
  return protectedapiClient.put(`/patient/${data.id}`, data);
};

// Scan Results
const getScanResults = (patientId) => {
  return protectedapiClient.get(`/scans/${patientId}`);
};

const addScanResults = (patientId, formData) => {
  return fetch(`${API_URLS.SCAN_RESULT}/${patientId}`, {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: JSON.parse(localStorage.getItem('userData'))?.token,
    },
  });
};

const deleteScanResults = (id) => {
  return protectedapiClient.delete(`/scans/${id}`);
};

export {
  getPatients,
  getPatientByID,
  createPatient,
  deletePatient,
  editPatientByID,
  getScanResults,
  addScanResults,
  deleteScanResults,
  getPatientsByName,
};

export default QueryProvider;
