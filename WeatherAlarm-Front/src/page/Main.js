import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setKey, setEmail } from "../Store";
import { useNavigate } from "react-router";
import EmailInput from "../components/EmailInput";
import Button from "../components/Button";
import axios from 'axios';
import CheckModal from "../components/CheckModal";
import '../css/Main.css';

function Main() {
    const email = useSelector(state => state.main.email);
    const key = useSelector(state => state.main.key);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        dispatch(setEmail(e.target.value));
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleCheck = async () => {
        if (!email) {
            alert("이메일을 입력해 주세요.");
            return;
        }

        if (!validateEmail(email)) {
            alert("올바른 이메일 형식을 입력해 주세요.");
            return;
        }
        
        try {
            const response = await axios.get(`http://localhost:8080/v1/weather-mappings/key`, {
                params: { email }
            });
    
            // 이메일로 조회되는 키값이 있으면 업데이트, 없으면 등록 여부 확인 모달
            if (response.data) {
                dispatch(setKey(response.data))
            } else {
                setIsModalOpen(true);
            }
        } catch (error) {
            setIsModalOpen(true)
        }
    };
    
    useEffect(() => {
        if (key) {
            navigate('/update');
        }
    }, [key]);

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const onConfirm = () => {
        navigate('/save', { state: { email: email } }); // 이메일을 state로 전달
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
                    <EmailInput email={email} onChange={handleEmailChange} />
                    <div className="form-group" style={{ width: 300 }}>
                        <div className="mt-4 mb-4">
                            <Button label={'확인'} onClick={handleCheck} className={"btn-primary"} />
                        </div>
                    </div>
                </div>
            </div>
            <CheckModal isOpen={isModalOpen} onClose={closeModal} onConfirm={onConfirm} />
        </div>
    );
}

export default Main;
