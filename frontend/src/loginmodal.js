import { render } from "@testing-library/react";
import {
    BrowserRouter as Router,
    Routes,
    useNavigate,
    Route,
    Link,
  } from "react-router-dom";
import {useState} from "react";
import Home from "./Home";

const LoginModal = () => 
{
    console.log("catcha man")
    return(
            <div class="v101_2">
            <span class="login-screen">Login</span><
                div class="name"></div><div class="v91_4">
                    </div><button className="guest-login" onClick = {Home.displayQuestion}>CONTINUE AS GUEST</button></div>
   
    );
}

export default LoginModal;