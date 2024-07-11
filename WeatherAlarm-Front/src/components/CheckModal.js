import '../css/CheckModal.css'
import Button from './Button';

const checkModal = ({ isOpen, onClose, onConfirm }) => {
    return (
        isOpen && (
            <>
                <div className="modal-backdrop show"></div>
                <div className="modal fade show checkModal" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                            <button type="button" className="btn-close" onClick={onClose} style={{ backgroundColor: '#ffffff', cursor: 'pointer' }}></button>

                            </div>
                            <div className="modal-body">
                                <span> 등록된 내역이 없습니다. 등록 하시겠습니까?</span>
                            </div>
                            <div className="modal-footer">
                                <Button label={'이동'} onClick={onConfirm} className={"btn-primary"} />
                                <Button label={'취소'} onClick={onClose} className={"btn-secondary"} />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    );
}

export default checkModal;