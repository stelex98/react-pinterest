import { memo, useEffect, useRef } from "react";
import useTabComposable from "../../composables/useTabComposable";

import Loader from "./Loader";

function Modal({ isLoading, closeModal, content }) {
  const { initTabHandle, destroyTabHandle } = useTabComposable();

  const modalContainer = useRef();

  useEffect(() => {
    if (!isLoading && content) {
      initTabHandle(modalContainer?.current);
    }

    return () => {
      destroyTabHandle();
    };
  }, [isLoading, content, initTabHandle, destroyTabHandle]);

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
