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
import { countryCodes } from '../constant/countryCode';
import useInitiateCall from '../Hooks/initiateCall';


const CallInitiateForm = () => {
    const navigate = useNavigate(); // Initialize navigate function
    const [name, setName] = useState(''); // Added state for name
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [selectedBot, setSelectedBot] = useState('');
    const [countryCode, setCountryCode] = useState(''); // Added state for country code
    const [mobileNumber, setMobileNumber] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const [modalOpen, setModalOpen] = useState(false);
    const [animateCheckCircle, setAnimateCheckCircle] = useState(false); // State for animation

    const { isLoading, callResponse, error, initiateCall } = useInitiateCall(); // Get states and function from hook

    const languages = ["English", "Spanish", "French", "German", "Chinese", "Japanese", "Korean"];
    const bots = ["Cencus Bot"];

    const validateForm = () => {
        const errors = {};
        if (!name) {
            errors.name = 'Please enter your name.';
        }
        if (!selectedBot) {
            errors.bot = 'Please select a bot.';
        }
        if (!countryCode) {
            errors.countryCode = 'Please select a country code.';
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
        } else if (field === 'countryCode') {
            setCountryCode(value);
        }
        setFormErrors((prevErrors) => ({
            ...prevErrors,
            [field]: undefined,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length === 0) {
            setModalOpen(true); // Open modal
            setAnimateCheckCircle(false); // Reset animation state

            // Format phone number by merging countryCode and mobileNumber, removing the '+' from countryCode
            const formattedPhoneNumber = `${countryCode.replace(/[+-]/g, '')}${mobileNumber.replace(/-/g, '')}`;

            console.log(formattedPhoneNumber)
            // Call the initiateCall function from the hook with formatted data
            const callData = {
                phonenumber: formattedPhoneNumber,
                client_name: name.toLocaleLowerCase(), // Pass the name as client_name
            };

            await initiateCall(callData); // Initiate API call

            if (!error) {
                setAnimateCheckCircle(true); // Trigger success animation if no error
            } else {
                // Handle error display here if needed
                console.error('API Error:', error);
            }
        } else {
            setFormErrors(errors);
        }
    };

    const handleModalClose = () => {
        setModalOpen(false);
        setName('');
        setSelectedLanguage('');
        setSelectedBot('');
        setCountryCode('');
        setMobileNumber('');
        setFormErrors({});
        navigate(0);
    };

    return (
        <div className='wrapper'>
            <div className="form-container">
                <h1 className="form-title">Initiate a Call</h1>
                <form onSubmit={handleSubmit} className="call-initiate-form">
                    <div className="form-group">
                        <span htmlFor="name" className='label-style'>Enter Name</span>
                        <Input
                            id="name"
                            type="text"
                            placeholder="Enter Your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onFocus={() => handleFocus('name')}
                        />
                        {formErrors.name && <span className="error">{formErrors.name}</span>}
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
                        <span htmlFor="country-code-select" className='label-style'>Select Country Code</span>
                        <Select
                            id="country-code-select"
                            value={countryCode}
                            onSelect={(value) => handleSelectChange('countryCode', value)}
                            placeholder="Select Country Code"
                            onFocus={() => handleFocus('countryCode')}
                            enableSearch
                        >
                            <Popover>
                                <SelectHeader>Country Code</SelectHeader>
                                <SelectContent>
                                    <SelectList>
                                        {countryCodes.map((code, index) => (
                                            <SelectItem key={index} value={code} />
                                        ))}
                                    </SelectList>
                                </SelectContent>
                            </Popover>
                        </Select>
                        {formErrors.countryCode && <span className="error">{formErrors.countryCode}</span>}
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
            <Modal open={modalOpen} close={handleModalClose}>
                <ModalContent>
                    <ModalHeader>
                        {isLoading ? (
                            <div className='loading-container'>
                                <Lottie animationData={WaitingSvg} style={{ height: '100px', width: 'fit-content' }} />
                                <div>
                                    <span className='loading-text'>Please wait....</span>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className='check-circle-container'>
                                    <FaCheckCircle className={`check-circle ${animateCheckCircle ? 'animate' : ''}`} />
                                </div>
                                <ModalTitle className='modal-custom-header'>Call Initiated Successfully</ModalTitle>
                                <ModalDescription>
                                    The call is being initiated to {countryCode} {mobileNumber} using the {selectedBot} in {selectedLanguage}. Please wait while we connect you. You will be notified once the call is established.
                                </ModalDescription>
                                <ModalFooter>
                                    <Button className='modal-footer-btn' onClick={handleModalClose}>OK</Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalHeader>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default CallInitiateForm;
