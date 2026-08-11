import { useFormik } from "formik";
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { Component } from "../../frontend-components";
import { useSendOtp } from "../../hooks/helpers/sendOtp";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import { forgotPasswordValidation } from "./ForgotPassword.validation";
import { ForgotPasswordStyle } from "./style";

const ForgotPassword: FC = () => {
    const [loading, setLoading] = useState(false);

    const { sendOtp } = useSendOtp({ setLoading, endpoint: "reset" });

    const formik = useFormik({
        initialValues: {
            email: "",
        },
        onSubmit: (values) => {
            localStorage.setItem("tempAuth", JSON.stringify(values));
            sendOtp(values.email);
        },
        validationSchema: forgotPasswordValidation,
    });

    return (
        <ForgotPasswordStyle>
            <AuthLayout>
                <section className="form-container">
                    <h2>Forgot Password</h2>
                    <p className="sub-head">
                        Enter the email you used to register and we will send
                        you a link to reset your password.
                    </p>
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

                        <button
                            type="submit"
                            className="auth-button"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Component.Loader />
                                </>
                            ) : (
                                "Sign up"
                            )}
                        </button>
                        <p className="extra">
                            I don't have an account?{" "}
                            <Link to={"/register"}>Click here</Link>
                        </p>
                    </form>
                </section>
            </AuthLayout>
        </ForgotPasswordStyle>
    );
};

export default ForgotPassword;
