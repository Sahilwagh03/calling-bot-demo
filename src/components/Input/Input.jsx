import React from 'react';
import './Input.css'; // Import the CSS file

const Input = ({ type = "", placeholder = "", className = "", name, value = "", onChange ,...props}) => {
    return (
        <input 
            className={`custom-input ${className}`} // Use custom CSS class
            value={value} 
            onChange={onChange} 
            placeholder={placeholder} 
            type={type}
            name={name}
            {...props}
        />
    )
}

export default Input;
