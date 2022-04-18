import React from 'react'

export default function CustomerRegistration() {
  return (
    <div className='Main'>
        <h1>Asiakkaan rekisteröinti</h1>
    
    <div className='form'>
        <div className='forminner'>
           <div><label>Nimi:</label></div><input></input>
           <label>Osoite:</label><input></input>
           <label>Puhelin:</label><input></input>
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
