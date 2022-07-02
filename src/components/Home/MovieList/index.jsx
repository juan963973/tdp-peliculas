import React, { useState, useEffect } from 'react';
import ReactPaginate from "react-paginate";
import './styles.css';

import MovieItem from './MovieItem';
import { movieList } from '../../../services/movie';

const MovieList = () => {
  const [pageCount, setpageCount] = useState(0);
  const [movies, setMovies] = useState([]);
  const [limit, setLimit] = useState(10);
  const [totalItem, setTotalItem] = useState(0);

  let offset = 1;

  useEffect(() => {
    movieList(limit, offset)
      .then( (data) => {
        setMovies(data.results)
        let total = data.count
        setTotalItem(total)
        setpageCount(Math.ceil(total / limit));
      })
      .catch((e) => console.log(e));
     
  }, [limit])

  const fetchComments = async (currentPage) => {
    await movieList(limit, currentPage)
    .then( (data) => {
      setMovies(data.results)
    })
    .catch((e) => console.log(e));
  }

  const handlePageClick = (data) => {
    let currentPage = data.selected + 1;
    const commentsFormServer = fetchComments(currentPage);
  }

  const handleLimit = (e) => {
    setLimit(e.target.value)
  }

  return (
    <>
      <div className='row'>
        <div className='col-4'></div>
        <div className='col-4'>
          <ReactPaginate
            previousLabel={"Atrás"}
            nextLabel={"Siguiente"}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={"pagination justify-content-center"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            activeClassName={"active"}
          />
        </div>
        <div className='col-4'>
          <div className="row g-3 align-items-center">
            <div className="col-auto">
              <label for="inputPassword6" className="col-form-label">Mostrar</label>
            </div>
            <div className="col-auto">
              <select className="form-select" onChange={handleLimit}>
                <option value="5">5</option>
                <option value="10" selected>10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
            </div>
            <div className="col-auto">
              <span id="passwordHelpInline" className="form-text">
                Mostrando {limit} de {totalItem} Registros
              </span>
            </div>
          </div>

        </div>
      </div>
      <div className='movieList-wrap'>
        {movies.map((movie) => (
          <MovieItem movie={movie} />
        ))}
      </div>
    </>
  );
};

export default MovieList;
