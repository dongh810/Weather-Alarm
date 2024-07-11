const EmailInput = ({ email, onChange, disabled = false }) => {
    return (
        <div className="form-group mt-4" style={{ width: 300 }}>
            <label style={{ fontWeight: "bold" }}>이메일 주소</label>
            <input
                type="email" className="form-control  mt-2" value={email} onChange={onChange} placeholder="이메일을 입력해주세요" disabled={disabled}
            />
        </div>
    );
};

export default EmailInput;