import * as yup from "yup";

export const profileValidationSchema = yup.object().shape({
    first_name: yup.string().required("First name is required"),
    last_name: yup.string().required("Last name is required"),
    email: yup
        .string()
        .email("This email address is not valid")
        .required("Email address is required"),
    phone_no: yup.string().required("Phone number is required"),
});
