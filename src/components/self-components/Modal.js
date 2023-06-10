import { memo, useEffect, useRef } from "react";
import tabComposable from "../../api/composables/useTabComposable";

import Loader from "./Loader";

const { initTabHandle, destroyTabHandle } = tabComposable();

function Modal({ isLoading, closeModal, content }) {
  const modalContainer = useRef();

  useEffect(() => {
    if (!isLoading && content) {
      initTabHandle(modalContainer?.current);
    }

    return () => {
      destroyTabHandle();
    };
  }, [isLoading, content]);

  const visibleContent = isLoading ? (
    <div className="loader-container">
      <Loader />
    </div>
  ) : (
    <div className="modal-content">{content}</div>
  );

  const closeButton = (
    <button className="modal-close-button tab-element" onClick={closeModal}>
      &#10006;
    </button>
  );

  return (
    <div ref={modalContainer} className="modal-wrapper modal-open">
      <div className="modal-container">
        {visibleContent}

        {closeButton}
      </div>
      <div className="modal-overlay" onClick={closeModal} />
    </div>
  );
}

export default memo(Modal);
