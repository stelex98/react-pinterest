function Modal({ isVisible, closeModal, content }) {
  if (!isVisible) return null;

  return (
    <div>
      <div className="modal-container">
        <div className="modal-content">{content}</div>
        <button className="modal-close-button" onClick={closeModal}>
          &#10006;
        </button>
      </div>
      <div className="modal-overlay" />
    </div>
  );
}

export default Modal;
