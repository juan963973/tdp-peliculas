import { useState, useEffect, useContext } from "react";
import './styles.css';
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import Login from "../Login";

import {UserContext} from "../../../contexts/UserContext"

import {
  getComments as getCommentsApi,
  createComment as createCommentApi,
  deleteComment as deleteCommentApi,
} from "../../../services/movie";

const Comments = ({ commentsUrl, peliculaId }) => {
  const [backendComments, setBackendComments] = useState([]);
  const [loginShow, setLoginShow] = useState(false);

  const {userName} = useContext(UserContext)

  const auth = localStorage?.getItem('auth')
  
  const rootComments = backendComments;
  const addComment = (text, peliculaId) => {
    if(userName == null) {
      setLoginShow(true)
      return 
    }
    createCommentApi(text, peliculaId).then((comment) => {
      setBackendComments([comment, ...backendComments]);
    });
  };

  const deleteComment = (commentId) => {
    if(userName == null) {
      setLoginShow(true)
      return  
    }
    
    if (window.confirm("¿Está seguro que quiere eliminar el comentario?")) {
      deleteCommentApi().then(() => {
        const updatedBackendComments = backendComments.filter(
          (backendComment) => backendComment.id !== commentId
        );
        setBackendComments(updatedBackendComments);
      });
    }
  };

  useEffect(() => {
    getCommentsApi(peliculaId).then((data) => {
      setBackendComments(data);
    });
  }, []);

  return (
    <div className="comments">

      <Login loginShow={loginShow} setLoginShow={setLoginShow}/>

      <h3 className="comments-title">Comentarios</h3>
      <CommentForm submitLabel="Comentar" handleSubmit={addComment} peliculaId={peliculaId} />
      <div className="comments-container">
        { rootComments.length > 0 ?
          rootComments.map((rootComment) => (
            <CommentList
              key={rootComment.id}
              comment={rootComment}
              deleteComment={deleteComment}
              peliculaId
            />
          ))
          :
          <div style={{textAlign:'center'}}>- No hay comentarios -</div>
        }
      </div>
    </div>
  );
};

export default Comments;
