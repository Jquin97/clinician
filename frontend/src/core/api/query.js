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
  return protectedapiClient.delete(`/scans/entry/${id}`);
};

// Test Results
const getTestResults = (patientId) => {
  return protectedapiClient.get(`/test/${patientId}`);
};
const getSingleTestResult = (id) => {
  return protectedapiClient.get(`/test/entry/${id}`);
};
const updateSingleTestResult = (id, data) => {
  return protectedapiClient.put(`/test/entry/${id}`, data);
};
const addTestResults = (patientId, data) => {
  return protectedapiClient.post(`/test/${patientId}`, data);
};
const deleteTestResults = (id) => {
  return protectedapiClient.delete(`/test/entry/${id}`);
};

// Medication
const getMedications = (patientId) => {
  return protectedapiClient.get(`/medication/${patientId}`);
};
const getSingleMedication = (id) => {
  return protectedapiClient.get(`/medication/entry/${id}`);
};
const updateSingleMedication = (id, data) => {
  return protectedapiClient.put(`/medication/entry/${id}`, data);
};
const addMedications = (patientId, data) => {
  return protectedapiClient.post(`/medication/${patientId}`, data);
};
const deleteMedications = (id) => {
  return protectedapiClient.delete(`/medication/entry/${id}`);
};

// Appointment
const getAppointments = (patientId) => {
  return protectedapiClient.get(`/appointment/${patientId}`);
};
const getSingleAppointment = (id) => {
  return protectedapiClient.get(`/appointment/entry/${id}`);
};
const updateSingleAppointment = (id, data) => {
  return protectedapiClient.put(`/appointment/entry/${id}`, data);
};
const addAppointments = (patientId, data) => {
  return protectedapiClient.post(`/appointment/${patientId}`, data);
};
const deleteAppointments = (id) => {
  return protectedapiClient.delete(`/appointment/entry/${id}`);
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
  getTestResults,
  getSingleTestResult,
  addTestResults,
  updateSingleTestResult,
  deleteTestResults,
  getMedications,
  getSingleMedication,
  updateSingleMedication,
  addMedications,
  deleteMedications,
  getAppointments,
  getSingleAppointment,
  updateSingleAppointment,
  addAppointments,
  deleteAppointments,
};

export default QueryProvider;
