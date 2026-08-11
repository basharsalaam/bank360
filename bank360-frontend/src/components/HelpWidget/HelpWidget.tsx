import { FC, useEffect, useState } from "react";
import { Illustrations } from "../../assets/Illustrations";
import { Images } from "../../assets/Images";

const HelpWidget: FC = () => {
  const [current, setCurrent] = useState(0);

  const clsName = (num: Number) => {
    return current === num ? "selected" : "";
  };

  const changeTabs = (num: Number) => {
    setCurrent((prev) => (prev === 0 ? 1 : 0));
  };

  useEffect(() => {
    const tabChangeInterval = setInterval(() => {
      changeTabs(current);
    }, 5000);

    return () => {
      clearInterval(tabChangeInterval);
    };
  }, []);

  return current === 0 ? (
    <section className="card bottom">
      <Illustrations.ConesIllustration className="abs-top" />
      <Illustrations.ConesIllustration className="abs-btm" />
      <Illustrations.QuestionIllustration />
      <h3>How It Works?</h3>
      <p>You have 2000 sync requests</p>
      <button className="learn-more-btn">Learn More</button>
      <div className="carousel">
        <div className={clsName(0)}></div>
        <div className={clsName(1)}></div>
      </div>
    </section>
  ) : (
    <section className="card bottom news">
      <img src={Images.NewsImage} alt="News" className="news__img" />
      <div className="news__content">
        {" "}
        <h2 className="news__header">Major business headlines.</h2>
        <p className="news__body">
          Learn more about how cashflow works, and supercharge your account.
        </p>
      </div>
      <div className="carousel">
        <div className={clsName(0)}></div>
        <div className={clsName(1)}></div>
      </div>
    </section>
  );
};

export default HelpWidget;
