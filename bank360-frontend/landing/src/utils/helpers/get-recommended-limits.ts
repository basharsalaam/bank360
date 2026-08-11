import { IRecommendedLimits } from "./../../pages/Analytics/modules/CreditScore";
export const getRecommendedLimits: (value: number) => IRecommendedLimits = (
  value
) => {
  let recommendedMap: IRecommendedLimits = {
    three: "",
    six: "",
    twelve: "",
    comments: [],
  };

  switch (true) {
    case 300 <= value && value <= 350:
      recommendedMap = {
        three: "₦10k - ₦25k",
        six: "₦25k - ₦50k",
        twelve: "₦50k - ₦100k",
        comments: [
          "To increase your score and apply for a bigger loan, you should keep a good credit balance in your account. ",
          "Your score is increased by regular deposit transactions, which can help you get a better loan.",
        ],
      };
      break;
    case 351 <= value && value <= 400:
      recommendedMap = {
        three: "₦100k - ₦125k",
        six: "₦125k - ₦150k",
        twelve: "₦150k - ₦200k",
        comments: [
          "Keep a positive credit balance in your account to increase your score and make you eligible for a bigger loan.",
          "For you to be eligible for a bigger loan, regular deposit transactions also improve your score.",
        ],
      };
      break;
    case 401 <= value && value <= 450:
      recommendedMap = {
        three: "₦200k - ₦215k",
        six: "₦215k - ₦250k",
        twelve: "₦250k - ₦300k",
        comments: [
          "To grow your score and be eligible for quite a bigger loan, simply keep a good credit balance on your account.",
          "Your score is also improved by regular deposit transactions, which will help you get a better loan.",
        ],
      };
      break;
    case 451 <= value && value <= 500:
      recommendedMap = {
        three: "₦300k - ₦315k",
        six: "₦315k - ₦350k",
        twelve: "₦350k - ₦400k",
        comments: [
          "A larger credit transaction can help your average credit balance and raise your score, making you more creditworthy and deserving of a larger loan.",
          "Your chances of a higher score and your eligibility for higher credits both increase with lesser debit transactions.",
        ],
      };
      break;
    case 501 <= value && value <= 550:
      recommendedMap = {
        three: "₦400k - ₦415k",
        six: "₦415k - ₦450k",
        twelve: "₦450k - ₦500k",
        comments: [
          "For higher creditworthiness, you may also raise your score by having a bigger average credit balance.",
          "Kindly extend or maintain the rate regardless of your inflow rate so that you can get a bigger loan.",
        ],
      };
      break;
    case 551 <= value && value <= 600:
      recommendedMap = {
        three: "₦500k - ₦515k",
        six: "₦515k - ₦550k",
        twelve: "₦550k - ₦600k",
        comments: [
          "To increase your score and apply for a bigger loan, you should keep a good credit balance in your account. ",
          "Your score is increased by regular deposit transactions, which can help you get a better loan.",
        ],
      };
      break;
    case 601 <= value && value <= 650:
      recommendedMap = {
        three: "₦600k - ₦615k",
        six: "₦615k - ₦650k",
        twelve: "₦650k - ₦700k",
        comments: [
          "To increase your score and apply for a bigger loan, you should keep a good credit balance in your account. ",
          "Your score is increased by regular deposit transactions, which can help you get a better loan.",
        ],
      };
      break;
    case 651 <= value && value <= 700:
      recommendedMap = {
        three: "₦700k - ₦715k",
        six: "₦715k - ₦750k",
        twelve: "₦750k - ₦800k",
        comments: [
          "To increase your score and apply for a bigger loan, you should keep a good credit balance in your account. ",
          "Your score is increased by regular deposit transactions, which can help you get a better loan.",
        ],
      };
      break;
    case 701 <= value && value <= 750:
      recommendedMap = {
        three: "₦800k - ₦815k",
        six: "₦815k - ₦850k",
        twelve: "₦850k - ₦900k",
        comments: [
          "To increase your score and apply for a bigger loan, you should keep a good credit balance in your account. ",
          "Your score is increased by regular deposit transactions, which can help you get a better loan.",
        ],
      };
      break;
    case 751 <= value && value <= 800:
      recommendedMap = {
        three: "₦900k - ₦14k",
        six: "₦915k - ₦949k",
        twelve: "₦950k - ₦999k",
        comments: [
          "To increase your score and apply for a bigger loan, you should keep a good credit balance in your account. ",
          "Your score is increased by regular deposit transactions, which can help you get a better loan.",
        ],
      };
      break;
    case 801 <= value && value <= 850:
      recommendedMap = {
        three: "₦1m - ₦1.14m",
        six: "₦1.15m - ₦1.49m",
        twelve: "₦1.50m - ₦2m",
        comments: [
          "To increase your score and apply for a bigger loan, you should keep a good credit balance in your account. ",
          "Your score is increased by regular deposit transactions, which can help you get a better loan.",
        ],
      };
      break;
    default:
      recommendedMap = { three: "", six: "", twelve: "", comments: [] };
  }

  return recommendedMap;
};

// If the score is from 300 - 350

// 3 months:  10k - 24k

// 6 months:  25k - 49k

// 12 months:   50k - 100k

// If the score is from 351 - 400

// 3 months:  100k - 124k

// 6 months:   125k - 149k

// 12 months:   150k - 199k

// If the score is from 401 - 450

// 3 months:   200k - 214k

// 6 months:   215k -249k

// 12 months:  250k - 299k

// If the score is from 451 - 500

// 3 months:  300k - 314k

// 6 months:   315k - 349k

// 12 months:  350k - 399k

// If the score is from 501 - 550

// 3 months:  400k - 414k

// 6 months:   415k - 449k

// 12months:  450k - 499k

// If the score is from 551 - 600

// 3months:  500k - 514k

// 6 months:   515k - 549k

// 12 months:  550k - 599k

// If the score is from 601 - 650

// 3 months:  600k - 614k

// 6 months:   615k - 649k

// 12 months:  650k - 699k

// If the score is from 651 - 700

// 3 months:  700k - 714k

// 6 months:   715k - 749k

// 12 months:  750k - 799k

// If the score is from 701 - 750

// 3 months:  800k - 814k

// 6 months:   815k - 849k

// 12 months:  850k - 899k

// If the score is from 751 - 800

// 3 months:  900k - 914k

// 6 months:   915k - 949k

// 12 months:  950k - 999k

// If the score is from 801 - 850

// 3months:  1m - 1.14m

// 6months:   1.15m - 1.49m

// 12months:  1.50m - 2m
