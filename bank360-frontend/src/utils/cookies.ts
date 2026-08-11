import {
  ACCESS_TOKEN_EXPIRY_TIME_IN_MINS,
  REFRESH_TOKEN_EXPIRY_TIME_IN_MINS,
  XCHANGE_RATE_EXPIRY_TIME_IN_MINS,
} from "./constants/index";
// cfat => CashFlow access token
// cfrt => Cashflow refresh token
// xrv => Exchange rate value

type CookieName = "cfat" | "cfrt" | "xrv";
// Set cookie for radiologist (gist) or radiology dept (gy)
export const setCookie = (name: CookieName, value: string) => {
  // access token lasts 10 minutes
  // refresh token lasts 30 minutes
  const time =
    name === "cfat"
      ? ACCESS_TOKEN_EXPIRY_TIME_IN_MINS
      : name === "cfrt"
      ? REFRESH_TOKEN_EXPIRY_TIME_IN_MINS
      : name === "xrv"
      ? XCHANGE_RATE_EXPIRY_TIME_IN_MINS
      : 0;
  var expires = "";
  if (time) {
    var date = new Date();
    date.setTime(date.getTime() + time * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
};

// Get cookie for radiologist (gist) or radiology dept (gy)

export const getCookie = (name: CookieName) => {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

/**
 * remove radiology/specialist cookie
 */
export const deleteCookie = (name: CookieName) => {
  document.cookie = `${name}=; Max-Age=-99999999; path=/;`;
};
