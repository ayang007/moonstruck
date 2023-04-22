import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../App";
import {  useNavigate } from "react-router-dom";
import APIRequest from "../../util/APIRequest";

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
        props.setAuth(response[JWT]);
        navigate("/dashboard");
    }


    const loginSubmit = (e) => {
        // Prevent page reload
        e.preventDefault();
        loginRequest();
      };

    return (
        <>
        <h1>Login</h1>
        <p>My token is {auth}</p>

        <form onSubmit={loginSubmit}>
            <div>
                <label>Username </label>
                <input type="text" onChange={(e)=>{setUsername(e.target.value)}} required />
            </div>
            <div>
                <label>Password </label>
                <input type="password" onChange={(e)=>{setPassword(e.target.value)}} required />
            </div>
            <div>
                <input type="submit" />
            </div>
        </form>
        <button onClick={() => {props.setAuth('bar')}}>Change to bar</button>
        <button onClick={()=>{navigate("/register")}}>Sign up</button>
        </>
    )
}

export default Login;