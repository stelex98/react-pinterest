import statusConstants from "../constants/statusConstants";

const api = {
  getAllCards: async () => {
    try {
      const res = await fetch(
        "https://jsonplaceholder.typicode.com/albums/1/photos"
      );
      const images = await res.json();

      return images;
    } catch (err) {
      console.error("Error when getting all cards: ", err.message);
    }
  },
  getCardContent: async (id) => {
    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
      const cardDetails = await res.json();

      return cardDetails;
    } catch (err) {
      console.error(
        `Error when getting card details. Card id is: ${id}`,
        err.message
      );
    }
  },
  getCardComments: async (id) => {
    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}/comments`
      );
      const cardComments = await res.json();

      return cardComments;
    } catch (err) {
      console.error(
        `Error when getting card comments. Card id is: ${id}`,
        err.message
      );

      return err;
    }
  },
};

// Adds wrapper with read() function
const wrapPromise = (promise) => {
  let status = statusConstants.PENDING;
  let result;

  const suspend = promise().then(
    (res) => {
      status = statusConstants.SUCCESS;
      result = res;
    },
    (err) => {
      status = statusConstants.ERROR;
      result = err;
    }
  );

  return {
    read() {
      const config = {
        pending: () => {
          throw suspend;
        },
        error: () => {
          throw result;
        },
        success: () => {
          return result;
        },
      };

      return config[status]();
    },
  };
};

const dataFetch = () => {
  return {
    ...api,
    getAllCards: wrapPromise(api.getAllCards),
  };
};

export default dataFetch;
