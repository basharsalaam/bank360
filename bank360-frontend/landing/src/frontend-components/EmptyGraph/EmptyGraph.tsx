import { FC } from "react";
import { Illustrations } from "../../assets/illustrations";
import { EmptyGraphContainer } from "./EmptyGraph.style";

export const EmptyGraph: FC<IProps> = ({ children }) => {
  return (
    <EmptyGraphContainer>
      {children || <p>{"There is no data for this period"}</p>}
    </EmptyGraphContainer>
  );
};

interface IProps {
  text?: JSX.Element;
  children?: React.ReactNode;
}
