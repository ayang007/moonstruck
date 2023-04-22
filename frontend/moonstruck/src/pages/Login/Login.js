import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../App";
import {  useNavigate } from "react-router-dom";

function Login (props) {
    const navigate = useNavigate();
    const auth = useContext(AuthContext);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function foo() {
        /*
        const response = await fetch("https://mighty-badlands-72624.herokuapp.com/http://144.24.15.152:4000/api/users/login", {
            method: 'POST',
            mode: "no-cors",
            referrerPolicy: "unsafe-url",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
              },
            body: JSON.stringify({
                "Username": "Shalini-Rohra",
                "Password": "password1234"
            })
          });
                  console.log(response.json());
          */
         
          return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', "https://mighty-badlands-72624.herokuapp.com/http://144.24.15.152:4000/api/users/login", true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = function () {
              if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                  resolve(xhr.responseText);
                } else {
                  reject(new Error(xhr.statusText));
                }
              }
            };
            xhr.onerror = function () {
              reject(new Error('Network error'));
            };
            xhr.send(JSON.stringify({
                "Username": "Shalini-Rohra",
                "Password": "password1234"
            }));
          });
          
    }

    async function bar() {

        const response = await foo();
        console.log("Response foo:")
        console.log(response);
    }

    useEffect(() => {
        bar();
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