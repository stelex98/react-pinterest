import { useEffect } from "react";
import Loader from "./Loader";

function Modal({ isVisible, isLoading, closeModal, content }) {
  const visibilityAnimation = {
    opacity: !isVisible ? "0" : "1",
    transition: "all .2s",
    visibility: !isVisible ? "hidden" : "visible",
  };

  useEffect(() => {
    if (isVisible) {
      /* Remove possibility to scroll in case modal is opened */
      document.body.style.overflow = "hidden";

      return;
    }

    document.body.style.overflow = "unset";
  }, [isVisible]);

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
    <div className="modal-wrapper modal-open" style={visibilityAnimation}>
      <div className="modal-container">
        {visibleContent}

        {closeButton}
      </div>
      <div className="modal-overlay" onClick={closeModal} />
    </div>
  );
}

export default Modal;
