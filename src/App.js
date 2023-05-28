import Layout from "./components/Layout";
import api from "./api/index";
import { useEffect, useState } from "react";

export default function MyApp() {
  const [allCards, setAllCards] = useState([]);

  // WTF with mounted?! and double calls
  useEffect(() => {
    let mounted = true;

    api.getAllCards().then((items) => {
      if (mounted) {
        setAllCards(items);
      }
    });

    return () => (mounted = false);
  }, []);

  return (
    <div className="root">
      <Layout cards={allCards} />
    </div>
  );
}
