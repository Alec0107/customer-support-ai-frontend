import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }){

    const [authenticated, setAuthenticated] = useState(null);


    useEffect(() => {

        fetch("https://customer-support-ai-backend-production.up.railway.app/auth/me",{
            credentials: "include"
        })
        .then(response => {
            if (response.ok){
                setAuthenticated(true)
            }else{
                setAuthenticated(false)
            }
        })
        .catch(() => {
            setAuthenticated(false)
        });

    }, []);

    if (authenticated === null){
        return <p>Checking....</p>
    }

    if(authenticated === false){
        return <Navigate to="/login"/>
    }

    return children;
}

export default ProtectedRoute;