const helpers = {
  generateContentFormat: (cardDetails, cardImage) => {
    return {
      img: cardImage?.url || "",
      title: cardDetails.title,
      subTitle: cardDetails.body,
      comments: [],
    };
  },
};

export default helpers;
