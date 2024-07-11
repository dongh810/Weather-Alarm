import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import LocationSelect from "../components/LocationSelect";
import TimeSelect from "../components/TimeSelect";
import EmailInput from "../components/EmailInput";
import axios from 'axios';
import '../css/Main.css';
import Button from "../components/Button";

function Save() {
    const location = useLocation();
    const [email, setEmail] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (location.state && location.state.email) {
            setEmail(location.state.email);
        }
    }, [location.state]);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleLocationSelect = (locationId) => {
        setSelectedLocation(locationId);
    };

    const handleTimeSelect = (hour) => {
        setSelectedTime(hour);
    };

    const handleSave = async () => {
        try {
            const jsonData = {
                email,
                cityCode: selectedLocation,
                alarmTime: selectedTime
            }

            const response = await axios.post('http://localhost:8080/v1/weather-mappings', jsonData);
            alert('저장되었습니다!');
            navigate('/');

        } catch (error) {
            console.log('저장 실패', error)
        }
    };

    const handleCancel = () => {
        navigate('/');
    };

    const mainStyle = {
        height: '100vh',
        width: '100vw',
        backgroundImage: 'url(/images/blue.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    };

    return (
        <div className="main" style={mainStyle}>
            <div className="content">
                <h1 className="mt-4 mb-4">Weather-Alarm</h1>
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <EmailInput email={email} onChange={handleEmailChange} disabled />
                    <LocationSelect onSelect={handleLocationSelect} />
                    <TimeSelect onSelect={handleTimeSelect} />
                    <div className="form-group" style={{ width: 300 }}>
                        <div className="d-flex justify-content-between mt-4 mb-4">
                            <Button label={'저장'} onClick={handleSave} className={"btn-primary"} />
                            <Button label={'취소'} onClick={handleCancel} className={"btn-secondary"} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Save;
