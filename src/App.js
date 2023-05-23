import Layout from "./components/Layout";

import api from "./api/index";

export default function MyApp() {
  const { getAllCards } = api;
  const cards = getAllCards();

  return (
    <div className="root">
      <Layout cards={cards} />
    </div>
  );
}
