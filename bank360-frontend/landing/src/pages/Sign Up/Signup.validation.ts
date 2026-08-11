import React, { useState } from 'react';
import * as yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';

export const signUpValidation = yup.object().shape({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  email: yup.string().email("This email address is not valid").required("Email address is required"),
  phone_no: yup.string().required("Phone number is required"),
  org_name: yup.string().required("Organisation name is required"),
  password: yup.string().required("Password is required").matches(
    /(?=^(?:[^A-Z]*[A-Z]))(?=^(?:[^a-z]*[a-z]))(?=^(?:\D*\d))(?=^(?:\w*\W))^[A-Za-z\d\W]{8,}$/,
    "Must contain minimum 8 characters, one uppercase, one lowercase, one number and one special case character"
  ).min(8, "Password must be at least 8 characters")
  .test(
    "password-strength",
    "Password must include at least one uppercase letter, one number, and one special character",
    (value) =>
      /[A-Z]/.test(value || "") && // At least one uppercase letter
      /[0-9]/.test(value || "") && // At least one digit
      /[@$!%*?&#]/.test(value || "") // At least one special character
  ),
  confirm_password: yup
  .string()
  .nullable() 
  .oneOf([yup.ref("password"), null], "Passwords must match")
  .required("Confirm password is required"), // Optional: if you want to require this field
});

