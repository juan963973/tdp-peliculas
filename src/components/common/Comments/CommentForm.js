import { useState } from "react";

const CommentForm = ({
  handleSubmit,
  peliculaId,
  submitLabel,
  hasCancelButton = false,
  handleCancel,
  initialText = "",
}) => {
  const [text, setText] = useState(initialText);
  const isTextareaDisabled = text.length === 0;
  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(text, peliculaId);
    setText("");
  }
  return (
    <form onSubmit={onSubmit}>
      <textarea
        style={{padding: '10px'}}
        className="comment-form-textarea"
        placeholder="Escribe tu comentario"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="comment-form-button" disabled={isTextareaDisabled}>
        {submitLabel}
      </button>
      {hasCancelButton && (
        <button
          type="button"
          className="comment-form-button comment-form-cancel-button"
          onClick={handleCancel}
        >
          Cancelar
        </button>
      )}
    </form>
  );
};

export default CommentForm;
