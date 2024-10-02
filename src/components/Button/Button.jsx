import React from 'react';
import './Button.css'; // Import the CSS file

const Button = ({
  title,
  onClick,
  className = "",
  children,
  ...props
}) => {
  return (
    <button
      className={`custom-button ${className}`} // Apply the custom CSS class
      onClick={onClick}
      {...props}
    >
      {title || children}
    </button>
  );
}

export default Button;
