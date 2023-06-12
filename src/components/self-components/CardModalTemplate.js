import { memo } from "react";

import Comments from "./Comments";

const CardModalTemplate = ({ image, title, subTitle, comments }) => {
  return (
    <div className="content-modal-container">
      <div className="content-modal-image-container">
        <div className="tab-element">
          <img className="content-modal-image" src={image} alt="Text alt" />
        </div>
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
