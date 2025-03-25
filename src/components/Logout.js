import React, {useState, useEffect} from 'react'
import {useNavigate, Link} from 'react-router-dom'
import {connect, useDispatch} from 'react-redux'
import { changePermission } from '../redux/actions'
import {getPermissionInfo} from '../redux/permissionselector'


const Logout = ({updatePermission, permission}) => {
    const navigate = useNavigate()
   

    const handleLogOut = () => {
        updatePermission()
        navigate('/')
       
    }

    

    return (
        <>
 

    



    {!permission ? (<div className="logout">
            <button className="logout" onClick={ handleLogOut}>Wyloguj się</button>
        </div> ): (<div className="youwerelogout"><h1 className="subpage">Zostałeś wylogowany</h1>  <Link to="/">Home</Link></div>)}
        {
            <div className="mainMenu">
                <nav className="mainMenu__nav">
                    <ul className="mainMenu__list">
                        <li><Link to="/doctorsprofiles">Profile lekarzy</Link></li>
                        <li><Link to="/addnewrecipe">Wystaw nową receptę</Link></li>
                        <li><Link to="/patients">Lista pacjentów</Link></li>
                        <li><Link to="/recipes">Lista recept</Link></li>
                        <li><Link to="/addpatient">Dodaj nowego pacjenta</Link></li>
                    </ul>
                </nav>
            </div>
        }
       
        
        </>

      
        
        
    )
}



const mapStateToProps = state => ({
    permission: getPermissionInfo()
  })

const mapDispatchToProps = (dispatch) => ({
  updatePermission: () => dispatch(changePermission()),  
});

export default connect(null, mapDispatchToProps)(Logout);
