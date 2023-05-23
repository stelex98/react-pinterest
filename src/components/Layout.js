import { useState } from "react";
import { useMemo } from "react";

import Card from "./self-components/Card";
import Modal from "./self-components/Modal";

function Layout({ cards }) {
  const [isVisible, setModalState] = useState(false);

  const content = (
    <div>
      <h1>This is Modal!</h1>
    </div>
  );

  const closeModal = () => {
    setModalState(false);
  };

  const handleCardClick = () => {
    setModalState(true);
  };

  const cardItems = useMemo(() => {
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
          config={{ cardType, img, title }}
          onClick={handleCardClick}
        />
      );
    });
  }, [cards]);

  return (
    <div>
      <Modal isVisible={isVisible} closeModal={closeModal} content={content} />
      <div className="container">{cardItems}</div>
    </div>
  );
}

export default Layout;
