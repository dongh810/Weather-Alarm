const locations = [
    { name: '서울', id: 1835848 },
    { name: '부산', id: 1838524 },
    { name: '인천', id: 1843564 },
    { name: '대구', id: 1835327 },
    { name: '대전', id: 1835235 },
    { name: '광주', id: 1841811 },
    { name: '울산', id: 1833742 },
];

const LocationSelect = ({ onSelect }) => {
    return (
        <div className="form-group mt-4" style={{ width: 300 }}>
            <label style={{ fontWeight: "bold" }}>조회할 지역</label>
            <select className="form-control mt-2" onChange={(e) => onSelect(e.target.value)}>
                <option value="">지역을 선택해주세요</option>
                {locations.map((location) => (
                    <option key={location.id} value={location.id}>
                        {location.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default LocationSelect;
