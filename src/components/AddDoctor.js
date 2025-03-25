import React, { useState } from 'react'
import Header from './Header';
import {useNavigate, Link} from 'react-router-dom'
import {connect, useDispatch} from 'react-redux'
import { changePermission } from '../redux/actions'
import {getPermissionInfo} from '../redux/permissionselector'
import axios from 'axios'

const AddDoctor = ({updatePermission, permission}) => {
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [accesscode, setAccessCode] = useState('')
    const [pwz, setPwz] = useState('')
    const [phonenumber, setPhoneNumber] = useState('')
    const [address, setAddress] = useState('')
    const [doctors, setDoctors] = useState([])
 


  

const navigate = useNavigate()
   

    const handleLogOut = () => {
        updatePermission()
        navigate('/')
       
    }

    const handleBackToMainMenu = () => {
      navigate('/login')
    }

    const handleDoctorList = () => {
        navigate('/doctorsprofiles')
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if(name ==='' || surname ==='' || accesscode === '' || pwz === '' || phonenumber === '' || address === ''){
            
            alert('Żadne z wypełnianych pól formularza nie może byc puste.')
            return 

        }

        axios.post("http://localhost:5000/doctors", {accesscode, name, surname, pwz, phonenumber, address})
        .then((response => setDoctors([...doctors, response.data])))
        .catch(err => console.error('Error adding doctors', err))

        setName('')
        setSurname('')
        setAccessCode('')
        setPwz('')
        setPhoneNumber('')
        setAddress('')
        alert('Dodano nowego lekarza.')
    }

    
    


    return(
        <div className="app">
        <Header/>
        {!permission ? (<div className="logout">
                    <button className="returntomainmenu" onClick={handleDoctorList}>Lista lekarzy</button>
                    <button className="returntomainmenu" onClick={handleBackToMainMenu}>Główne menu</button>
                    <button className="logout" onClick={ handleLogOut}>Wyloguj się</button>
                </div> ): (<div className="youwerelogout"><h1 className="subpage">Zostałeś wylogowany</h1>  <Link to="/">Home</Link></div>)}    
        <div className="sitecontent">
        <h1>Dodaj nowego lekarza</h1>
        <form onSubmit={handleSubmit} action="post" className="adddoctor">
            <label htmlFor="">Imię:
                <input type="text" placeholder="imię" name="name" value={name} onChange={(e) => setName(e.target.value)}/>
            </label>
            <label htmlFor="">Nazwisko:
                <input type="text" placeholder="nazwisko" name="surname" value={surname} onChange={(e) => setSurname(e.target.value)}/>
            </label>
            <label htmlFor="">Kod dostępu:
                <input type="text" placeholder="kod dostępu" maxLength="4" name="accesscode" value={accesscode} onChange={(e) => setAccessCode(e.target.value)}/>
            </label>
            <label htmlFor="">pwz:
                <input type="text" placeholder="numer pwz" name="pwz" maxLength="7" value={pwz} onChange={(e) => setPwz(e.target.value)}/>
            </label>
            <label htmlFor="">Numer telefonu:
                <input type="text" placeholder="numer telefonu" name="phonenumber" value={phonenumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
            </label>
            <label htmlFor="">Adres gabinetu:
                <input type="text" placeholder="adres gabinetu" name="address" value={address} onChange={(e) => setAddress(e.target.value)}/>
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

export default connect(null, mapDispatchToProps)(AddDoctor);