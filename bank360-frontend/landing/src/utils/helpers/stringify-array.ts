import { ISelectOption } from "../../frontend-components/Select/Select.interface";
export const stringifySelectOptions = (arr: ISelectOption[]) => {
  return arr.map((bank) => bank.value).join(",");
};

export const removeItemAtAnIndexInArray = (arr: any[], index: number) => {
  arr.splice(index, 1);
  return arr;
};
