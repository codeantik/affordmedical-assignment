import React, { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";

export const  Home = () => {
    const navigate = useNavigate();

    // useLayoutEffect(() => {
    //     navigate('/register');
    // }, []);

    return (
        <div className="home">
            <h1>Home</h1>  
        </div>
    )
}       