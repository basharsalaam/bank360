// Imports
import React from 'react';
import { AccordionStyles } from "./style";
import {
  Accordion as ImportedAccordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";

// Destructure imports
const { Wrapper } = AccordionStyles;

const Accordion = ({ items }) => {
  return (
    <Wrapper>
      <ImportedAccordion allowZeroExpanded>
        {items?.map((item) => (
          <AccordionItem key={item?.uuid}>
            <AccordionItemHeading>
              <AccordionItemButton>{item?.heading}</AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>{item?.content}</AccordionItemPanel>
          </AccordionItem>
        ))}
      </ImportedAccordion>
    </Wrapper>
  );
};

export default Accordion;
