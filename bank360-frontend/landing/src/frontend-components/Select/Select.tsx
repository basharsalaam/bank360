import React, { FC, useEffect, useRef, useState } from "react";
import "react-phone-input-2/lib/style.css";

import { ISelectOption, ISelectProps } from "./Select.interface";
import { SelectStyle } from "./Select.style";
import {
  isObjectEmpty,
  removeObjectWithValueFromArray,
} from "../../utils/helpers";
import { Icons } from "../../assets/icons";
import { Component } from "..";
import { listenForOutsideClicks } from "../../hooks/display";

const Select: FC<ISelectProps> = ({
  placeholder,
  selected,
  children,
  multiple,
  Icon,
  style,
  className,
  width,
  options,
  searchInput,
  inputPlaceholder,
  handleChange,
  multipleSelected,
  multipleHandleChange,
  minWidth,
  disabled,
}) => {
  // value displayed in the select
  let displayedValue;
  const [showDropdown, setShowDropdown] = useState(false);

  // for single select
  if (!multiple) {
    displayedValue =
      !isObjectEmpty(selected) && selected?.value
        ? selected?.label
        : placeholder;
  } else {
    displayedValue =
      multipleSelected && multipleSelected?.length > 0 ? (
        <>
          <span className="selected-label">{multipleSelected[0].label}</span>{" "}
          {/* + */}
          {multipleSelected?.length > 1 && (
            <span className="selected-label add">
              {" "}
              + {multipleSelected?.length - 1}
            </span>
          )}{" "}
        </>
      ) : (
        placeholder
      );
  }

  const menuRef = useRef(null);
  const [listening, setListening] = useState(false);
  // const [isOpen, setIsOpen] = useState(false);
  // const toggle = () => setIsOpen(!isOpen);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(
    listenForOutsideClicks(listening, setListening, menuRef, setShowDropdown)
  );

  return (
    <SelectStyle
      showDropDown={showDropdown}
      width={width}
      style={style}
      className={className}
      multiple={multiple}
      ref={menuRef}
      minWidth={minWidth}
      disabled={disabled}
    >
      <button
        className="displayed"
        onClick={() => {
          setShowDropdown((prev) => !prev);
        }}
        disabled={disabled}
      >
        <label htmlFor=""> {displayedValue}</label> {Icon}
      </button>
      <section className="dropdown">
        {searchInput && (
          <div className="input-group">
            <input type="text" placeholder={inputPlaceholder} />
            <Icons.SearchIcon />
          </div>
        )}

        {/* select all option */}
        {multiple && (
          <button
            // if all is selected
            className={`dropdown__item ${
              multipleSelected?.length === Number(options?.length)
                ? "selected"
                : ""
            }`}
            onClick={() => {
              let newSelected = multipleSelected;
              // if all is selected
              if (multipleSelected?.length === Number(options?.length)) {
                newSelected = [];
              } else {
                newSelected = options;
              }
              multipleHandleChange &&
                multipleHandleChange(newSelected as ISelectOption[]);
            }}
          >
            <Component.Checkbox
              selected={multipleSelected?.length === Number(options?.length)}
              setSelected={() => null}
              label=""
              className="check"
              update={() => {}}
            />
            Select all
          </button>
        )}
        {options?.map((option, index) =>
          !multiple ? (
            <button
              className={`dropdown__item ${
                selected?.value === option.value ? "selected" : ""
              }`}
              onClick={() => {
                handleChange && handleChange(option);
                setShowDropdown(false);
              }}
              key={option.value + index}
            >
              {option.label}
            </button>
          ) : (
            <button
              className={`dropdown__item ${
                checkIfOptionIsSelected(option, multipleSelected)
                  ? "selected"
                  : ""
              }`}
              key={option.value + index}
              disabled={disabled}
              onClick={() => {
                let newSelected = multipleSelected;
                if (checkIfOptionIsSelected(option, multipleSelected)) {
                  newSelected = removeObjectWithValueFromArray(
                    multipleSelected as ISelectOption[],
                    option.value
                  );
                } else {
                  newSelected = [...(newSelected as ISelectOption[]), option];
                }
                multipleHandleChange &&
                  multipleHandleChange(newSelected as ISelectOption[]);
                // removeObjectWithValueFromArray(multipleSelected, )
                // setShowDropdown(false);
              }}
            >
              <Component.Checkbox
                selected={checkIfOptionIsSelected(option, multipleSelected)}
                setSelected={() => null}
                label=""
                className="check"
              />
              {option.label}
            </button>
          )
        )}
      </section>
    </SelectStyle>
  );
};

export default Select;

// /(?=^(?:[^A-Z]*[A-Z]))(?=^(?:[^a-z]*[a-z]))(?=^(?:\D*\d))(?=^(?:\w*\W))^[A-Za-z\d\W]{8,}$/;

export const checkIfOptionIsSelected = (
  option: ISelectOption,
  multipleSelected?: ISelectOption[]
) => {
  if (!multipleSelected) {
    return false;
  }
  return multipleSelected.some((selected) => selected.value === option.value);
};
