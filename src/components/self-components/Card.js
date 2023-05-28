function Card({ config, onClick }) {
  const { id, url, cardType } = config;

  const handleClick = () => {
    onClick(id);
  };

  return (
    <div className={`${cardType} card-container`} onClick={handleClick}>
      <div className="card-image-container">
        <picture>
          <source srcSet={url} className="card-image" />
          <img className="card-image" src={url} alt="Alt text" />
        </picture>
      </div>
    </div>
  );
}

export default Card;
