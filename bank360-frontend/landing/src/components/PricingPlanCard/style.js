import styled from "styled-components";
import checkIcon from "./../../assets/icons/check.svg";

const Wrapper = styled.div`
  background-color: white;
  border: 1px solid #ededf2;
  border-radius: 10px;
  padding: 24px;
  margin: 0 auto;

  @media screen and (min-width: 720px) {
    width: 340px;
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 24px;
  border-bottom: 1px solid #ededf2;

  h3 {
    font-weight: 600;
    font-size: 2.4rem;
    line-height: 32px;
    color: #1e1e2f;
  }

  p {
    font-weight: 400;
    font-size: 1.4rem;
    line-height: 22px;
    color: #535379;
    margin-top: 4px;
  }

  h1 {
    font-weight: 700;
    font-size: 4rem;
    line-height: 50px;
    color: #151e28;
  }
`;

const CardBody = styled.div`
  padding-top: 24px;
  border-top: 1px solid #ededf2;

  li {
    position: relative;
    list-style-type: none;
    font-weight: 400;
    font-size: 1.6rem;
    line-height: 24px;
    color: #5f5f8c;
    margin-bottom: 24px;

    &:before {
      content: url(${checkIcon});
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      margin-right: 8px;
    }
  }
`;

const ChooseButton = styled.button`
  margin-top: 60px;
  background: #67adc8;
  border-radius: 10px;
  font-weight: 500;
  font-size: 1.4rem;
  line-height: 170%;
  text-align: center;
  padding: 16px;
  color: #ffffff;
  width: 100%;
`;

export const PricingPlanCardStyles = {
  Wrapper,
  CardHeader,
  CardBody,
  ChooseButton,
};
