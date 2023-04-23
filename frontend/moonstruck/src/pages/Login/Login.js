import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../App";
import {  useNavigate } from "react-router-dom";
import APIRequest from "../../util/APIRequest";
import './Login.css'
import lovers from '../../assets/Login_Background.jpg';
function Login (props) {
    const navigate = useNavigate();
    const auth = useContext(AuthContext);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    async function loginRequest() {
        var response = 0;
        try {
            response = await APIRequest("POST", "users/login", {
                "Username": username,
                "Password": password
            });
        } catch (error) {
            alert("Your username and/or password were incorrect.");
            return;
        }
        console.log("Response foo:")
        console.log(response);
        props.setAuth(response.JWT);
        navigate("/dashboard");
    }


    const loginSubmit = (e) => {
        // Prevent page reload
        e.preventDefault();
        loginRequest();
      };

    return (
        <>
        <div class="hues"></div>
        <img class="backgrounds" src={lovers}></img>
        <div class="main">
            <h1>Login</h1>
            <form onSubmit={loginSubmit}>
                <div class="inserthere">
                    <label>Username </label>
                    <input type="text" onChange={(e)=>{setUsername(e.target.value)}} required />
                </div>
                <div class="inserthere">
                    <label>Password </label>
                    <input type="password" onChange={(e)=>{setPassword(e.target.value)}} required />
                </div>
                <div>
                    <input type="submit" />
                </div>
            </form>
            <div class="signing">
                <label>No account?</label>
                <button onClick={()=>{navigate("/register")}}>Sign up</button>
            </div>
        </div>
        </>
    )
}

export default Login;