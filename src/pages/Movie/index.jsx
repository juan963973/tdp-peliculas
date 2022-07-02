import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import './styles.css';
import {movieDetail} from '../../services/movie'
import EmptyList from '../../components/common/EmptyList';
import Chip from '../../components/common/Chip';
import Comments from "../../components/common/Comments/Comments";
import Reviews from "../../components/common/Reviews/Reviews";
import Header from '../../components/Home/Header';

const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [showComments, setshowComments] = useState(true);

  useEffect(() => {
    movieDetail(id)
      .then( (data) => {
        console.log(data)
        setMovie(data)
      })
      .catch((e) => console.log(e));
  }, [])

  const handleComments = () => {
    setshowComments(true)
  }

  const handleReviews = () => {
    setshowComments(false)
  }

  return (
    <>
     <Header />
      <Link className='movie-goBack' to='/' style={{marginTop:'50px'}}>
        <span> &#8592;</span> <span>Ir Atras</span>
      </Link>
      {movie ? (
        <div className='movie-wrap'>
          <header>
            <h1>{movie.titulo}</h1>
            <div className='movie-subCategory'>
              <div>
                <Chip label={movie.etiquetas} />
              </div>
            </div>
          </header>
          <img src='https://forum.obsidian.md/uploads/default/original/2X/a/abb8faadfc016cb123b92214868fd0197b10c33c.png' alt='cover' />

          <a href="javascript:void(0);" onClick={handleComments} style={{color: showComments?'blue':'black'}}>Ver Comentarios</a> 
          <a href="javascript:void(0);"  onClick={handleReviews} style={{float:'right', color:!showComments?'blue':'black'}}>Ver Criticas</a>
          {showComments ? 
              <Comments
                commentsUrl="http://localhost:3004/comments"
                peliculaId={id}
              />
              :
              <Reviews
                reviewsUrl="http://localhost:3004/comments"
                peliculaId={id}
              />
          }
          
        </div>
      ) : (
        <EmptyList />
      )}
    </>
  );
};

export default Movie;
