import styled from "styled-components";

const Wrapper = styled.section`
  padding-top: 16px !important;
  padding-bottom: 40px !important;
  background-color: var(--accent-white);

  @media screen and (min-width: 640px) {
    padding-bottom: 64px !important;
  }
  @media screen and (min-width: 1024px) {
    padding-bottom: 88px !important;
  }

  section {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const TabsHeader = styled.ul`
  margin: 0 auto;
  list-style-type: none;
  background: #f6f6f6;
  border: 1px solid #ededf2;
  border-radius: 16px;
  max-width: 248px;
  padding: 8px;
  display: inline-flex;
  align-items: center;
`;

const TabPanel = styled.li`
  button {
    padding: 8px 28px;
    font-weight: 500;
    font-size: 14px;
    line-height: 170%;
    color: #99a0ae;
    text-align: center;

    &.active {
      background: #ffffff;
      box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.05);
      border-radius: 8px;
      color: #151e28;
    }
  }
`;

const TabBody = styled.ul`
  display: flex;
  list-style-type: none;
  margin-top: 56px;
  flex-direction: column;
  width: 100%;
  margin-left: auto;
  margin-right: auto;

  & > li {
    &:first-child {
      margin-bottom: 30px;
    }
  }

  @media screen and (min-width: 960px) {
    flex-direction: row;
    justify-content: center;
    align-items: center;
    & > li {
      &:first-child {
        margin-bottom: 0px;
        margin-right: 30px;
      }
    }
  }
`;

export const TabsStyles = {
  Wrapper,
  TabsHeader,
  TabPanel,
  TabBody,
};
