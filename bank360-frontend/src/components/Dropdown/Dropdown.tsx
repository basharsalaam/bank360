import { FC, useEffect, useRef, useState } from "react";
import { Icons } from "../../assets/Icons";
import { listenForOutsideClicks } from "../../hooks/display";
import { DropdownStyle } from "./style";

export const DropdownComp: FC = ({ children }) => {
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
