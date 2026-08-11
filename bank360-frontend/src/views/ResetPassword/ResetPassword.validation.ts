import * as yup from "yup";

export const resetPasswordValidation = yup.object().shape({
    password: yup.string().required("Password is required"),
});
