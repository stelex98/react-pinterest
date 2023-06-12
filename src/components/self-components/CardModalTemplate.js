import { memo } from "react";

import Comments from "./Comments";

const CardModalTemplate = ({ image, title, subTitle, comments }) => {
  return (
    <div className="content-modal-container">
      <div className="content-modal-image-container">
        <a href="/" className="tab-element content-modal-image-wrapper">
          <img className="content-modal-image" src={image} alt="Text alt" />
        </a>
      </div>
      <div className="content-modal-content">
        <div className="content-modal-text-container">
          <h1 className="modal-title tab-element">{title}</h1>
          <span className="modal-subtitle tab-element">{subTitle}</span>
        </div>

        <Comments comments={comments} />
      </div>
    </div>
  );
};

export default memo(CardModalTemplate);
