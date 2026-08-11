export const OTP_NUMBER_OF_INPUTS = 4;

export const PASSWORD_STRENGTH_BAR_COLORS = [
  "#E5EBF1",
  "#E3452F",
  "#F6DA8D",
  "#2b90ef",
  "#54B773",
];

export const PASSWORD_STRENGTH_SCORE_WORDS = [
  "Weak",
  "Weak",
  "Okay",
  "Good",
  "Strong",
];

export const BREAKPOINTS = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 1024,
  xl: 1200,
};

export const API_URL = "https://cashflow-back.herokuapp.com/api/";

export const API_URL_not_used =
  "http://cashflow-backend.eu-west-2.elasticbeanstalk.com/api/";

// No of items in a page for pagination
export const ITEMS_PER_PAGE = 5;

export const REFRESH_TOKEN_EXPIRY_TIME_IN_MINS = 60 - 1;
export const ACCESS_TOKEN_EXPIRY_TIME_IN_MINS = 45 - 1;

// 1 day in minutes
export const XCHANGE_RATE_EXPIRY_TIME_IN_MINS = 1440 - 1;

const TEST_KEY = "test_pk_CMyIzC5mZLdWlWZ2J6Ro";
const LIVE_KEY = "live_pk_K9ehRFDq5nlJVHRp4GvS";
export const MONO_PUBLIC_KEY = LIVE_KEY;
export const INPUT_DEBOUNCING_TIME_IN_MS = 1200;
