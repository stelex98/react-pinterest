function Card({ config }) {
  const { img, title, cardType } = config;

  return (
    <div className={`${cardType} card-container`}>
      <div className="card-image-container">
        <img className="card-image" src={img} alt="Alt text" />
      </div>
      <div>
        <span className="card-title">{title}</span>
      </div>
    </div>
  );
}

export default Card;