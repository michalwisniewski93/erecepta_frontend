import React, {useState} from 'react'
import applogoimg from '../static/applogo.png'
import barcodeimg from '../static/barcode.png'

const RecipePopUp = ({childvisible, patient, accesscode, dname, dsurname, dpwz, dphone, daddress, recipescontentinfo, dateofissue, barcode, psystemnumber}) => {
   
   const [patientName, setPatientName] = useState('')
   const [patientSurname, setPatientSurname] = useState('')
   const [patientPesel, setPatientPesel] = useState('')
   const [patientSystemNumber, setPatientSystemNumber] = useState('')

const handlePrintRecipe = () => {
    const content = document.querySelector('.recipePopUpContainer').innerHTML
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Drukowanie</title></head><body>');
    printWindow.document.write(`
        <style>
          

.recipePopUpContainer {
    background-color: rgb(11, 98, 60);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
}

.recipePopUp {
    width: 360px;
    background-color: white;



}

.recipePopUp .recipeImgs {
    display: flex;
    flex-direction: column;
    flex-grow: 0;

}

.recipePopUp .recipeImgs img#applogo {
    width: 247px;
    height: 62px;
}

.recipePopUp .recipeImgs img#barcode {
    width: 357px;
    height: 44px;
}

.recipePopUp .recipeBarCode {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
}

.recipePopUp .recipeBarCode p.barcode {
    font-family: 'Funnel Display';
    font-size: 16px;
}

.doctorsignature {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
}


.recipeButtons button.print, .recipeButtons button.return {
    color: rgb(1, 226, 95);
    background-color: black;
    padding: 10px;
    font-family: 'Funnel Display', sans-serif;
    border: 0px solid transparent;
    border-radius: 5px;
    margin-top: 10px;
    font-size: 22px;
    cursor: pointer;
    margin-left: 5px;
}
        </style>
      `);
    printWindow.document.write(content); 
    printWindow.document.write('</body></html>');
    printWindow.document.close();  
    printWindow.print();

}


   
    return(
        <div className="recipePopUpContainer">
        <div className="recipePopUp">
           <div className="recipeImgs">
            <img src={applogoimg} id="applogo"/>
            <img src={barcodeimg} id="barcode" />
           </div>
           <div className="recipeBarCode">
            <p className="barcode">{barcode}</p>
           </div>
           <div className="accesscodeanddateofissue">
            <p className="accesscode">Kod dostępu: {accesscode}</p>
            <p className="dateofissue">Wystawiono: {dateofissue}</p>
           </div>
           <div className="patientdata">
            <h3>Pacjent:</h3>
            <p className="patientname"> {patient}</p>
           </div>
           <div className="doctorsdata">
            <h3>Wystawca:</h3>
            <p className="doctorsdata">lek. {dname} {dsurname}</p>
            <p className="doctorspwz">PWZ lekarza:  {dpwz}</p>
            <p className="doctorsphone">nr telefonu: {dphone}</p>
            <p className="doctorsaddress">adres: {daddress}</p>
           </div>
           <div className="recipedata">
            <h3>Leki:</h3>
            <p className="recipedatacontent">
                {recipescontentinfo}
            </p>
           </div>
           <div className="doctorsignature">
           
            <p className="doctorssignature__nameAndSurname">
                {dname} {dsurname}
            </p>
           </div>
        </div>
        <div className="recipeButtons">
            <button className="print" onClick={handlePrintRecipe}>Drukuj</button>
            <button className="return" onClick={childvisible}>Powrót</button>
        </div>
        </div>
    )
}
export default RecipePopUp;