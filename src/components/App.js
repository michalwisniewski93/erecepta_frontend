import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './LoginForm';
import LoginPage from './LoginPage';
import '../css/style.css'
import {Provider} from 'react-redux'
import store from '../redux/store'
import DoctorsProfiles from './DoctorsProfiles';
import NewRecipe from './NewRecipe';
import PatientsList from './PatientsList';
import RecipesList from './RecipesList';
import AddDoctor from './AddDoctor';
import AddPatient from './AddPatient';


const App = () => {
  return (
    <Provider store = {store}>
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/return" element={<LoginForm/>} />
        <Route path="/doctorsprofiles" element={<DoctorsProfiles/>} />
        <Route path="/addnewrecipe" element={<NewRecipe/>} />
        <Route path="/patients" element={<PatientsList/>} />
        <Route path="/recipes" element={<RecipesList/>} />
        <Route path="/adddoctor" element={<AddDoctor/>}/>
        <Route path="/addpatient" element={<AddPatient/>}/>
       
      </Routes>
    </Router>
    </Provider>
  );
};

export default App;

