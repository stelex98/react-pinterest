import Loader from "./Loader";

function Modal({ isVisible, isLoading, closeModal, content }) {
  const visibilityAnimation = {
    opacity: !isVisible ? "0" : "1",
    transition: "all .2s",
    visibility: !isVisible ? "hidden" : "visible",
  };

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
    <div className="modal-wrapper" style={visibilityAnimation}>
      <div className="modal-container">
        {visibleContent}

        {closeButton}
      </div>
      <div className="modal-overlay" />
    </div>
  );
}

export default Modal;
