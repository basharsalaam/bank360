import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Component } from "../../frontend-components";

const Landing = () => {
    const navigate = useNavigate();

    // Go straight to register
    useEffect(() => {
        navigate("/signin");
    });
    return (
        <div
            style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                marginTop: "5em",
            }}
        >
            <Component.Loader />
        </div>
    );
};

export default Landing;
