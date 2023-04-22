import { useContext } from "react";
import { AuthContext } from "../../App";

function Login (props) {
    const auth = useContext(AuthContext);
    return (
        <>
        <h1>Login</h1>
        <p>My token is {auth}</p>
        <button onClick={() => {props.setAuth('bar')}}>Change to bar</button>
        </>
    )
}

export default Login;