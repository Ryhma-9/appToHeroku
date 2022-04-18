import React from 'react'

export default function RestaurantRegistration() {
  return (
    <div className='Main2'>
        <h1>Ravintolan rekisteröinti</h1>
    
    <div className='form'>
        <div className='forminner'>
           <div><label>Nimi:</label></div><input></input>
           <label>Osoite:</label><input></input>
           <label>Tyyli:</label><input></input>
           <label>Hintataso:</label><input></input>
           <label>Käyttäjänimi:</label><input></input>
           <label>Salasana:</label><input></input>
        
       <div className='regbutton'> 
         <button>Rekisteröidy</button> <br></br>
         
         <button>Peruuta</button> 
            </div>  
        
</div>
    </div>
    </div>
  )
}
