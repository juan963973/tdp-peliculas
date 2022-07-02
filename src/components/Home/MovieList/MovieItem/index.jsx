import React from 'react';
import { Link } from 'react-router-dom';
import Chip from '../../../common/Chip';
import './styles.css';

const MovieItem = ({
  movie: {
    titulo,
    etiquetas,
    id,
  },
}) => {
  return (
    <div className='movieItem-wrap'>
      <Link className='movieItem-link' to={`/movie/${id}`}>
        <img className='movieItem-cover' src='https://forum.obsidian.md/uploads/default/original/2X/a/abb8faadfc016cb123b92214868fd0197b10c33c.png' alt='cover' />
        <Chip label={etiquetas} />
        <h3>{titulo}</h3>
      </Link>
    </div>
  );
};

export default MovieItem;
