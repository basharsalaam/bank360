import { useFormik } from "formik";
import { FC, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Component } from "../../components";
import Loader from "../../components/Loader/Loader";
// import { useRegisterUserMutation } from "../../features/services";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import { OTP_NUMBER_OF_INPUTS } from "../../utils/constants";
import { OTPStyle } from "./style";
// import toast from "react-hot-toast";
import { make2SF } from "../../utils/helpers";
import { useSendOtp } from "../../hooks/helpers/sendOtp";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "../../features/services";
import toast from "react-hot-toast";
import { useAppDispatch } from "../../app/hooks";
import { updateTokens } from "../../features/tokens/tokens.slice";
import { setCookie } from "../../utils/cookies";
// import axios from "axios";

const OTP: FC = () => {
  const [search] = useSearchParams();
  // Get temporary auth data from state
  const [loading, setLoading] = useState(false);
  const [registerUser] = useRegisterUserMutation();
  const [loginUser] = useLoginUserMutation();
  const [countdown, setCountdown] = useState(60);
  const [resendingOtp, setResendingOtp] = useState(false);
  const dispatch = useAppDispatch();

  const { sendOtp } = useSendOtp({ setLoading: setResendingOtp });
  const tempAuth = JSON.parse(localStorage.getItem("tempAuth") || "{}");

  const startTimer = () => {
    setCountdown(60);
    // set countdown timer from 60 to 0
    const timer = setInterval(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1);
      } else {
        clearInterval(timer);
      }
    }, 1000);
  };

  useEffect(() => {
    // set countdown timer from 60 to 0
    const timer = setInterval(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1);
      } else {
        clearInterval(timer);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const resendOtp = async () => {
    await sendOtp(tempAuth.email as string, startTimer);
  };
  const navigate = useNavigate();

  // Defines what the OTP is for
  const endpoint = search.get("endpoint") as "signup" | "signin" | "reset";
  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    onSubmit: (values) => {
      if (endpoint === "signup") {
        setLoading(true);
        registerUser({ ...tempAuth, time_pass: values.otp })
          .unwrap()
          .then((data) => {
            toast.success("Registration successful");

            navigate("/signin");
            localStorage.removeItem("tempAuth");
          })
          .catch((err) => {
            const errorObject = err?.data;
            toast.error(errorObject[Object.keys(errorObject)[0]]);
          })
          .finally(() => {
            setLoading(false);
          });
      }
      if (endpoint === "signin") {
        setLoading(true);
        loginUser({ ...tempAuth, time_pass: values.otp })
          .unwrap()
          .then((data: any) => {
            toast.success("Login successful");

            // add tokens to state
            dispatch(updateTokens(data));

            // add tokens to cookies
            setCookie("cfat", data.access); //access
            setCookie("cfrt", data.refresh); //refresh

            navigate("/home");
            localStorage.removeItem("tempAuth");
          })
          .catch((err: any) => {
            const errorObject = err?.data;
            let errorMessage: string =
              errorObject[Object.keys(errorObject)[0]] || "An error occured";
            toast.error(errorMessage);
            if (
              errorMessage.toLowerCase() ===
              "No active account found with the given credentials".toLowerCase()
            ) {
              navigate("/signin");
            }
          })
          .finally(() => {
            setLoading(false);
          });
      }
      if (endpoint === "reset") {
        localStorage.setItem(
          "tempAuth",
          JSON.stringify({ ...tempAuth, time_pass: values.otp })
        );
        navigate("/reset-password");
      }
    },
  });
  return (
    <OTPStyle>
      <AuthLayout>
        <section className="form-container">
          <h2>One Time Password</h2>
          <p className="sub-head">
            An OTP (One Time Password) was sent to your mail, input the OTP to
            continue
          </p>
          <form action="" className="auth-form" onSubmit={formik.handleSubmit}>
            <Component.OTPInput
              value={formik.values.otp}
              handleChange={(val) => {
                formik.setFieldValue("otp", val);
              }}
              placeholder="******"
            />
            <button
              type="submit"
              className="auth-button"
              disabled={
                String(formik.values.otp).length < OTP_NUMBER_OF_INPUTS ||
                loading
              }
            >
              {loading ? <Loader noPadding={true} /> : "Send"}
            </button>
            {/* <p className="extra">
                            I don't have an account?{" "}
                            <Link to={"/register"}>Click here</Link>
                        </p> */}
            <div className="footer">
              <p className="timer">0:{make2SF(countdown)}s</p>
              <button
                disabled={resendingOtp}
                onClick={() => {
                  resendOtp();
                }}
              >
                Resend OTP
              </button>
            </div>{" "}
          </form>
        </section>
      </AuthLayout>
    </OTPStyle>
  );
};

export default OTP;
