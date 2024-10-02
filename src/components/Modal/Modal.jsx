import React from 'react';
import './Modal.css'; // Import the custom CSS file

const Modal = ({ open, close, children }) => {
    return (
        <>
            {open && (
                <div className="modal-overlay">
                    {children}
                </div>
            )}
        </>
    );
};

const ModalContent = ({ children }) => {
    return (
        <div className="modal-content">
            {children}
        </div>
    );
};

const ModalHeader = ({ children }) => {
    return (
        <div className="modal-header">
            {children}
        </div>
    );
};

const ModalTitle = ({ children , className}) => {
    return (
        <h1 className={`modal-title ${className}`} style={{ margin: 0 }}>
            {children}
        </h1>
    );
};

const ModalDescription = ({ children }) => {
    return (
        <p className="modal-description" style={{margin:0}}>
            {children}
        </p>
    );
};

const ModalFooter = ({ children }) => {
    return (
        <div className="modal-footer">
            {children}
        </div>
    );
};

export { Modal, ModalContent, ModalTitle, ModalDescription, ModalFooter, ModalHeader };
