import { useFormik } from "formik";
import { FC, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Loader from "../../frontend-components/Loader/Loader";
import OtpInput from "../../frontend-components/OTPInput/OTPInput";

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
  const [otp, setOtp] = useState(Array(6).fill("")); 
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

  const handleChange = (val: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = val; // Update the specific index with the new value
    setOtp(newOtp); // Update the state with the new OTP array

    // Move to the next input if the current one is filled
    if (val && index < otp.length - 1) {
        const nextInput = document.querySelector(`input:nth-child(${index + 2})`) as HTMLInputElement; // Type assertion
        if (nextInput) {
            nextInput.focus(); // Now TypeScript recognizes focus() as valid
        }
    }
};

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

  const allFieldsFilled = otp.every((digit) => digit !== "*"); 

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
            An OTP (One Time Password) was sent to your mail, input the OTP to continue
          </p>
          <form action="" className="auth-form" onSubmit={formik.handleSubmit}>
            <OtpInput
              placeholder="*"
              value={otp}
              handleChange={handleChange}
            />
            <button
              type="submit"
              className="auth-button"
              disabled={loading || !allFieldsFilled} 
            >
              {loading ? <Loader noPadding={true} /> : "Send"}
            </button>

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
            </div>
          </form>
        </section>
      </AuthLayout>
    </OTPStyle>
  );
};

export default OTP;
