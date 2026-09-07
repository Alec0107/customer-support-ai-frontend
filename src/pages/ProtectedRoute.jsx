import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import API from "../api/apiRoutes.js";

function ProtectedRoute({ children }){

    const [authenticated, setAuthenticated] = useState(null);


    useEffect(() => {

        fetch(API.ME,{
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