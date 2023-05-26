import { useEffect, useState } from "react";
import { useMemo } from "react";

import Card from "./self-components/Card";
import Modal from "./self-components/Modal";

function Layout({ cards }) {
  const [isVisible, setModalState] = useState(false);
  const [activeCardId, setCardId] = useState(null);
  const [cardContent, setCardContent] = useState(null);

  useEffect(() => {
    // Double twice, why?
    console.log("activeCardId is changed");

    let content = null;

    if (activeCardId) {
      content = {
        title: `Title card with id ${activeCardId}`,
        subTitle: "Subtitle",
        comments: [],
      };
    }

    setCardContent(content);
  }, [activeCardId]);

  const contentTemplate = (
    <div>
      <h1>{cardContent?.title}</h1>
      <h2>{cardContent?.subTitle}</h2>

      <div>Comments will be here</div>
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

    return cards.map(({ id, img, title }) => {
      const randomIndex = Math.ceil(Math.random() * 3);
      const cardType = cardTypeConfig[randomIndex];

      return (
        <Card
          key={id}
          config={{ id, cardType, img, title }}
          onClick={handleCardClick}
        />
      );
    });
  }, [cards]);

  return (
    <div>
      <Modal
        isVisible={activeCardId && isVisible}
        closeModal={closeModal}
        content={contentTemplate}
      />
      <div className="container">{cardItems}</div>
    </div>
  );
}

export default Layout;
