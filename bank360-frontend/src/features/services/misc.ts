import { setCookie } from "./../../utils/cookies";
export const getXchangeRateNGNVsUSD = (
  setXchangeRate: (xrv: string) => void
) => {
  const requestOptions: RequestInit = {
    method: "GET",
    redirect: "follow",
  };

  fetch("https://open.er-api.com/v6/latest/USD", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      setCookie("xrv", result.rates.NGN);
      setXchangeRate(result.rates.NGN);
    })
    .catch((error) => console.log("error", error));
};
