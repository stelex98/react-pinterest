import Layout from "./components/Layout";
import SkeletonLayout from "./components/self-components/skeleton/SkeletonLayout";

import api from "./api/index";

import { useEffect, useState } from "react";

export default function MyApp() {
  const [allCards, setAllCards] = useState([]);
  const [isLoading, setLoadingStatus] = useState([]);

  // WTF with mounted?! and double calls
  useEffect(() => {
    setLoadingStatus(true);

    const getAllCards = async () => {
      const cards = await api.getAllCards();

      setAllCards(cards);

      setLoadingStatus(false);
    };

    getAllCards();
  }, []);

  const content = isLoading ? <SkeletonLayout /> : <Layout cards={allCards} />;

  return <div className="root">{content}</div>;
}
