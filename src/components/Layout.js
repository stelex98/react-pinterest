import { useEffect, useState } from "react";
import { useMemo } from "react";
import api from "../api/index";

import Card from "./self-components/Card";
import Comments from "./self-components/Comments";
import Modal from "./self-components/Modal";

function Layout({ cards }) {
  const [isVisible, setModalState] = useState(false);
  const [activeCardId, setCardId] = useState(null);
  const [cardContent, setCardContent] = useState(null);
  const [cardComments, setCardComments] = useState(null);
  const [isLoading, setLoadingStatus] = useState(false);

  useEffect(() => {
    // Double twice, why?
    let content = null;

    if (activeCardId) {
      setLoadingStatus(true);

      const cardImage = cards.find((card) => card?.id === activeCardId);

      Promise.all([
        api.getCardContent(activeCardId),
        api.getCardComments(activeCardId),
      ]).then((values) => {
        const cardContent = values[0];
        const cardComments = values[1];

        prepareCardContent(cardContent);
        prepareCardComments(cardComments);

        setLoadingStatus(false);
      });

      const prepareCardContent = (cardDetails) => {
        content = {
          img: cardImage?.url || "",
          title: cardDetails.title,
          subTitle: cardDetails.body,
          comments: [],
        };

        setCardContent(content);
      };

      const prepareCardComments = (cardComments) => {
        const preparedCardComments = cardComments.map((comment) => {
          return {
            profileImg:
              "https://i.pinimg.com/236x/ae/b0/2f/aeb02fe5d0f294114aab9a0d5a05ec56.jpg",
            text: comment.body,
          };
        });

        setCardComments(preparedCardComments);
      };
    }
  }, [activeCardId, cards]);

  const contentTemplate = (
    <div className="content-modal-container">
      <div className="content-modal-image-container">
        <img
          className="content-modal-image"
          src={cardContent?.img}
          alt="Text alt"
        />
      </div>
      <div className="content-modal-content">
        <div className="content-modal-text-container">
          <h1 className="modal-title">{cardContent?.title}</h1>
          <span className="modal-subtitle">{cardContent?.subTitle}</span>
        </div>

        <Comments comments={cardComments} />
      </div>
    </div>
  );

  const closeModal = () => {
    setModalState(false);
    setCardId(null);
  };

  const cardItems = useMemo(() => {
    const handleCardClick = (clickedCardId) => {
      setModalState(true);
      setCardId(clickedCardId);
    };

    const cardTypeConfig = {
      1: "card-small",
      2: "card-medium",
      3: "card-large",
    };

    return cards.map(({ id, url }) => {
      const randomIndex = Math.ceil(Math.random() * 3);
      const cardType = cardTypeConfig[randomIndex];

      return (
        <Card
          key={id}
          config={{ id, cardType, url }}
          onClick={handleCardClick}
        />
      );
    });
  }, [cards]);

  return (
    <div>
      <Modal
        isVisible={activeCardId && isVisible}
        isLoading={isLoading}
        closeModal={closeModal}
        content={contentTemplate}
      />
      <div className="container">{cardItems}</div>
    </div>
  );
}

export default Layout;
