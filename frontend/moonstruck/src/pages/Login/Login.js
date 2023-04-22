import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../App";
import {  useNavigate } from "react-router-dom";

function Login (props) {
    const navigate = useNavigate();
    const auth = useContext(AuthContext);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function foo() {
        const response = await fetch("http://144.24.15.152:4000/api/users/login", {
            method: 'POST',
            mode: "no-cors",
            referrerPolicy: "unsafe-url",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
            body: JSON.stringify({
                "Username": "Shalini-Rohra",
                "Password": "password1234"
            })
          });
        console.log(response.json())
    }

    useEffect(() => {
        foo();
    }, []);

    const loginSubmit = (e) => {
        // Prevent page reload
        e.preventDefault();
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