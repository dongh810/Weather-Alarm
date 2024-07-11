import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setKey, setEmail } from "../Store";
import LocationSelect from "../components/LocationSelect";
import TimeSelect from "../components/TimeSelect";
import EmailInput from "../components/EmailInput";
import axios from 'axios';
import '../css/Main.css';
import Button from "../components/Button";

function Update() {
    const keyObject = useSelector(state => state.main.key); // key가 객체로 들어오는 경우
    const email = useSelector(state => state.main.email);
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLocationSelect = (locationId) => {
        setSelectedLocation(locationId);
    };

    const handleTimeSelect = (hour) => {
        setSelectedTime(hour);
    };

    useEffect(() => {
        const savedEmail = localStorage.getItem('email');
        const savedKey = localStorage.getItem('key');
        if (savedEmail) {
            dispatch(setEmail(savedEmail));
        }
        savedKey && dispatch(setKey(JSON.parse(savedKey)));
    }, [dispatch]);

    const handleUpdate = async () => {
        try {
            const key = keyObject.key; // 객체 안의 key 속성에 접근
            const jsonData = {
                email,
                cityCode: selectedLocation,
                alarmTime: selectedTime
            }
            console.log(key); // key의 값을 출력

            const response = await axios.put(`http://localhost:8080/v1/weather-mappings/${key}`, jsonData);
            alert('수정을 완료하였습니다!');
        } catch (error) {
            console.log('저장 실패', error)
        }
    };

    const handleCancel = () => {
        dispatch(setKey(""))
        navigate('/');
    };

    const handleDelete = async () => {
        try {
            const confirmed = window.confirm('삭제하시겠습니까?');
            if(confirmed) {
                const key = keyObject.key; // 객체 안의 key 속성에 접근
                const response = await axios.delete(`http://localhost:8080/v1/weather-mappings/${key}`);
                dispatch(setKey(""))
                dispatch(setEmail(""))
                localStorage.removeItem('key');
                localStorage.removeItem('email');
                alert('삭제되었습니다!');
                navigate('/');
            }
            
        } catch (error) {
            console.log('삭제 실패', error);
        }
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

    console.log('key', keyObject);
    console.log('email', email);

    return (
        <div className="main" style={mainStyle}>
            <div className="content">
                <h1 className="mt-4 mb-4">Weather-Alarm</h1>
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <EmailInput email={email} disabled />
                    <LocationSelect onSelect={handleLocationSelect} />
                    <TimeSelect onSelect={handleTimeSelect} />
                    <div className="form-group" style={{ width: 300 }}>
                        <div className="d-flex justify-content-between mt-4 mb-4">
                            <Button label={'수정'} onClick={handleUpdate} className={"btn-primary"} />
                            <Button label={'취소'} onClick={handleCancel} className={"btn-secondary"} />
                            <Button label={'삭제'} onClick={handleDelete} className={"btn-danger"} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Update;

