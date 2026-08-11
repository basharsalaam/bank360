import styled from "styled-components";

const Wrapper = styled.section`
  padding: 16px 0 8px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  text-align: center;
  margin: 0;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 0;
  }

  > * {
    position: relative;
    z-index: 1;
  }

  section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 32px;
    max-width: 1280px;
    margin: 0 auto;
    padding: 48px 6vw 32px;
    text-align: left;
  }

  aside {
    flex: 1 1 52%;
  }

  h1 {
    color: #fff;
    font-size: clamp(2.5rem, 5vw, 5rem);
    line-height: 1.05;
    margin: 0 0 20px;
  }

  aside > p {
    color: rgba(255, 255, 255, 0.88);
    font-size: clamp(1rem, 1.5vw, 1.25rem);
    line-height: 1.6;
    max-width: 680px;
    margin: 0 0 28px;
  }

  .btn-group {
    display: flex;
    align-items: center;
  }

  .cta {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 14px 24px;
    border-radius: 999px;
    background: #01a0c6;
    color: #fff;
    font-weight: 700;
    text-decoration: none;
    transition: background 160ms ease, transform 160ms ease;
  }

  .cta:hover {
    background: #0786a5;
    transform: translateY(-2px);
  }

  .hero {
    flex: 0 1 44%;
    max-width: 560px;
    width: 100%;
    height: auto;
  }

  .bottom-text {
    width: 100%;
    margin: 16px auto 0;
    overflow: hidden;
  }

  .bottom-text > p {
    color: rgba(255, 255, 255, 0.85);
    font-size: 0.9rem;
    margin: 0 0 12px;
    text-align: center;
  }

  .bottom-text .rfm-marquee-container {
    width: 100%;
    overflow: hidden;
  }

  .marquee-content {
    display: flex;
    align-items: center;
    gap: 48px;
    width: max-content;
    padding: 8px 24px 16px;
  }

  .marquee-content img {
    display: block;
    flex: 0 0 auto;
    width: 108px;
    height: 42px;
    object-fit: contain;
    opacity: 0.95;
  }

  .marquee-content .access,
  .marquee-content .first-bank,
  .marquee-content .fcmb,
  .marquee-content .gtbank,
  .marquee-content .uba,
  .marquee-content .kuda,
  .marquee-content .opay,
  .marquee-content .piggyvest,
  .marquee-content .wema,
  .marquee-content .stanbic,
  .marquee-content .moniepoint {
    width: 116px;
  }

  .marquee-content .zenith-bank,
  .marquee-content .ecobank,
  .marquee-content .jaiz {
    width: 100px;
  }

  @media (max-width: 800px) {
    section {
      flex-direction: column;
      padding: 40px 24px 24px;
      text-align: center;
    }

    aside > p {
      margin-left: auto;
      margin-right: auto;
    }

    .btn-group {
      justify-content: center;
    }

    .hero {
      flex-basis: auto;
      max-width: 480px;
    }

    .marquee-content {
      gap: 28px;
    }
  }
`;

export const HomeBannerStyles = { Wrapper };
