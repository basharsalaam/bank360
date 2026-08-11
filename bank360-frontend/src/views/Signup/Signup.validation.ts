import * as yup from "yup";

export const signUpValidation = yup.object().shape({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  email: yup
    .string()
    .email("This email address is not valid")
    .required("Email address is required"),
  phone_no: yup.string().required("Phone number is required"),
  org_name: yup.string().required("Organisation name is required"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /(?=^(?:[^A-Z]*[A-Z]))(?=^(?:[^a-z]*[a-z]))(?=^(?:\D*\d))(?=^(?:\w*\W))^[A-Za-z\d\W]{8,}$/,
      "Must contain minimum 8 characters, one uppercase, one lowercase, one number and one special case character"
    ),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});
