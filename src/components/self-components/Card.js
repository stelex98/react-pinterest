function Card({ config, onClick }) {
  const { id, img, cardType } = config;

  const handleClick = () => {
    onClick(id);
  };

  return (
    <div className={`${cardType} card-container`} onClick={handleClick}>
      <div className="card-image-container">
        <img className="card-image" src={img} alt="Alt text" />
      </div>
    </div>
  );
}

export default Card;
