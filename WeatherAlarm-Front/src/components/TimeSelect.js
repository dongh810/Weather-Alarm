import { useState } from 'react';

const TimeSelect = ({ onSelect }) => {
    const [selectedTime, setSelectedTime] = useState('');

    const handleTimeChange = (e) => {
        const time = e.target.value;
        console.log(time);
        setSelectedTime(time);
        onSelect(time);
    };

    return (
        <div className="form-group mt-4" style={{ width: 300 }}>
            <label style={{ fontWeight: "bold" }}>알림 받을 시간</label>
            <input
                type="time"
                className="form-control mt-2"
                value={selectedTime}
                onChange={handleTimeChange}
                required
            />
        </div>
    );
};

export default TimeSelect;

