export interface IAuthInputProps {
    placeholder: string;
    type: "text" | "password" | "email" | "tel";
    keyValue: string;
    formik: any;
    underLink?: { link: string; text: string };
    showPasswordStrength?: boolean;
}
