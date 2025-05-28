import '../styles/ConfirModal.css'

const ConfirmModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="confirm-modal-backdrop">
      <div className="confirm-modal">
        <p className="confirm-message">{message}</p>
        <div className="confirm-buttons">
          <button onClick={onConfirm} className="confirm-btn yes">Այո</button>
          <button onClick={onCancel} className="confirm-btn no">Ոչ</button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal
