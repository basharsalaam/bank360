import { useFormik } from "formik";
import { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Component } from "../../frontend-components";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import { loginValidation } from "./Login.validation";
import { LoginStyle } from "./style";
import api from "../../utils/api";

const Login: FC = () => {
    const navigate = useNavigate(); 
    const [loading, setLoading] = useState(false);
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit: async (values) => {
            setLoading(true);

            try {
                // Send login request to the server
                const response = await api.post("/login/", {
                    username: values.email,
                    password: values.password,
                });

                // Extract access and refresh tokens from the response
                const { access, refresh } = response.data;

                // Save tokens in localStorage
                localStorage.setItem("accessToken", access);
                localStorage.setItem("refreshToken", refresh);

                setLoading(false);

                // Redirect to the dashboard/home page
                navigate("/home");
                
            } catch (error: any) {
                setLoading(false);
                console.error("Login error:", error);

                // Display a user-friendly error message
                if (error.response?.status === 401) {
                    alert("Invalid email or password. Please try again.");
                } else {
                    alert("An error occurred. Please try again later.");
                }
            }
        },
        validationSchema: loginValidation,
    });

    return (
        <LoginStyle>
            <AuthLayout>
                <section className="form-container" style={{height: 'auto'}}>
                    <h2>Log in</h2>
                    <p className="sub-head">Monitor your cash flow easily</p>
                    <form
                        action=""
                        className="auth-form"
                        onSubmit={formik.handleSubmit}
                    >
                        <Component.AuthInput
                            placeholder="Email address"
                            type="email"
                            keyValue="email"
                            formik={formik}
                        />

                        <Component.AuthInput
                            placeholder="Password"
                            type="password"
                            keyValue="password"
                            formik={formik}
                            underLink={{
                                link: "/forgot-password",
                                text: "Forgot Password?",
                            }}
                        />

                        <button
                            type="submit"
                            className="auth-button"
                            disabled={loading}
                        >
                            {loading ? (
                                <Component.Loader noPadding={true} />
                            ) : (
                                "Sign in"
                            )}
                        </button>
                        <p className="extra">
                            New here?{" "}
                            <Link to={"/signup"}>Sign Up</Link>
                        </p>
                    </form>
                </section>
            </AuthLayout>
        </LoginStyle>
    );
};

export default Login;
