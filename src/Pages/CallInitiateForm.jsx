import React, { useState } from 'react';
import { Select, Popover, SelectHeader, SelectContent, SelectList, SelectItem } from '../components/Select/Select';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
import { Modal, ModalContent, ModalDescription, ModalFooter, ModalHeader, ModalTitle } from '../components/Modal/Modal';
import './CallInitiateForm.css'; // Import the CSS file for styling
import Lottie from 'lottie-react';
import WaitingSvg from '../waiting.json';
import { FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const CallInitiateForm = () => {
    const navigate = useNavigate(); // Initialize navigate function
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [selectedBot, setSelectedBot] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [animateCheckCircle, setAnimateCheckCircle] = useState(false); // State for animation

    const languages = ["English", "Spanish", "French", "German", "Chinese", "Japanese", "Korean"];
    const bots = ["Customer Support Bot", "Sales Bot", "Marketing Bot", "Feedback Bot", "Technical Bot"];

    const validateForm = () => {
        const errors = {};
        if (!selectedLanguage) {
            errors.language = 'Please select a language.';
        }
        if (!selectedBot) {
            errors.bot = 'Please select a bot.';
        }
        const phoneRegex = /^[0-9]{10}$/; // Assuming a 10-digit phone number format
        if (!mobileNumber) {
            errors.mobileNumber = 'Please enter your mobile number.';
        } else if (!phoneRegex.test(mobileNumber)) {
            errors.mobileNumber = 'Please enter a valid 10-digit mobile number.';
        }
        return errors;
    };

    const handleFocus = (field) => {
        setFormErrors((prevErrors) => ({
            ...prevErrors,
            [field]: undefined,
        }));
    };

    const handleSelectChange = (field, value) => {
        if (field === 'language') {
            setSelectedLanguage(value);
        } else if (field === 'bot') {
            setSelectedBot(value);
        }
        setFormErrors((prevErrors) => ({
            ...prevErrors,
            [field]: undefined,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length === 0) {
            setLoading(true);
            setModalOpen(true);
            setAnimateCheckCircle(false); // Reset animation state

            setTimeout(() => {
                setLoading(false);
                setAnimateCheckCircle(true); // Trigger animation

                // Clear all fields and navigate to /conversion after 2.5 seconds
                setTimeout(() => {
                    setSelectedLanguage('');
                    setSelectedBot('');
                    setMobileNumber('');
                    setFormErrors({});
                    setModalOpen(false); // Close modal
                    navigate('/conversion'); // Redirect to /conversion
                }, 500); // Allow a brief pause before clearing
            }, 2000);
        } else {
            setFormErrors(errors);
        }
    };

    return (
        <div className='wrapper'>
            <div className="form-container">
                <h1 className="form-title">Initiate a Call</h1>
                <form onSubmit={handleSubmit} className="call-initiate-form">
                    <div className="form-group">
                        <span htmlFor="language-select" className='label-style'>Select Language</span>
                        <Select
                            id="language-select"
                            value={selectedLanguage}
                            onSelect={(value) => handleSelectChange('language', value)}
                            placeholder="Select Language"
                            onFocus={() => handleFocus('language')}
                        >
                            <Popover>
                                <SelectHeader>Language</SelectHeader>
                                <SelectContent>
                                    <SelectList>
                                        {languages.map((language, index) => (
                                            <SelectItem key={index} value={language} />
                                        ))}
                                    </SelectList>
                                </SelectContent>
                            </Popover>
                        </Select>
                        {formErrors.language && <span className="error">{formErrors.language}</span>}
                    </div>

                    <div className="form-group">
                        <span htmlFor="bot-select" className='label-style'>Select Bot</span>
                        <Select
                            id="bot-select"
                            value={selectedBot}
                            onSelect={(value) => handleSelectChange('bot', value)}
                            placeholder="Select Bot"
                            onFocus={() => handleFocus('bot')}
                        >
                            <Popover>
                                <SelectHeader>Bot</SelectHeader>
                                <SelectContent>
                                    <SelectList>
                                        {bots.map((bot, index) => (
                                            <SelectItem key={index} value={bot} />
                                        ))}
                                    </SelectList>
                                </SelectContent>
                            </Popover>
                        </Select>
                        {formErrors.bot && <span className="error">{formErrors.bot}</span>}
                    </div>

                    <div className="form-group">
                        <span htmlFor="mobile-number" className='label-style'>Enter Mobile Number</span>
                        <Input
                            id="mobile-number"
                            type="text"
                            placeholder="Enter Mobile Number"
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value)}
                            onFocus={() => handleFocus('mobileNumber')}
                        />
                        {formErrors.mobileNumber && <span className="error">{formErrors.mobileNumber}</span>}
                    </div>

                    <div className="form-group extra-p">
                        <Button type="submit" className="submit-button">Initiate Call</Button>
                    </div>
                </form>
            </div>

            {/* Modal Component */}
            <Modal open={modalOpen} close={() => setModalOpen(false)}>
                <ModalContent>
                    <ModalHeader>
                        {loading ? (
                            <div className='loading-container'>
                                <Lottie animationData={WaitingSvg} style={{ height: '100px', width: 'fit-content' }} />
                                <div>
                                    <span className='loading-text'>Please wait....</span>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className='check-circle-container'><FaCheckCircle className={`check-circle ${animateCheckCircle ? 'animate' : ''}`} /></div>
                                <ModalTitle className='modal-custom-header'>Call Initiated Successfully</ModalTitle>
                                <ModalDescription>
                                    The call is being initiated to {mobileNumber} using the {selectedBot} in {selectedLanguage}. Please wait while we connect you. You will be notified once the call is established.
                                </ModalDescription>
                            </>
                        )}
                    </ModalHeader>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default CallInitiateForm;
