const helpers = {
  generateCommentsFormat: (comments) => {
    return comments.map((comment) => {
      return {
        profileImg:
          "https://i.pinimg.com/236x/ae/b0/2f/aeb02fe5d0f294114aab9a0d5a05ec56.jpg",
        text: comment.body,
      };
    });
  },
};

export default helpers;
