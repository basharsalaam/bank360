export interface IButtonProps {
    children?: React.ReactNode;
    themeColor?: string;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
}
