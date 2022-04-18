import React from 'react'

export default function RestaurantOrderHistory() {
    

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
           
      <textarea className='historytextarea' placeholder='päläpälä'></textarea>    
        
    </div>
    </div>
    </div>
  )
}
