const CommentList = ({
  comment,
  deleteComment,
  peliculaId,
}) => {
  const fiveMinutes = 300000;
  const timePassed = new Date() - new Date(comment.creado) > fiveMinutes;
  const canDelete = !timePassed;
  const createdAt = new Date(comment.creado).toLocaleDateString();
  return (
    <div key={comment.id} className="comment">
      <div className="comment-image-container">
        <img src="/user-icon.png" />
      </div>
      <div className="comment-right-part">
        <div className="comment-content">
          <div className="comment-author">{comment.usuario.first_name} {comment.usuario.last_name}</div>
          <div>{createdAt}</div>
        </div>
        <div className="comment-text">{comment.mensaje}</div>
        <br/>
        {comment.calificacion != null && <div className="">Calificacion: {comment.calificacion}</div>}
        <div className="comment-actions">
          {canDelete && (
            <div
              className="comment-action"
              onClick={() => deleteComment(comment.id)}
            >
              Eliminar
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentList;
