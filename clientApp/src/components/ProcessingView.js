import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function ProcessingView(props){                    //Popup ikkuna ilmaisemaan maksutapahtuman tilaa
  
  let navigation = useNavigate();

  const [ textState , setTextState ] = useState("processing")     //Valitaan ruudulle tulostettava tilateksti: "processing" tai "Payment complete"

  const styleObj = {
    color:'green',
    fontSize:'large'
  }

  function buttonClickHandler(){                                  //'Close' napin toimintojen määrittelyä. Nappi sulkee popup-ikkunan ja siirtää käyttäjän aloitussivulle
    props.processingview(!props.processingviewtrigger)            //Nappi ilmestyy näytölle maksutapahtuman käsittelyn jälkeen
    navigation("/");
  }

  let textContentVariable = null;                                 //Määrittelee ikkunaan tulevan sisällön
  switch(textState)
  {
    default:
      textContentVariable = <div><p>Processing...</p></div>
      break;
    case "payment_complete":
      textContentVariable = <div>
                              <p style={styleObj}>Payment complete!</p>
                              <br/>
                              <button 
                                className="btn-close" 
                                onClick={ () => buttonClickHandler() }>
                                  Close
                              </button>
                            </div>
      break;
  }

  function timeOutValue(){                                        //Ajastin simuloimaan maksutapahtumaan kuluvaa aikaa. Antaa myös asiakkaalle tilaisuuden 
    return Math.round((Math.random() * 1000 + 1000))              //lukea tilatietoa ikkunasta. Ajan kuluttua 'close'-nappi ilmestyy ruudulle.
  }

useEffect(()=>{                                                   //Hookki onnistuneen maksutapahtuman käsittelyä varten. Assettaa myös tilamuuttujan 'paymentsuccesfull' trueksi 'Payment'-komponentin käyttöön.
    if(props.paymentsuccesfull === true) setTextState(() => "payment_complete");
    const timer = setTimeout(() => {
      setTextState(() => "payment_complete");
      props.setpaymentsuccesfull(true);
    }, timeOutValue());
    return () => 
      clearTimeout(timer);
    },[]);
  
  
  return (props.processingviewtrigger) ? (
    <div className="popup-shop">
        <div className="popup-shop-inner-small" >
          <h2>Payment Methods</h2>
            <div className="paymentMethodContainer">
              { textContentVariable }
            </div>
        </div> 
    </div>
  ) : "";
}