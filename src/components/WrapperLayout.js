import { useEffect, useState } from "react";

import Layout from "./Layout";
import dataFetch from "../api";

const { getAllCards, getCardsByPage } = dataFetch();

const WrapperLayout = () => {
  const [cards, setCards] = useState([]);

  // Double call?
  const allCardsResponse = getAllCards.read();

  const getCardsBySpecificPage = async (page) => {
    const newCardList = await getCardsByPage(page);

    const extendedCardList = generateCardTypeForCardList(newCardList);

    setCards((prevState) => {
      return [...prevState, ...extendedCardList];
    });
  };

  useEffect(() => {
    const extendedCardList = generateCardTypeForCardList(allCardsResponse);

    setCards(extendedCardList);
  }, [allCardsResponse]);

  return (
    <Layout cards={cards} getCardsBySpecificPage={getCardsBySpecificPage} />
  );
};

const generateCardTypeForCardList = (cards) => {
  const generateType = () => {
    const cardTypeConfig = {
      1: "card-small",
      2: "card-medium",
      3: "card-large",
    };

    const randomIndex = Math.ceil(Math.random() * 3);
    const cardType = cardTypeConfig[randomIndex];

    return cardType;
  };

  const extendedCardList = cards.map((card) => {
    return {
      ...card,
      cardType: generateType(),
    };
  });
  return extendedCardList;
};

export default WrapperLayout;
