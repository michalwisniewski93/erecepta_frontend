import React, {useState} from 'react'
import axios from 'axios'
import Header from './Header';
import {useNavigate, Link} from 'react-router-dom'
import {connect, useDispatch} from 'react-redux'
import { changePermission } from '../redux/actions'
import {getPermissionInfo} from '../redux/permissionselector'



const AddPatient = ({updatePermission, permission}) => {

const [name, setName] = useState('')
const [surname, setSurname] = useState('')
const [pesel, setPesel] = useState('')
const [street, setStreet] = useState('')
const [city, setCity] = useState('')
const [postcode, setPostcode] = useState('')
const [country, setCountry] = useState('')
const [patientsystemnumber, setPatientsystemnumber] = useState(Number(new Date()))
const [patients, setPatients] = useState([])

const navigate = useNavigate()




const handleLogOut = () => {
    updatePermission()
    navigate('/')
   
}

const handleBackToMainMenu = () => {
  navigate('/login')
}

const handlePatientsList = () => {
    navigate('/patients')
}


const handleSubmit = (e) => {
    e.preventDefault()
    if(name ==='' || surname ==='' || pesel === '' || street === '' || city === '' || postcode === '' || country === '' || patientsystemnumber === ''){
            
        alert('Żadne z wypełnianych pól formularza nie może byc puste.')
        return 

    }

    axios.post("http://localhost:5000/patients", {name, surname, pesel, street, city, postcode, country, patientsystemnumber})
    .then((response => setPatients([...patients, response.data])))
    .catch((err) => console.error('Error adding patients' + err))


    setName('')
    setSurname('')
    setPesel('')
    setStreet('')
    setCity('')
    setPostcode('')
    setCountry('')
    setPatientsystemnumber(0)
    alert('dodano nowego pacjenta')
}

    return(
    
        <div className="app">
            <Header/>
            {!permission ? (<div className="logout">
                                <button className="returntomainmenu" onClick={handlePatientsList}>Lista pacjentów</button>
                                <button className="returntomainmenu" onClick={handleBackToMainMenu}>Główne menu</button>
                                <button className="logout" onClick={ handleLogOut}>Wyloguj się</button>
                            </div> ): (<div className="youwerelogout"><h1 className="subpage">Zostałeś wylogowany</h1>  <Link to="/">Home</Link></div>)}    
                    <div className="sitecontent">
                    <h1>Dodaj nowego pacjenta</h1>
                    
        <form action="post" onSubmit={handleSubmit}>
            <label htmlFor="">Imię:
                <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)}/>
            </label>
            <label htmlFor="">Nazwisko:
                <input type="text" name="surname" value={surname} onChange={(e) => setSurname(e.target.value)}/>
            </label>
            <label htmlFor="">Pesel (11 cyfr):
                <input type="text" name="pesel" maxLength="11" value={pesel} onChange={(e) => setPesel(e.target.value)}/>
            </label>
            <label htmlFor="">Adres ulica nr mieszkania / nr domu:
                <input type="text" name="street" value={street} onChange={(e) => setStreet(e.target.value)}/>
            </label>
            <label htmlFor="">Miejscowość:
                <input type="text" name="city" value={city} onChange={(e) => setCity(e.target.value)}/>
            </label>
            <label htmlFor="">Kod pocztowy (w formacie 85795):
                <input type="text" name="postcode" maxLength="5" value={postcode} onChange={(e) => setPostcode(e.target.value)}/>
            </label>
            <label htmlFor="">Kraj:
                <input type="text" name="country" value={country} onChange={(e) => setCountry(e.target.value)}/>
            </label>
            <label htmlFor="">Numer systemowy<br/>(generowany przez aplikację):
                <input type="text" name="patientsystemnumber" disabled value={patientsystemnumber} onChange={(e) => setPatientsystemnumber(e.target.value)}/>
            </label>
            <button>Dodaj</button>
        </form>

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

export default connect(null, mapDispatchToProps)(AddPatient);