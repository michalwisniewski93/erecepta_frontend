import React, {useEffect, useState} from 'react'
import Header from './Header';
import {useNavigate, Link} from 'react-router-dom'
import {connect, useDispatch} from 'react-redux'
import { changePermission } from '../redux/actions'
import {getPermissionInfo} from '../redux/permissionselector'
import axios from 'axios'


const NewRecipe = ({updatePermission, permission}) => {
  const [activeProfile, setActiveProfile] = useState([])
  const [barcode, setBarCode] = useState(Number(new Date()) + Number(new Date()) + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10))
  const [dateofissue, setDateOfIssue] = useState('')
  const [selectedOption, setSelectedOption] = useState('wybierz opcję')
  const [recipescontent, setRecipesContent] = useState('')
  const [patients, setPatients] = useState([])
  const [recipes, setRecipes] = useState([])

const navigate = useNavigate()

useEffect(() => {
  axios.get('http://localhost:5000/activeprofile')
  .then((response) => setActiveProfile(response.data))
  .catch((err) => console.log('Wystąpił błąd podczas pobierania profilu aktywnego, błąd:' + err))

  axios.get('http://localhost:5000/patients')
  .then((response) => setPatients(response.data))
  .catch((err) => console.log('Wystąpił błąd podczas pobierania pacjentów, błąd:' + err))

 


}, [])


       
    
        const handleLogOut = () => {
            updatePermission()
            navigate('/')
           
        }

        const handleBackToMainMenu = () => {
          navigate('/login')
        }

        const handleRecipesList = () => {
          navigate('/recipes')
        }

        const handleSubmit = (e) => {
         e.preventDefault()
         const barcodenumber = String(barcode) 
         const dateofissuedata = String(dateofissue)
         const recipescontentinfo = recipescontent 
         const patient = selectedOption 
         const doctorsname = activeProfile.name 
         const doctorssurname = activeProfile.surname
         const doctorsaccesscode = Number(activeProfile.accesscode) 
         const doctorspwz = Number(activeProfile.pwz) 
         const doctorsphonenumber = activeProfile.phonenumber
         const doctorsaddress = activeProfile.address
         const psn = patient.split("nr systemowy:")[1].trim()
         const patientsystemnumber = Number(psn)

         if(barcodenumber ==='' || dateofissuedata ==='' || recipescontentinfo === '' || patient === '' || patientsystemnumber === ''){
            
          alert('Żadne z wypełnianych pól formularza nie może byc puste.')
          return 

      }


      console.log(selectedOption)

      axios.post("http://localhost:5000/recipes", {barcodenumber, dateofissuedata, recipescontentinfo, patient, doctorsname, doctorssurname, doctorsaccesscode, doctorspwz, doctorsphonenumber, doctorsaddress, patientsystemnumber})
      .then((response => setRecipes([...recipes, response.data])))
      .catch(err => console.error('Error adding recipes', err))

      
      setDateOfIssue('')
      setSelectedOption('')
      setRecipesContent('')
      
      alert('Dodano nową receptę.')
        

        
       
        }


    return(
      <>
        <div className="app">
        <Header/>
        {!permission ? (<div className="logout">
          <button className="returntomainmenu" onClick={handleRecipesList}>Lista recept</button>
                    <button className="returntomainmenu" onClick={handleBackToMainMenu}>Główne menu</button>
                    <button className="logout" onClick={ handleLogOut}>Wyloguj się</button>
                </div> ): (<div className="youwerelogout"><h1 className="subpage">Zostałeś wylogowany</h1>  <Link to="/">Home</Link></div>)}    
        <div className="sitecontent">
        <h1>Wystaw nową receptę</h1>
        <h2><span className="numberofstep">1</span>Profil aktywny lekarza</h2>
        <div className="activeProfile">
        <div className="doctorsProfiles__item">
          
        <h1>imię: {activeProfile.name} nazwisko: {activeProfile.surname}</h1><h3>kod dostępu: {activeProfile.accesscode}</h3><h3>numer pwz: {activeProfile.pwz}</h3><h3>numer telefonu: {activeProfile.phonenumber}</h3><h3>adres gabinetu: {activeProfile.address}</h3>
          
          </div>
          </div>
          <div className="recipeContent">
            
          <h2><span className="numberofstep">2</span>Treść recepty</h2>
          <form action="post" onSubmit={handleSubmit}>
            <label>Kod kreskowy <br/> (generowany przez aplikację):
              <input type="text" name="barcode" placeholder="kod kreskowy" value={barcode} onChange={(e) => setBarCode(e.target.value)} disabled/>
            </label>
            <label>Data wystawienia:
              <input type="date" name="dateofissue" placeholder="data wystawienia" value={dateofissue} onChange={ (e) => setDateOfIssue(e.target.value)}/>
            </label>
            <label>Treść recepty (leki, dawkowanie):
              <textarea type="text" name="recipescontent" placeholder="treść recepty (leki, dawkowanie)" rows="10" value={recipescontent} onChange={(e) => setRecipesContent(e.target.value)}/>
            </label>
            <h2><span className="numberofstep">3</span>Wybierz pacjenta</h2>
            <select name="patient" value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
              <option>Wybierz z listy</option>
              {patients.map(patient => <option  key={patient._id}>imię: {patient.name} nazwisko: {patient.surname} pesel: {patient.pesel} nr systemowy: {patient.patientsystemnumber}</option>)}
              
            </select>
            <button>Wystaw receptę</button>
          </form>
          </div>
        </div>
        </div>
        
        </>
        
    )
}
const mapStateToProps = state => ({
    permission: getPermissionInfo()
  })

const mapDispatchToProps = (dispatch) => ({
  updatePermission: () => dispatch(changePermission()),  
});

export default connect(null, mapDispatchToProps)(NewRecipe);