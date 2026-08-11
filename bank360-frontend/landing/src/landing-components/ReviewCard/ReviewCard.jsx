import React from 'react';
import { ReviewCardContainer } from "./style";

const ReviewCard = ({ text, author, role, avatar }) => {
  return (
    <ReviewCardContainer>
      <p className="review__text">{text}</p>
      <aside className="review__footer">
        <img className="review__author--avatar" src={avatar} alt={author} />
        <div>
          <h6 className="review__author--name">{author}</h6>
          <p className="review__author--role">{role}</p>
        </div>
      </aside>
    </ReviewCardContainer>
  );
};

export default ReviewCard;
