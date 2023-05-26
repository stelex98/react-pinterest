function Card({ config, onClick }) {
  const { id, img, title, cardType } = config;
  const handleClick = () => {
    onClick(id);
  };

  return (
    <div className={`${cardType} card-container`} onClick={handleClick}>
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
