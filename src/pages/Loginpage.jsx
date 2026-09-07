import { useState } from "react";
import "./Loginpage.css";
import { useNavigate } from "react-router-dom";
import API from "../api/apiRoutes.js";

function LoginPage() {

    const navigate = useNavigate();


    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("")


    async function handleLogin(){

        const response = await fetch(API.LOGIN, {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.text();

        console.log(data);
        if(response.ok){
            navigate("/homepage/profile");
        }

    }


    return (
        <div className="login-page">

            <div className="login-box">

                <h1>Login</h1>

                <div className="login-field">
                    <label>Username</label>
                    <input type="username" 
                    onChange={(e) => setUsername(e.target.value)}/>
                </div>

                <div className="login-field">
                    <label>Password</label>
                    <input type="password" 
                    onChange={(e) => setPassword(e.target.value)}/>
                </div>

                <button onClick={handleLogin}
                    >Login
                </button>

            </div>

        </div>
    );
}

export default LoginPage;