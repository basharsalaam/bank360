import * as yup from "yup";

export const loginValidation = yup.object().shape({
    email: yup
        .string()
        .email("This email address is not valid")
        .required("Email address is required"),

    password: yup.string().required("Password is required"),
});
