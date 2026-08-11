import { useFormik } from "formik";
import { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Component } from "../../components";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import { signUpValidation } from "./Signup.validation";
import { SignupStyle } from "./style";
import { useRegisterUserMutation, useLoginUserMutation } from "../../features/services";
import { useAppDispatch } from "../../app/hooks";
import { updateTokens } from "../../features/tokens/tokens.slice";
import { setCookie } from "../../utils/cookies";
import toast from "react-hot-toast";

const Signup: FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [registerUser] = useRegisterUserMutation();
  const [loginUser] = useLoginUserMutation();

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone_no: "",
      org_name: "",
      password: "",
      confirm_password: "",
    },
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const phone_no = "+" + values.phone_no;
        await registerUser({
          first_name: values.first_name,
          last_name: values.last_name,
          email: values.email,
          phone_no: phone_no,
          org_name: values.org_name,
          password: values.password,
        }).unwrap();

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
        } catch {
          toast.success("Account created! Please sign in.");
          navigate("/signin");
        }
      } catch (err: any) {
        const serverErrors = err?.data;
        if (serverErrors) {
          if (serverErrors.email) toast.error(serverErrors.email[0] || "Email error");
          else if (serverErrors.password) toast.error(serverErrors.password[0] || "Password error");
          else if (serverErrors.phone_no) toast.error(serverErrors.phone_no[0] || "Phone number error");
          else toast.error("Registration failed");
        } else {
          toast.error("Registration failed");
        }
      } finally {
        setLoading(false);
      }
    },
    validationSchema: signUpValidation,
  });

  return (
    <SignupStyle>
      <AuthLayout>
        <section className="form-container">
          <h2>Sign Up</h2>
          <p className="sub-head">Monitor your cash flow easily</p>
          <form action="" className="auth-form" onSubmit={formik.handleSubmit}>
            <Component.AuthInput
              placeholder="First name"
              type="text"
              keyValue="first_name"
              formik={formik}
            />
            <Component.AuthInput
              placeholder="Last name"
              type="text"
              keyValue="last_name"
              formik={formik}
            />
            <Component.AuthInput
              placeholder="Email address"
              type="email"
              keyValue="email"
              formik={formik}
            />
            <Component.AuthInput
              placeholder="Phone number"
              type="tel"
              keyValue="phone_no"
              formik={formik}
            />
            <Component.AuthInput
              placeholder="Organisation name"
              type="text"
              keyValue="org_name"
              formik={formik}
            />
            <Component.AuthInput
              placeholder="Password"
              type="password"
              keyValue="password"
              formik={formik}
              showPasswordStrength={true}
            />
            <Component.AuthInput
              placeholder="Confirm password"
              type="password"
              keyValue="confirm_password"
              formik={formik}
            />

            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? (
                <>
                  <Component.Loader noPadding={true} />
                </>
              ) : (
                "Sign up"
              )}
            </button>
            
            <p className="extra">
              I already have an account? <Link to={"/signin"}>Sign in</Link>
            </p>
          </form>
        </section>
      </AuthLayout>
    </SignupStyle>
  );
};

export default Signup;
