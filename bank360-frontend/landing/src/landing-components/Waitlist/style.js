import styled from "styled-components";

const Container = styled.div`
  .waitlist-section {
    display: flex;
    flex-direction: row; 
    justify-content: center;
    align-items: center;
    padding: 20px;
    background: radial-gradient(circle, #34215c 0%, #2c2c7e 100%);
    color: white;
    margin: 0 auto;

    @media screen and (max-width: 950px) {
      flex-direction: column-reverse;
    }
  }

  .waitlist-content {
    text-align: center;
    margin-bottom: 20px;
    width: 90%;
    max-width: 600px;
  }

  .waitlist-content h2 {
    font-size: 4rem;
    margin-bottom: 15px;
    color: #ffffff;

    @media (max-width: 400px) {
      font-size: 2.5rem;
    }
  }

  .waitlist-content p {
    font-size: 1.6rem;
    color: #dddddd;
    margin-bottom: 20px;
    max-width: 400px;
    margin: 0px auto;
    margin-bottom: 2rem;
  }

  .waitlist-form {
    display: flex;
    flex-direction: row;
    width: 100%;
    max-width: 500px;
    justify-content: center;
    align-items: center;

    @media (min-width: 600px) {
      flex-direction: row;
      margin: 0px auto;
      width: 80%;
    }

    @media (min-width: 900px) {
      width: 70%;
      margin: 0px auto;

    }
  }

  .waitlist-form input {
    padding: 15px;
    font-size: 1.6rem;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 10px 0px 0px 10px;
    background: rgba(255, 255, 255, 0.1);
    color: #ffffff;
    width: 100%;

    @media (min-width: 600px) {
      margin-bottom: 0;
      border-radius: 10px 0 0 10px; /* Adjust for row layout */
      width: 70%;
    }
  }

  .waitlist-form input::placeholder {
    color: #ffffff;
  }

  .waitlist-form button {
    padding: 15px;
    font-size: 1.6rem;
    border: none;
    border-radius: 0px 10px 10px 0px;
    background-color: #ffffff;
    color: #383874;
    cursor: pointer;
    font-weight: bold;
    transition: all 0.3s;
    width: 20%;

    &:hover {
      background-color: #01a0c6;
      color: #ffffff;
    }

    @media (min-width: 600px) {
      margin-top: 0;
      border-radius: 0 10px 10px 0; /* Adjust for row layout */
      width: 30%;
    }
  }

  .waitlist-image {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;

    img {
      width: 100%;
      max-width: 300px;
      height: auto;
      border-radius: 15px;
    }
  }
`;

export const WaitlistStyles = {
  Container,
};

// etiosa
// surulere
// lagos mainland
// island
// apapa
// change ypp.com to ypp.ng
// make navbar fixed
