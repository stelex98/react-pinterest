function Comments({ comments }) {
  if (!comments?.length) return;

  const commentsArr = comments.map((comment) => {
    return (
      <div className="comment-container" key={comment?.text}>
        <div className="profile-image-container">
          <img
            className="profile-image"
            src={comment?.profileImg}
            alt="Profile icon"
          />
        </div>
        <div className="profile-text-container">
          <span className="profile-text">{comment?.text}</span>
        </div>
      </div>
    );
  });

  return (
    <div>
      <span className="comments-title">Comments:</span>
      <div className="comments-section">{commentsArr}</div>
    </div>
  );
}

export default Comments;
