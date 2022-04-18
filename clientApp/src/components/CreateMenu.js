import React from 'react'

export default function Ruokalistanluonti() {
    
    function lisays() {
        document.getElementById("lisays").innerHTML = "Tuote lisätty!";
        setTimeout(function() {
            document.getElementById("lisays").innerHTML = "";
        },2000);
    }

  return (
    <div className='Main2'>
        <h1>Ravintolan profiili</h1>
    
    <div className='form'>
      
      <div className='formbuttons'>
      <button>Muokkaa tietoja</button>
      <button>Ruokalistan muokkaus</button>
      <button>Tilaushistoria</button>
      <button><b>Takaisin</b></button>
      </div>
        <div className='forminner'>
           <div><label>Tuotteen nimi:</label></div><input></input>
           <label>Hinta:</label><input></input>

           <label>Allergeenit:</label> 

        <div className='allergia'>

           <input type="checkbox" id="muna" name="muna" value="muna"></input>
           <label  for="muna">Munaton</label>

           <input type="checkbox" id="maidoton" name="maidoton" value="maidoton"></input>
           <label  for="maidoton">Maidoton</label>

           <input type="checkbox" id="pähkinä" name="pähkinä" value="pähkinä"></input>
           <label  for="pähkinä">Pähkinätön</label>
            
        </div>

           <label>Tyyppi:</label><input></input>
           <label>Energiasisältö:</label><input></input>
           <label>Raaka-aineet:</label><input></input>
           <label>Kuvaus:</label><input></input>
        
       <div className='vaihdabutton'> 
         <button className='vaihdabutton' onClick={lisays}>Lisää tuote</button> 
         <button>Luo ruokalista</button> <br></br>
         <p id="lisays"></p> 
         
            </div>  
            <div className='textarea'>
              <textarea className='menutextarea'></textarea>
            </div>
        
</div>
    </div>
    </div>
  )
}
