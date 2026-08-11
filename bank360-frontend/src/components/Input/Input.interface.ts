export interface IInputProps {
    label: string;
    type: "text" | "password" | "email" | "tel";
    keyValue: string;
    formik: any;
    showPasswordStrength?: boolean;
    width?: string;
    required?: boolean;
    disabled?: boolean;
}
