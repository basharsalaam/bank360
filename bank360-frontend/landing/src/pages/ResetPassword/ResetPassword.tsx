import { useFormik } from "formik";
import { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Component } from "../../frontend-components";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import { resetPasswordValidation } from "./ResetPassword.validation";
import toast from "react-hot-toast";
import { useResetPasswordMutation } from "../../features/services";

const ResetPassword: FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const tempAuth = JSON.parse(localStorage.getItem("tempAuth") || "{}");
    const [resetPassword] = useResetPasswordMutation();
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            time_pass: "",
        },
        onSubmit: (values) => {
            values.time_pass = tempAuth.time_pass;
            values.email = tempAuth.email;
            if (!values.email) {
                toast.error(
                    "Your session has expired. Go back to enter your email address"
                );
                return;
            } else if (!values.time_pass) {
                toast.error(
                    "Your OTP session has expired. Go back to enter your OTP"
                );
                return;
            }
            setLoading(true);
            resetPassword(values)
                .unwrap()
                .then((data) => {
                    setLoading(false);
                    toast.success("Successfully reset password");
                    localStorage.removeItem("tempAuth");
                    navigate("/signin");
                })
                .catch((err) => {
                    const errorObject = err?.data;

                    toast.error(errorObject[Object.keys(errorObject)[0]]);
                })
                .finally(() => {
                    setLoading(false);
                });
            // navigate("/home");
        },
        validationSchema: resetPasswordValidation,
    });
    return (
        // <LoginStyle>
        <AuthLayout>
            <section className="form-container">
                <h2>Enter a new password</h2>
                <p className="sub-head">
                    Enter a new password to reset your password
                </p>
                <form
                    action=""
                    className="auth-form"
                    onSubmit={formik.handleSubmit}
                >
                    <Component.AuthInput
                        placeholder="Password"
                        type="password"
                        keyValue="password"
                        formik={formik}
                        showPasswordStrength={true}
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
                            "Reset Password"
                        )}
                    </button>

                    <p className="extra">
                        I don't have an account?{" "}
                        <Link to={"/register"}>Click here</Link>
                    </p>
                </form>
            </section>
        </AuthLayout>
        // </LoginStyle>
    );
};

export default ResetPassword;
