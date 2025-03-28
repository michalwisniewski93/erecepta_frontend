import React, {useState, useEffect} from 'react'
import Header from './Header';
import {useNavigate, Link} from 'react-router-dom'
import {connect, useDispatch} from 'react-redux'
import { changePermission } from '../redux/actions'
import {getPermissionInfo} from '../redux/permissionselector'
import axios from 'axios'
import RecipePopUp from './RecipePopUp'

const RecipesList = ({updatePermission, permission}) => {

  const [recipes, setRecipes] = useState([])
  const [isChildVisible, setIsChildVisible] = useState(false)
  const [tempPatient, setTempPatient] = useState('')
  const [tempDoctorsAccessCode, setTempDoctorsAccessCode] = useState('')
  const [tempDoctorsName, setTempDoctorsName] = useState('')
  const [tempDoctorsSurname, setTempDoctorsSurname] = useState('')
  const [tempDoctorsPwz, setTempDoctorsPwz] = useState('')
  const [tempDoctorsPhoneNumber, setTempDoctorsPhoneNumber] = useState('')
  const [tempDoctorsAddress, setTempDoctorsAddress] = useState('')
  const [tempRecipesContentInfo, setTempRecipesContentInfo] = useState('')
  const [tempDateOfIssueData, setTempDateOfIssueData] = useState('')
  const [tempBarcodeNumber, setTempBarcodeNumber] = useState('')
  const [tempPatientSystemNumber, setTempPatientSystemNumber] = useState('')



useEffect(() => {
  axios.get('http://localhost:5000/recipes')
  .then((response) => setRecipes(response.data))
  .catch((err) => console.log('Wystąpił błąd podczas pobierania recept, błąd:' + err))
}, [])




    const navigate = useNavigate()
           
        
            const handleLogOut = () => {
                updatePermission()
                navigate('/')
               
            }
            const handleBackToMainMenu = () => {
              navigate('/login')
            }

            const setChildVisible = () => {
              setIsChildVisible(false)
            }


            const handlePreviewAndPrint = (patient,doctorsaccesscode, doctorsname, doctorssurname, doctorspwz, doctorsphonenumber, doctorsaddress, recipescontentinfo, dateofissuedata, barcodenumber, patientsystemnumber) => {
              setIsChildVisible(true)
              scrollToTop()
              setTempPatient(patient)
              setTempDoctorsAccessCode(doctorsaccesscode)
              setTempDoctorsName(doctorsname)
              setTempDoctorsSurname(doctorssurname)
              setTempDoctorsPwz(doctorspwz)
              setTempDoctorsPhoneNumber(doctorsphonenumber)
              setTempDoctorsAddress(doctorsaddress)
              setTempRecipesContentInfo(recipescontentinfo)
              setTempDateOfIssueData(dateofissuedata)
              setTempBarcodeNumber(barcodenumber)
              setTempPatientSystemNumber(patientsystemnumber)

              console.log(patient)

            }


            const handleDeleteRecipe = (id) => {
              axios.delete(`http://localhost:5000/recipes/${id}`)
             .then(() => setRecipes(recipes.filter(recipe => recipe._id !== id)))
             .catch((err) => console.error("Error deleting recipe:", err));
            }

             
   const  scrollToTop = () =>  {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
    
    return(
        <div className="app">
        <Header/>
        {!permission ? (<div className="logout">
                    <button className="returntomainmenu" onClick={handleBackToMainMenu}>Główne menu</button>
                    <button className="logout" onClick={ handleLogOut}>Wyloguj się</button>
                </div> ): (<div className="youwerelogout"><h1 className="subpage">Zostałeś wylogowany</h1>  <Link to="/">Home</Link></div>)}    
        {isChildVisible ?  <RecipePopUp childvisible={setChildVisible} patient={tempPatient} accesscode={tempDoctorsAccessCode} dname={tempDoctorsName} dsurname={tempDoctorsSurname} dpwz={tempDoctorsPwz} dphone={tempDoctorsPhoneNumber} daddress={tempDoctorsAddress} recipescontentinfo={tempRecipesContentInfo} dateofissue={tempDateOfIssueData} barcode={tempBarcodeNumber} psystemnumber={tempPatientSystemNumber}/> : null}
        <h1>Lista recept - ({recipes.length}) (od najnowszej do najstarszej)</h1>

        <div className="recipeProfiles">
          {recipes.map(recipe => <div className="recipeProfiles__item" key={recipe._id}><h3>pacjent: {recipe.patient}</h3><h3>kod dostępu lekarza: {recipe.doctorsaccesscode}</h3><h3>imię lekarza: {recipe.doctorsname}</h3><h3>nazwisko lekarza: {recipe.doctorssurname}</h3><h3>pwz lekarza: {recipe.doctorspwz}</h3><h3>nr telefonu lekarza: {recipe.doctorsphonenumber}</h3><h3>adres gabinetu: {recipe.doctorsaddress}</h3><h3>treść recepty: {recipe.recipescontentinfo}</h3><h3>data wystawienia: {recipe.dateofissuedata}</h3><h3>kod kreskowy: {recipe.barcodenumber}</h3><h3>nr systemowy pacjenta: {recipe.patientsystemnumber}</h3><button className="previewAndPrint" onClick={() => handlePreviewAndPrint(recipe.patient,recipe.doctorsaccesscode, recipe.doctorsname, recipe.doctorssurname, recipe.doctorspwz, recipe.doctorsphonenumber, recipe.doctorsaddress, recipe.recipescontentinfo, recipe.dateofissuedata, recipe.barcodenumber, recipe.patientsystemnumber )}>Podgląd recepty i wydruk</button><button className="deleteRecipe" onClick={() => handleDeleteRecipe(recipe._id)}>Usuń</button></div>).reverse()}
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

export default connect(null, mapDispatchToProps)(RecipesList);