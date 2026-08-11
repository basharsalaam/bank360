// Imports
import React from 'react';
import { CustomerReviewsStyles } from "./style";
import { Icons } from "../../assets/icons";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import { reviews } from "../../data/reviews";
import ReviewCard from "../ReviewCard/ReviewCard";
import "@splidejs/react-splide/css/core";

// Destructure imports
const { Wrapper, CardHeaderText, CardSubText } = CustomerReviewsStyles;
const { ArrowLeft, ArrowRight } = Icons;

const CustomerReviews = () => {
  return (
    <Wrapper className="main-wrapper">
      <section>
        <div className="review__list">
          <Splide
            aria-label="Reviews"
            options={{
              autoWidth: true,
              focus: "left",
              perMove: 1,
              type: "loop",
            }}
            hasTrack={false}
          >
            <div className="header__flex">
              <div className="header__flex--left">
                <CardHeaderText data-aos="fade-up">
                  Here what our customers say{" "}
                </CardHeaderText>
                <CardSubText data-aos="fade-up">
                  Analyse your cash flow with ease. Transform your business with
                  an all in one platform.
                </CardSubText>
              </div>
              <div className="header__flex--right splide__arrows">
                <button className="header__flex--right__btn splide__arrow splide__arrow--prev">
                  <ArrowLeft className="header__flex--right__icon" />
                </button>
                <button className="header__flex--right__btn splide__arrow splide__arrow--next">
                  <ArrowRight className="header__flex--right__icon" />
                </button>
              </div>
              {/* <div className="splide__arrows">
              <button className="splide__arrow splide__arrow--prev">
                Prev
              </button>
              <button className="splide__arrow splide__arrow--next">
                Next
              </button>
            </div> */}
            </div>
            <SplideTrack>
              {reviews.map((review) => (
                <SplideSlide>
                  <ReviewCard {...review} key={review.role} />
                </SplideSlide>
              ))}
            </SplideTrack>
          </Splide>
        </div>
      </section>
    </Wrapper>
  );
};

export default CustomerReviews;
