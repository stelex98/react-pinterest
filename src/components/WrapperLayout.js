import Layout from "./Layout";
import dataFetch from "../api";

const { getAllCards } = dataFetch();

const WrapperLayout = () => {
  const allCards = getAllCards.read();

  return <Layout cards={allCards} />;
};

export default WrapperLayout;
