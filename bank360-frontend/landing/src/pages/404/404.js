import { PricingStyles } from "./style";
import { Components } from "../../landing-components";
import { useEffect } from "react";

const { Wrapper } = PricingStyles;
const { Navbar, Footer } = Components;

const Page404 = () => {

  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []);
  
  return (
    <Wrapper>
      {" "}
      <Navbar />
      <div style={{marginTop: '10rem', marginBottom:'10rem', textAlign: 'center'}}>
      <h1 style={{fontSize: '4rem'}}>404 Not Found</h1>
      <p>Sorry, We couldn't find that page.</p>
      </div>
      <Footer />
    </Wrapper>
  );
};

export default Page404;
