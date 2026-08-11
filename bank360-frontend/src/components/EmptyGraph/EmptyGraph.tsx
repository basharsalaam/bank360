import { FC } from "react";
import { Illustrations } from "../../assets/Illustrations";
import { EmptyGraphContainer } from "./EmptyGraph.style";

export const EmptyGraph: FC<IProps> = ({ children }) => {
  return (
    <EmptyGraphContainer>
      <Illustrations.EmptyIllustration />
      {children || <p>{"There is no data for this period"}</p>}
    </EmptyGraphContainer>
  );
};

interface IProps {
  text?: JSX.Element;
}
