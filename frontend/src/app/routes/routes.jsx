import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from '../pages/auth/login';
import ForgotPassword from '../pages/auth/forgotPassword/forgotPassword';
import { AuthProvider } from '../../core/contextApi/authContext';
import ProtectedRoute from './protectedRoutes'; // Import the ProtectedRoute component
import GlobalProvider from '../../core/contextApi/globalContext';
import ResetPassword from '../pages/auth/resetPassword/resetPassword';
import PatientLists from '../pages/patient/PatientLists';
import Home from '../pages/home';
import AddPatient from '../pages/patient/AddPatient';
import QueryProvider from '../../core/api/query';
import PatientDetails from '../pages/patientDetails/patientDetails';
import PatientAction from '../pages/patientAction/patientAction';
import Appointment from '../pages/appointment/appointment';
import TestResult from '../pages/testResult/testResult';
import ScanResult from '../pages/scanResult/scanResult';
import TestResultEdit from '../pages/testResult/testResultEdit';
import PatientMedication from '../pages/medication/PatientMedication';
import PatientMedicationEdit from '../pages/medication/PatientMedicationEdit';
import PublicRoutes from './publicRoutes';

const RouteConfig = () => {

  return (
    <QueryProvider>
      <AuthProvider>
        <GlobalProvider>
          <Router>
            <Routes>
              <Route path="*" element={ <PublicRoutes element={<Login />}/>} />
              <Route path="/login" element={ <PublicRoutes element={<Login />}/>} />
              <Route path="/forgotPassword" element={ <PublicRoutes element={<ForgotPassword />}/>} />
              <Route path="/resetPassword/:token?" element={ <PublicRoutes element={<ResetPassword />}/>} />
              <Route
                exact
                path="/dashboard"
                element={<ProtectedRoute element={<Home />} />}></Route>
              <Route exact path="/dashboard/patients" element={<PatientLists />} />
              <Route exact path="/dashboard/add-patient" element={<AddPatient />} />
              <Route
                exact
                path="/dashboard/patients/:id/"
                element={<ProtectedRoute element={<PatientDetails />} />}></Route>
              <Route
                exact
                path="/dashboard/patients/:id/details"
                element={<ProtectedRoute element={<PatientDetails />} />}></Route>
              <Route
                exact
                path="/dashboard/patients/:id/edit"
                element={<ProtectedRoute element={<PatientAction />} />}></Route>
              <Route exact path="/dashboard/appointment/:id" element={<Appointment />} />
              <Route exact path="/dashboard/test-result/:id" element={<TestResult />} />
              <Route
                exact
                path="/dashboard/test-result/:patientId/edit/:entryId"
                element={<TestResultEdit />}
              />
              <Route exact path="/dashboard/medication/:id" element={<PatientMedication />} />
              <Route
                exact
                path="/dashboard/medication/:patientId/edit/:entryId"
                element={<PatientMedicationEdit />}
              />
              <Route exact path="/dashboard/scan-result/:id" element={<ScanResult />} />
            </Routes>
          </Router>
        </GlobalProvider>
      </AuthProvider>
    </QueryProvider>
  );
};

export default RouteConfig;
