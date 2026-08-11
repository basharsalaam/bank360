// Imports
import React from 'react';
import Marquee from "react-fast-marquee";
import { HomeBannerStyles } from "./style";
import { Link } from "react-router-dom";
import background from "./../../assets/images/background.png";
import hero from "./../../assets/images/hero_main.png";
import access from "./../../assets/icons/BankLogos/access.png";
import fbn from "./../../assets/icons/BankLogos/fbn.png";
import zenith from "./../../assets/icons/BankLogos/zenith.svg";
import fcmb from "./../../assets/icons/BankLogos/fcmb.png";
import ecobank from "./../../assets/icons/BankLogos/ecobank.svg";
import gtb from "./../../assets/icons/BankLogos/gtb.png";
import kuda from "./../../assets/icons/BankLogos/kuda.png";
import opay from "./../../assets/icons/BankLogos/opay.png";
import uba from "./../../assets/icons/BankLogos/uba.png";
import stanbic from "./../../assets/icons/BankLogos/stanbic.png";
import piggyvest from "./../../assets/icons/BankLogos/piggyvest.png";
import moniepoint from "./../../assets/icons/BankLogos/moniepoint.png";
import wema from "./../../assets/icons/BankLogos/wema.png";
import jaiz from "./../../assets/icons/BankLogos/jaiz.png";

const { Wrapper, HeaderText, SubHeaderText, FieldSet, LearnMoreButton } = HomeBannerStyles;

const divStyle = {
  backgroundImage: `url(${background})`,
  backgroundSize: 'cover', 
  backgroundPosition: 'center', 
  backgroundRepeat: 'no-repeat',             
};


const HomeBanner = () => {
  return (
    <Wrapper className="main-wrapper" style={divStyle}>
      <section >
        <aside>
          <HeaderText data-aos="fade-up">
          Clear and Simple Financial Management
          </HeaderText>
          <SubHeaderText data-aos="fade-up">
            Effortlessly connect all your bank accounts in one secure platform to track balances, monitor transactions, and gain insights into your spending habits in real-time.
          </SubHeaderText>
          <FieldSet className="btn-group">
            <Link to="https://app.bank360.ng">
              <a href="#" class="cta" data-aos="fade-up">Get Started →</a>
            </Link>
            {/* <Link to="/contact">
              <button className="contact-btn" data-aos="fade-up">
                Login
              </button>
            </Link> */}
          </FieldSet>
        </aside>
        <div className='hero'>
          <img className='hero' src={hero} alt="" />
        </div>
      </section>{" "}
      <div className='bottom-text'>
          <p>Connect accounts from over 100 financial institutions</p>
          <Marquee speed={30} gradient={false} >
            <div className="marquee-content">
              <img src={access} alt="access-bank" className='access'/>
              <img src={moniepoint} alt="moniepoint" className='moniepoint' />
              <img src={fbn} alt="first-bank" className='first-bank' />
              <img src={zenith} alt="zenith-bank" className='zenith-bank' />
              <img src={fcmb} alt="fcmb" className='fcmb'  />
              <img src={ecobank} alt="ecobank" className='ecobank' />
              <img src={gtb} alt="gtbank" className='gtbank' />
              <img src={uba} alt="uba" className='uba'  />
              <img src={kuda} alt="kuda" className='kuda' />
              <img src={opay} alt="opay"className='opay' />
              <img src={piggyvest} alt="piggyvest" className='piggyvest' />
              <img src={wema} alt="wema" className='wema'  />
              <img src={jaiz} alt="jaiz" className='jaiz'  />
              <img src={stanbic} alt="stanbic" className='stanbic' />
            </div>
            </Marquee>
      </div>
    </Wrapper>
  );
};

export default HomeBanner;
