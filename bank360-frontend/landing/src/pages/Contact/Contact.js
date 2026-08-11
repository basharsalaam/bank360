import { ContactStyles } from "./style";
import { Components } from "../../landing-components";
import { useEffect } from "react";

const { Wrapper } = ContactStyles;
const { Navbar, Contact, Waitlist, Footer } = Components;


const ContactUs = () => {
    useEffect(() => {
        window.scrollTo(0, 0); 
      }, []);

  return (
    <Wrapper>
      <Navbar/>
      <Contact/>
      <Waitlist/>
      <Footer/>

    </Wrapper>
    
  );
};

export default ContactUs;
