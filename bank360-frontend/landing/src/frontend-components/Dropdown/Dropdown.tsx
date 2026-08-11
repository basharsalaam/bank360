import { FC, useEffect, useRef, useState } from "react";
import { Icons } from "../../assets/icons";
import { listenForOutsideClicks } from "../../hooks/display";
import { DropdownStyle } from "./style";
import { DropdownProps } from "./Dropdown.interface";

export const DropdownComp: FC<DropdownProps> = ({ children }) => {    
    const menuRef = useRef(null);
    const [listening, setListening] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const [showDropdown, setShowDropdown] = useState(false);
    useEffect(
        listenForOutsideClicks(
            listening,
            setListening,
            menuRef,
            setShowDropdown
        )
    );
    return (
        <DropdownStyle showDropDown={showDropdown} ref={menuRef}>
            <button
                onClick={() => {
                    setShowDropdown((prev) => !prev);
                }}
            >
                <Icons.OptionsIcon />
            </button>
            <section className="dropdown">{children}</section>
        </DropdownStyle>
    );
};
