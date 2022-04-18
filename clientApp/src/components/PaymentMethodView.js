import React from 'react';

export default function PaymentMethodView(props){       //Popup-ikkuna maksumenetelmän valintaa varten

  const banks = [                               //Hard-koodattuja pankkeja maksutapahtumia varten
    {
      name: "Nuurdea"
    },
    {
      name: "Dogebank"
    },
    {
      name: "DönskseBank"
    },
    {
      name: "HosuusPankki"
    },
    {
      name: "JyystöPankki"
    },
    {
      name: "Ääs-Pankki"
    },
    {
      name: "Peran rehellinen rahanlainaamo"
    },
    {
      name: "Joku muu, mikä?"
    }
  ];

  function paymentMethodHandler(  ){            //Käsittelijä maksumetodin valinnalle
    props.bankselector(!props.bankselecttrigger);
    props.processingview(!props.processingviewtrigger);
  }

  return (props.bankselecttrigger) ? (
    <div className="popup-shop"> 
        <div className="popup-shop-inner" >
          <h2>Payment Methods</h2>
            <div className="paymentMethodContainer">
              {
                banks.map(bank => {

                  return (
                    <div className="paymentMethodElement" onClick={() => paymentMethodHandler()}>
                      <p>{bank.name}</p>
                    </div>
                  )
                })
              }
            </div>
            <button className="btn-close" onClick={() => props.bankselector(!props.bankselecttrigger)}>Close</button>
        </div> 
    </div>
  ) : "";
}