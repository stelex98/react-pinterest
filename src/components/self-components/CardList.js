import { memo } from "react";

import Card from "./Card";

const CardList = ({ cards, setLastElement, handleCardClick }) => {
  return cards.map(({ id, url, cardType }, index) => {
    const isLastElement = index === cards.length - 1;

    const cardsContent = isLastElement ? (
      <div key={index + url} ref={setLastElement}>
        <Card
          key={`${index}-${url}`}
          cardType={cardType}
          url={url}
          id={id}
          onClick={handleCardClick}
        />
      </div>
    ) : (
      <Card
        key={`${index}-${url}`}
        cardType={cardType}
        url={url}
        id={id}
        onClick={handleCardClick}
      />
    );

    return cardsContent;
  });
};

export default memo(CardList);
