import { useContext, useState } from "react";
import { AuthContext } from "../../App";
import APIRequest from "../../util/APIRequest";
import {  useNavigate } from "react-router-dom";


function Register (props) {
    const navigate = useNavigate();
    const auth = useContext(AuthContext);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");

    async function regRequest() {
        var response = 0;
        try {
            response = await APIRequest("PUT", "users/auth", {
                "Username": username,
                "Password": password
            });
        } catch (error) {
            alert("An error was encountered during registration.");
            return;
        }
        console.log("Response signup foo:")
        console.log(response);
        props.setAuth(response.JWT);
        navigate("/dashboard");
    }


    const regSubmit = (e) => {
        e.preventDefault();
        if(confirm === password) {
            regRequest();
        }
        else {
            alert("The two passwords do not match");
        }
      };

    return (
        <>
        <h1>Register</h1>
        <p>My token is {auth}</p>

        <form onSubmit={regSubmit}>
            <div>
                <label>Username </label>
                <input type="text" onChange={(e)=>{setUsername(e.target.value)}} required />
            </div>
            <div>
                <label>Password </label>
                <input type="password" onChange={(e)=>{setPassword(e.target.value)}} required />
            </div>
            <div>
                <label>Confirm </label>
                <input type="password" onChange={(e)=>{setConfirm(e.target.value)}} required />
            </div>
            <div>
                <input type="submit" />
            </div>
        </form>
        </>

    )
}

export default Register;