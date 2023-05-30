import Loader from "./Loader";

function Modal({ isVisible, isLoading, closeModal, content }) {
  if (!isVisible) return;

  const visibleContent = isLoading ? (
    <div className="loader-container">
      <Loader />
    </div>
  ) : (
    <div className="modal-content">{content}</div>
  );

  const closeButton = (
    <button className="modal-close-button" onClick={closeModal}>
      &#10006;
    </button>
  );

  return (
    <div className="modal-wrapper">
      <div className="modal-container">
        {visibleContent}

        {closeButton}
      </div>
      <div className="modal-overlay" />
    </div>
  );
}

export default Modal;
