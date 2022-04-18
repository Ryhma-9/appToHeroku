import './LogInBox.css';
import React , { useState } from 'react';
import axios from 'axios'
import Constants from './Constants.json';

export default function SignupView(props) {
const[username, setUserName] = useState();
const[password, setPassword] = useState();
const[email, setEmail] = useState();
const[address, setAddress] = useState();
const[firstName, setFirstName] = useState();
const[lastName, setLastName] = useState();
const[role, setRole] = useState();
const[phoneNumber, setPhoneNumber] = useState();
const[signUpProcessState, setSignUpProcessState] = useState("idle");

const checkLogInInput = async (
    usernameInput, passwordInput, emailInput, 
    addressInput, firstNameInput, lastNameInput, roleInput, phoneNumberInput) => {
  console.log(usernameInput, passwordInput);
  setSignUpProcessState("processing");
  clearInputValues();
try{
  const result = await axios.post(Constants.API_ADDRESS + '/signup',
  {
    userName: usernameInput,
    password: passwordInput,
    email: emailInput,
    address: addressInput,
    firstName: firstNameInput,
    lastName: lastNameInput,
    role: roleInput,
    phoneNumber: phoneNumberInput
  }); // tallennetaan pyyntö muuttujaan, koska async-toiminto
    console.log(result);
    setSignUpProcessState("signUpSuccess");
    setTimeout(() => {
      props.setTrigger(false)
    }, 1500) 
}catch(error){
    console.log(error);
    setSignUpProcessState("signUpFailure");
    setTimeout(() => {
      setSignUpProcessState("idle")
    }, 1500) 
  }
}

let signUpUIControls = null;
switch(signUpProcessState){
  default:
    signUpUIControls = <button className="submit-btn" onClick={() => 
    {checkLogInInput(username, password, email, address, firstName, lastName, 
    role, phoneNumber); clearInputValues()}}>Submit</button>
    break;
  case "processing":
    signUpUIControls = <span style={{color: "blue"}}>Processing...</span>
    break;
  case "signUpSuccess":
    signUpUIControls = <span style={{color: "green"}}>Sign Up Success!</span>
    break;
  case "signUpFailure":
    signUpUIControls = <span style={{color: "red"}}>error</span>
    break;
  }

function clearInputValues(){
  setUserName("");
  setPassword("");
  setFirstName("");
  setLastName("");
  setEmail("");
  setPhoneNumber("");
  setRole("");
  setAddress("");
}
  return (props.trigger) ? (
    <div className="popup">
        <div className="popup-inner">
        <h2>Sign up</h2>
          <form>
            <div>
              First name <br/>
              <input type="text" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)}></input>
            </div>
            <div>
              Last name <br/>
              <input type="text" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)}></input>
            </div>
            <div>
              Address <br/>
              <input type="text" name="address" value={address} onChange={(e) => setAddress(e.target.value)}></input>
            </div>
            <div>
              Email <br/>
              <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
            </div>
            <div>
              Phonenumber <br/>
              <input type="text" name="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}></input>
            </div>
            <div>
              Username <br/>
              <input type="text" name="username" value={username} onChange={(e) => setUserName(e.target.value)}></input>
            </div>
            <div>
              Password <br/>
              <input type="text" name="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
            </div>
            <div>
              Role (admin, restaurant, customer) <br/>
                <input type="text" name="role" value={role} onChange={(e) => setRole(e.target.value)}></input>
            </div>
          </form>
          <div>
            { signUpUIControls}
          </div>
          <div>
          <button className="close-btn" onClick={() => props.setTrigger(false)}>Close</button>
          </div>
          {props.children}
        </div> 
    </div>
  ) : "";
}