export interface IOTPInputProps {
    placeholder: string;
    value: string[]; 
    handleChange: (val: string, index: number) => void; 
}