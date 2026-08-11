import { Dispatch, SetStateAction } from "react";
// Types for checkbox component
export interface ICheckboxProps {
    selected: boolean;
    setSelected: Dispatch<SetStateAction<boolean>>;
    label: any;
    name?: string;
    className?: string;
    update?: () => void;
}
