export const shortenWithEllipsis = (str: string, length: number = 10) => {
  return str.slice(0, length) + ((str.length as number) > length ? "..." : "");
};
