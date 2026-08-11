import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useRequestOtpMutation } from "../../features/services";
import React, { useEffect, useState } from "react";

export const useSendOtp = ({
  // email,
  // loading,
  setLoading,
  endpoint,
}: {
  // email: string;
  // loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  endpoint?: string;
}) => {
  const [requestOtp] = useRequestOtpMutation();
  const navigate = useNavigate();

  // If request is done
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDone(false);
  }, []);

  // ! THIS IS THE RIGHT SENDOTP FUNCTION
  const sendOtp = (email: string, startTimer?: () => void) => {
    setLoading(true);
    requestOtp({ email })
      .unwrap()
      .then((res) => {
        toast.success(
          "An OTP has been sent to your email. Please check your email."
        );
        if (endpoint) navigate(`/confirm-otp?endpoint=${endpoint}`);
        if (startTimer) {
          startTimer();
        }
      })
      .catch((err) => {
        toast.error("An error occured while sending OTP.");
      })
      .finally(() => {
        setLoading(false);
        setDone(true);
      });
  };

  // ! THIS FUNCTION IS JUST USED IN DEVELOPMENT TO BYPASS SENDING OTP

  return { sendOtp, done };
};
