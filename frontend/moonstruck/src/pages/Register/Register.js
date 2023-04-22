import { useContext, useState } from "react";
import { AuthContext } from "../../App";

function Register (props) {
    const auth = useContext(AuthContext);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");

    const regSubmit = (e) => {
        // Prevent page reload
        e.preventDefault();
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