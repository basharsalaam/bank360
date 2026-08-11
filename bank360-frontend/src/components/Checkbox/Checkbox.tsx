import { FC } from "react";
import { ICheckboxProps } from "./Checkbox.interface";
import { CheckboxStyle } from "./Checkbox.style";

/**
 * @param {Boolean} selected
 * @param {any} setSelectedValue
 * @returns {JSX} Checkbox component
 * @description Checkbox component. selectedValue is the value selected from all the radio buttons
 * setSelectedValue is the function that sets the selected value of the group to the value of this radio .
 */
const Checkbox: FC<ICheckboxProps> = ({
  selected,
  setSelected,
  name,
  label,
  className,
  update,
}) => {
  return (
    <CheckboxStyle {...{ className }}>
      <input
        type="checkbox"
        name={name}
        id={name}
        checked={selected}
        onClick={(e) => {
          e.stopPropagation();
        }}
        // Sets the current selected value
        onChange={(e) => {
          e.stopPropagation();
          setSelected(!selected);
          update && update();
        }}
      />
      <div className="checkbox"></div>
      <small>{label}</small>
    </CheckboxStyle>
  );
};

export default Checkbox;
