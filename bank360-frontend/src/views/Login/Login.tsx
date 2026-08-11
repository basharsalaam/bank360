import { useFormik } from "formik";
import { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Component } from "../../components";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import { loginValidation } from "./Login.validation";
import { LoginStyle } from "./style";
import { useLoginUserMutation } from "../../features/services";
import { useAppDispatch } from "../../app/hooks";
import { updateTokens } from "../../features/tokens/tokens.slice";
import { setCookie } from "../../utils/cookies";
import toast from "react-hot-toast";

const Login: FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [loginUser] = useLoginUserMutation();
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit: async (values) => {
            setLoading(true);
            try {
                const result = await loginUser({
                    email: values.email,
                    password: values.password,
                }).unwrap();

                if (result.access) {
                    setCookie("cfat", result.access);
                    setCookie("cfrt", result.refresh);
                    dispatch(updateTokens({
                        access: result.access,
                        refresh: result.refresh as string,
                    }));
                    navigate("/home");
                }
            } catch (err: any) {
                toast.error(err?.data?.detail || "Invalid email or password");
            } finally {
                setLoading(false);
            }
        },
        validationSchema: loginValidation,
    });

    return (
        <LoginStyle>
            <AuthLayout>
                <section className="form-container">
                    <h2>Sign In</h2>
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
                                <>
                                    <Component.Loader noPadding={true} />
                                </>
                            ) : (
                                "Sign in"
                            )}
                        </button>
                        <p className="extra">
                            I don't have an account?{" "}
                            <Link to={"/register"}>Click here</Link>
                        </p>
                    </form>
                </section>
            </AuthLayout>
        </LoginStyle>
    );
};

export default Login;
