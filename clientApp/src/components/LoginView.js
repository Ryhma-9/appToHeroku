import './LogInBox.css';
import React , { useState } from 'react';
import axios from 'axios'
import Constants from './Constants.json'

export default function LoginView(props){
const[username, setUserName] = useState();
const[password, setPassword] = useState();
const[logInProcessState, setLogInProcessState] = useState("idle");


const checkLogInInput = async (usernameInput, passwordInput) => {
  console.log(usernameInput, passwordInput);
  setLogInProcessState("processing");
  clearInputValues();
try{
  const result = await axios.post(Constants.API_ADDRESS + '/loginbasic',
  null,
  {
    auth: {
      username: usernameInput,
      password: passwordInput
    }
  }); // tallennetaan pyyntö muuttujaan, koska async-toiminto
    setLogInProcessState("logInSuccess");  
    const receivedJWT = result.data.token;
    sessionStorage.setItem("token", receivedJWT);
    setTimeout(() => {
      props.setTrigger(false);
      setLogInProcessState("idle"); 
    }, 1500); 
}catch(error){
    setLogInProcessState("logInFailure");
    setTimeout(() => {
      setLogInProcessState("idle")
    }, 1500) 
  }
}

let logInUIControls = null;
switch(logInProcessState){
  default:
    logInUIControls = <button className="submit-btn" onClick={() => {checkLogInInput(username, password); clearInputValues()}}>Submit</button>
    break;
  case "processing":
    logInUIControls = <span style={{color: "blue"}}>Processing...</span>
    break;
  case "logInSuccess":
    logInUIControls = <span style={{color: "green"}}>Login Success!</span>
    break;
  case "logInFailure":
    logInUIControls = <span style={{color: "red"}}>error</span>
    break;
  }

function clearInputValues(){
  setUserName("");
  setPassword("");
}
  return (props.trigger) ? (
    <div className="popup">
        <div className="popup-inner">
        <h2>Login</h2>
          <form>
            <div>
              Username <br/>
              <input type="text" name="username" value={username} onChange={(e) => setUserName(e.target.value)}></input>
            </div>
            <div>
              Password <br/>
              <input type="text" name="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
            </div>
          </form>
          <div>
            { logInUIControls}
          </div>
          <div>
          <button className="close-btn" onClick={() => props.setTrigger(false)}>Close</button>
          </div>
          {props.children}
        </div> 
    </div>
  ) : "";
}