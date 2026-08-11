import { useFormik } from "formik";
import { FC, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Component } from "../../frontend-components";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import { signUpValidation } from "./Signup.validation";
import { SignupStyle } from "./style";

const getPasswordStrength = (password: string) => {
  if (!password) return "";
  if (password.length < 8) return "Weak";
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[@$!%*?&#]/.test(password);

  if (hasUppercase && hasNumber && hasSpecialChar) return "Strong";
  if ((hasUppercase && hasNumber) || (hasUppercase && hasSpecialChar)) return "Moderate";
  return "Weak";
};

const Signup: FC = () => {
  const [passwordStrength, setPasswordStrength] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 

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
        values.phone_no = "+" + values.phone_no;
    
        const response = await fetch("http://127.0.0.1:8000/api/signup/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
    
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || "Signup failed. Please try again.");
        }
    
        const responseData = await response.json();
        console.log("Signup successful!", responseData);
    
        localStorage.setItem("authToken", responseData.token || "");
    
        setLoading(false);

      } catch (err) {
        setLoading(false);
    
        const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
        alert(errorMessage);
      }
    },
    validationSchema: signUpValidation,
  });

  useEffect(() => {
    
  }, []);

  // Monitor password input for strength updates
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    formik.handleChange(e); 
    setPasswordStrength(getPasswordStrength(password)); 
  };

    
  return (
    <SignupStyle>
      <AuthLayout>
      <section className="form-container transition-all duration-300 ease-in-out">

      <h2>Sign Up</h2>
          <p className="sub-head">Monitor your cashflow easily</p>
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
            < Component.AuthInput
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
              onChange={handlePasswordChange}
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
              Already have an account? <Link to={"/login"}>Log in</Link>
            </p>
          </form>
        </section>
      </AuthLayout>
    </SignupStyle>
  );
};

export default Signup;