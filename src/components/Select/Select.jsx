import React, { useRef, createContext, useContext, useState, useEffect } from 'react';
import { IoCheckmarkOutline } from "react-icons/io5";
import './Select.css'
const SelectContext = createContext();

const Select = ({ children, value = "", onSelect, placeholder = "Select", enableSearch = false }) => {
    const [popoverOpen, setPopoverOpen] = useState(false);
    const [placeAbove, setPlaceAbove] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const popOverRef = useRef(null);

    const handlePopover = () => {
        setPopoverOpen(!popoverOpen);
    };

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleInputFocus = () => {
        if (!popoverOpen) {
            setPopoverOpen(true);
        }
    };

    const handleClickOutside = (event) => {
        if (popOverRef.current && !popOverRef.current.contains(event.target)) {
            setPopoverOpen(false);
        }
    };

    useEffect(() => {
        if (popoverOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [popoverOpen]);

    useEffect(() => {
        if (searchQuery === "") {
            onSelect("")
        }
    }, [searchQuery])

    return (
        <SelectContext.Provider value={{ placeAbove, setPlaceAbove, popOverRef, value, onSelect, setPopoverOpen, placeholder, searchQuery, setSearchQuery }}>
            <div className='select-container' ref={popOverRef}>
                {
                    !enableSearch ?
                        <button
                            className="select-button"
                            type="button"
                            onClick={handlePopover}
                        >
                            <span>{value || placeholder}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="select-icon"><path d="m7 15 5 5 5-5"></path><path d="m7 9 5-5 5 5"></path></svg>
                        </button>
                        :
                        <input
                            type="text"
                            className="select-input"
                            value={searchQuery === "" ? value : searchQuery}
                            onFocus={handleInputFocus}
                            onChange={handleInputChange}
                            placeholder={placeholder}
                        />
                }

                {popoverOpen && children}
            </div>
        </SelectContext.Provider>
    )
}

const usePopOver = () => useContext(SelectContext);

const Popover = ({ children, className = "" }) => {
    const { placeAbove, setPlaceAbove, popOverRef } = usePopOver();

    const handleScroll = () => {
        if (popOverRef.current) {
            const rect = popOverRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;

            setPlaceAbove(rect.bottom + 300 > windowHeight && rect.top > 300); // Adjust the threshold as needed
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={`popover ${placeAbove ? 'popover-above' : 'popover-below'} ${className}`}>
            <div className="popover-content">
                {children}
            </div>
        </div>
    )
}

const SelectContent = ({ children }) => {
    return (
        <div className='select-content'>
            {children}
        </div>
    )
}

const SelectHeader = ({ children }) => {
    return (
        <div className='select-header'>
            <h2 className="header-text">{children}</h2>
        </div>
    )
}

const SelectList = ({ children }) => {
    return (
        <div className='select-list custom-scrollbar'>
            {children}
        </div>
    )
}

const SelectItem = ({ value }) => {
    const { onSelect, setPopoverOpen, value: selectedValue, placeholder, searchQuery, setSearchQuery } = usePopOver();

    const handleSelect = () => {
        if (searchQuery) {
            if (selectedValue === value) {
                onSelect("")
                setSearchQuery("")
            } else {
                onSelect(value)
                setSearchQuery(value)
            }
        }
        else {
            if (selectedValue === value) {
                onSelect(placeholder); // Deselect if already selected
            } else {
                onSelect(value); // Select the new value
            }
        }
        setPopoverOpen(false); // Close the popover on select
    };

    // Filter items based on search query
    if (searchQuery && !value.toLowerCase().includes(searchQuery.toLowerCase())) {
        return null;
    }

    return (
        <div
            onClick={handleSelect}
            className='select-item'
        >
            <span className="checkmark">
                {selectedValue === value && <IoCheckmarkOutline />}
            </span>
            <span className="item-text">
                {value}
            </span>
        </div>
    )
}

export { Select, Popover, SelectContent, SelectHeader, SelectList, SelectItem };
