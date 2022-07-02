import { useState, useEffect } from "react";
import './styles.css';
import ReviewList from "./ReviewList";
import {
  getReviews as getReviewsApi
} from "../../../services/movie";

const Reviews = ({ reviewsUrl, peliculaId }) => {
  const [backendReviews, setBackendReviews] = useState([]);
  const rootReviews = backendReviews;

  useEffect(() => {
    getReviewsApi(peliculaId).then((data) => {
      setBackendReviews(data);
    });
  }, []);

  return (
    <div className="reviews">
      <h3 className="reviews-title">Criticas</h3>
      <div className="reviews-container">
        { rootReviews.length > 0 ?
          rootReviews.map((rootReview) => (
            <ReviewList
              key={rootReview.id}
              review={rootReview}
              peliculaId
            />
          ))
          :
          <div style={{textAlign:'center'}}>- No hay criticas -</div>
        }
      </div>
    </div>
  );
};

export default Reviews;
