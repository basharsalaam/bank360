// Imports
import { PricingPlanCardStyles } from "./style";

// Destructure imports
const { Wrapper, CardHeader, CardBody, ChooseButton } = PricingPlanCardStyles;

const PricingPlanCard = ({ type, plan, price, features }) => {
  return (
    <Wrapper>
      <CardHeader>
        <div>
          <h3>{type}</h3>
          <p>{plan}</p>
        </div>
        <h1>${price}</h1>
      </CardHeader>

      <CardBody>
        <ul>
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
        <ChooseButton>Choose this plan</ChooseButton>
      </CardBody>
    </Wrapper>
  );
};

export default PricingPlanCard;
