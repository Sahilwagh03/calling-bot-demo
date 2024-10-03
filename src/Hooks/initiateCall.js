import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const useInitiateCall = () => {
    const navigate = useNavigate();
    const [callResponse, setCallResponse] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const initiateCall = async (callData) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.post('http://34.93.7.152/initiate', callData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 200) {
                setCallResponse(response.data);
            }
        } catch (error) {
            setError(error.message);
            if (error.response) {
                switch (error.response.status) {
                    case 401:
                        // Handle unauthorized access (e.g., redirect to login)
                        navigate('/login');
                        break;
                    case 404:
                        // Handle not found (e.g., redirect to page not found)
                        navigate('/Page_not_found');
                        break;
                    case 500:
                        // Handle server error (e.g., redirect to server error page)
                        navigate('/Internal_server_error');
                        break;
                    default:
                        // Handle generic error
                        setError('Something went wrong');
                        break;
                }
            } else {
                setError('An unexpected error occurred. Please try again later.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const clearCallData = () => {
        setCallResponse(null);
        setError(null);
        setIsLoading(false);
    };

    return { callResponse, error, isLoading, initiateCall, clearCallData };
};

export default useInitiateCall;
