import Card from "./self-components/Card";

function Layout({ cards }) {
  const cardTypeConfig = {
    1: "card-small",
    2: "card-medium",
    3: "card-large",
  };

  const cardItems = cards.map(({ id, img, title }) => {
    const randomIndex = Math.ceil(Math.random() * 3);
    const cardType = cardTypeConfig[randomIndex];

    return <Card key={id} config={{ cardType, img, title }} />;
  });

  return <div className="container">{cardItems}</div>;
}

export default Layout;
