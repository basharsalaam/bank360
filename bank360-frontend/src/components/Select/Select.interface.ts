export interface ISelectProps {
  placeholder: string | JSX.Element;
  name?: string;
  width?: string;
  minWidth?: string;
  selected?: ISelectOption;
  multipleSelected?: ISelectOption[];
  Icon: JSX.Element;
  options?: ISelectOption[];
  // onChange?: (e: any) => void;
  multiple?: boolean;
  style?: React.CSSProperties;
  className?: string;
  searchInput?: boolean;
  inputPlaceholder?: string;
  handleChange?: (selected: ISelectOption) => void;
  multipleHandleChange?: (newSelected: ISelectOption[]) => void;
  disabled?: boolean;
}

export interface ISelectOption {
  label: string;
  value: string;
}
