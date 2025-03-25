import React, {useEffect, useState} from 'react'
import Header from './Header';
import {useNavigate, Link} from 'react-router-dom'
import {connect, useDispatch} from 'react-redux'
import { changePermission } from '../redux/actions'
import {getPermissionInfo} from '../redux/permissionselector'
import axios from 'axios'

const PatientsList = ({updatePermission, permission}) => {


  const [patients, setPatients] = useState([])
  const [editingName, setEditingName] = useState('')
  const [editingSurname, setEditingSurname] = useState('')
  const [editingPesel, setEditingPesel] = useState('')
  const [editingStreet, setEditingStreet] = useState('')
  const [editingCity, setEditingCity] = useState('')
  const [editingPostCode, setEditingPostCode] = useState('')
  const [editingCountry, setEditingCountry] = useState('')
  const [editingId, setEditingId] = useState('')
  const [editingPatientSystemNumber, setEditingPatientSystemNumber] = useState('')
  const [visibilityEditForm, setVisibilityEditForm] = useState(null)

  useEffect(() => {
    axios.get('http://localhost:5000/patients')
    .then((response) => setPatients(response.data))
    .catch((err) => console.log('Wystąpił błąd podczas pobierania danych pacjentów, błąd:' + err))

  }, [])

const navigate = useNavigate()
       
    
        const handleLogOut = () => {
            updatePermission()
            navigate('/')
           
        }
        const handleBackToMainMenu = () => {
          navigate('/login')
        }

        const handleAddPatient = () => {
          navigate('/addpatient')
        }


        const handleEditPatient = (id, name, surname, pesel, street, city, postcode, country, patientsystemnumber) => {
          scrollToTop()
          setVisibilityEditForm(true)
          setEditingName(name)
          setEditingSurname(surname)
          setEditingPesel(pesel)
          setEditingStreet(street)
          setEditingCity(city)
          setEditingPostCode(postcode)
          setEditingCountry(country)
          setEditingPatientSystemNumber(patientsystemnumber)
          setEditingId(id)
        }

        const savePatient = () => {
          const name = editingName
          const surname = editingSurname
          const pesel = editingPesel
          const street = editingStreet
          const city = editingCity
          const postcode = editingPostCode
          const country = editingCountry
          const patientsystemnumber = editingPatientSystemNumber
        

          {/* tu będzie axios put */}

          axios.put(`http://localhost:5000/patients/${editingId}`, {name, surname, pesel, street, city, postcode, country, patientsystemnumber})
          .then((response) => {
            setPatients(patients.map(patient => patient._id === editingId ? response.data : patient))
            setEditingId(null); // Zakończ edycję
           setEditingName('')
           setEditingSurname('')
           setEditingPesel('')
           setEditingStreet('')
           setEditingCity('')
           setEditingPostCode('')
           setEditingCountry('')
           setEditingPatientSystemNumber('')
          })
          .catch((err) => console.error("Error updating patient:", err));
           setVisibilityEditForm(null)

        }


        const handleDeletePatient = (id) => {
          axios.delete(`http://localhost:5000/patients/${id}`)
          .then(() => setPatients(patients.filter(patient => patient._id !== id)))
          .catch((err) => console.error("Error deleting patient:", err));
        }



        const  scrollToTop = () =>  {
          window.scrollTo({ top: 0, behavior: 'smooth' });
      }

    return(
        <div className="app">
        <Header/>
        {!permission ? (<div className="logout">
                    <button className="addpatient" onClick={handleAddPatient}>Dodaj pacjenta</button>
                    <button className="returntomainmenu" onClick={handleBackToMainMenu}>Główne menu</button>
                    <button className="logout" onClick={ handleLogOut}>Wyloguj się</button>
                </div> ): (<div className="youwerelogout"><h1 className="subpage">Zostałeś wylogowany</h1>  <Link to="/">Home</Link></div>)}    
          <div className="sitecontent">
                {visibilityEditForm ? <><h1>Edycja pacjenta</h1>
          
          <label>imię: <input type="text" placeholder="imię" name="name"  value={editingName} onChange={(e) => setEditingName(e.target.value)}></input></label>
          <label>nazwisko: <input type="text" placeholder="nazwisko" name="surname"  value={editingSurname} onChange={(e) => setEditingSurname(e.target.value)}></input></label>
          <label>pesel: <input type="text" placeholder="pesel"  name="pesel" maxLength="11"  value={editingPesel} onChange={(e) => setEditingPesel(e.target.value)}></input></label>
          <label>adres ulica nr mieszkania/nr domu: <input type="text" placeholder="adres"  value={editingStreet} name="street"  onChange={(e) => setEditingStreet(e.target.value)}></input></label>
          <label>miejscowość: <input type="text" placeholder="miejscowość"  name="city" value={editingCity} onChange={(e) => setEditingCity(e.target.value)}></input></label>
          <label>kod pocztowy: <input type="text" placeholder="kod pocztowy"  name="postcode" value={editingPostCode} onChange={(e) => setEditingPostCode(e.target.value)}></input></label>
          <label>kraj: <input type="text" placeholder="kraj"  name="country" value={editingCountry} onChange={(e) => setEditingCountry(e.target.value)}></input></label>
          <label>numer systemowy: <input type="text" placeholder="numer systemowy" disabled  name="patientsystemnumber" value={editingPatientSystemNumber} onChange={(e) => setEditingPatientSystemNumber(e.target.value)}></input></label>
                  
          <button onClick={savePatient}>Zapisz</button>
        
        </>
       : null}


        <h1>Lista pacjentów - ({patients.length})</h1>
        <div className="patientProfiles">
          {patients.map(patient => <div className="patientProfiles__item" key={patient._id}><h1>imię: {patient.name} nazwisko: {patient.surname}</h1><h3>pesel: {patient.pesel}</h3><h3>adres ul: {patient.street}</h3><h3>miasto: {patient.city}</h3><h3>kod pocztowy: {patient.postcode}</h3><h3>kraj: {patient.country}</h3><h3>numer systemowy: {patient.patientsystemnumber}</h3><button className="edit" onClick={() => handleEditPatient(patient._id, patient.name, patient.surname, patient.pesel, patient.street, patient.city, patient.postcode, patient.country, patient.patientsystemnumber)}>Edytuj</button><button className="delete" onClick={() => handleDeletePatient(patient._id)}>Usuń</button> </div>)}
        </div>
        </div>
        </div>
    )
}

const mapStateToProps = state => ({
    permission: getPermissionInfo()
  })

const mapDispatchToProps = (dispatch) => ({
  updatePermission: () => dispatch(changePermission()),  
});

export default connect(null, mapDispatchToProps)(PatientsList);