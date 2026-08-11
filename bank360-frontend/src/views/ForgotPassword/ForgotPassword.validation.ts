import * as yup from "yup";

export const forgotPasswordValidation = yup.object().shape({
    email: yup
        .string()
        .email("This email address is not valid")
        .required("Email address is required"),
});
