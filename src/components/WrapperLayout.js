import { useEffect, useState } from "react";

import Layout from "./Layout";
import dataFetch from "../api";

const { getAllCards, getCardsByPage } = dataFetch();

const WrapperLayout = () => {
  const [cards, setCards] = useState([]);

  const allCardsResponse = getAllCards.read();

  const getCardsBySpecificPage = async (page) => {
    const newCardsList = await getCardsByPage(page);

    setCards((prevState) => {
      return [...prevState, ...newCardsList];
    });
  };

  useEffect(() => {
    setCards(allCardsResponse);
  }, [allCardsResponse]);

  return (
    <Layout cards={cards} getCardsBySpecificPage={getCardsBySpecificPage} />
  );
};

export default WrapperLayout;
