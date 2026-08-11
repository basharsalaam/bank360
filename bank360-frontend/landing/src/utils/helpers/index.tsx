import { ISelectOption } from "../../frontend-components/Select/Select.interface";
import { formatDate, getMonth, getMonthAndDate } from "./display";

/**
 * @description Make a number be in 2 significant digits
 * @param num number
 */
export const make2SF = (num: number) => ("0" + num).slice(-2);

// checks if an object is empty.
// true if empty
// false if not empty
export const isObjectEmpty = (obj: any) => {
  // because Object.keys(new Date()).length === 0;
  // we have to do some additional check
  return (
    obj && // 👈 null and undefined check
    Object.keys(obj).length === 0 &&
    Object.getPrototypeOf(obj) === Object.prototype
  );
};

export const getDateArray = function (start: Date, end: Date) {
  var arr = [];
  var dt = new Date(start);
  while (dt <= end) {
    arr.push(new Date(dt));
    dt.setDate(dt.getDate() + 1);
  }
  return arr;
};

export const removeObjectWithValueFromArray = (
  array: ISelectOption[],
  value: string
) => {
  return array.filter((option) => option.value !== value);
};

export const numberWithCommas = (x?: number) => {
  return x && x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const getArrayOfLastSevenDaysFromToday = () => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  var goBackDays = 7;

  var today = new Date();
  var daysSorted = [];

  for (var i = 0; i < goBackDays; i++) {
    var newDate = new Date(today.setDate(today.getDate() - 1));
    daysSorted.push(days[newDate.getDay()]);
  }
  daysSorted.reverse();
  return daysSorted;
};

export const getArrayOfLastDaysFromToday = (noOfDays: number) => {
  const today = new Date().getTime();

  const days = Array.from({ length: 10 }).map((_, index) => {
    const threeDayInMilliseconds = 86400 * 1000 * (noOfDays / 10);
    const currentDayInMilliseconds = today - threeDayInMilliseconds * index;

    return getMonthAndDate(new Date(currentDayInMilliseconds));
  });

  days.reverse();
  return days;
  // This generates 30 days from today.
  // You can adapt it to skip whatever number of days you want
  // Also I don't think it's worth using date-fns if all you need it Month and Day (i.e May 11). You can just write normal js to convert the month to text and you already have the day using getDate()
};

export const getArrayOf30LastDaysFromTodayFull = (num?: number) => {
  const today = new Date().getTime();

  const days = Array.from({ length: num || 30 }).map((_, index) => {
    const threeDayInMilliseconds = 86400 * 1000;
    const currentDayInMilliseconds = today - threeDayInMilliseconds * index;

    return getMonthAndDate(new Date(currentDayInMilliseconds));
  });

  days.reverse();
  return days;
  // This generates 30 days from today.
  // You can adapt it to skip whatever number of days you want
  // Also I don't think it's worth using date-fns if all you need it Month and Day (i.e May 11). You can just write normal js to convert the month to text and you already have the day using getDate()
};

export const getArrayOfLast90DaysFromToday = () => {
  const today = new Date().getTime();
  const days = Array.from({ length: 90 }).map((_, index) => {
    const threeDayInMilliseconds = 86400 * 1000;
    const currentDayInMilliseconds = today - threeDayInMilliseconds * index;

    const date = new Date(currentDayInMilliseconds);
    return formatDate(date.toString(), true);
  });

  days.reverse();
  return days;
};

export const getArrayOfLast30DaysFromToday = () => {
  const today = new Date().getTime();

  const days = Array.from({ length: 30 }).map((_, index) => {
    const threeDayInMilliseconds = 86400 * 1000;
    const currentDayInMilliseconds = today - threeDayInMilliseconds * index;

    const date = new Date(currentDayInMilliseconds);
    return `${date.getDate()}/${date.getMonth() + 1}/${date
      .getFullYear()
      .toString()
      .slice(2)}`;
  });

  const fulldays = Array.from({ length: 30 }).map((_, index) => {
    const threeDayInMilliseconds = 86400 * 1000;
    const currentDayInMilliseconds = today - threeDayInMilliseconds * index;

    const date = new Date(currentDayInMilliseconds);
    return formatDate(date.toString(), true);
  });

  days.reverse();
  fulldays.reverse();
  return { days, fulldays };
};

export const getArrayOfLastMonthsFromToday = () => {
  const today = new Date().getTime();

  const days = Array.from({ length: 12 }).map((_, index) => {
    const threeDayInMilliseconds = 86400 * 1000 * 30;
    const currentDayInMilliseconds = today - threeDayInMilliseconds * index;

    return getMonth(new Date(currentDayInMilliseconds));
  });

  days.reverse();
  return days;
  // This generates 30 days from today.
  // You can adapt it to skip whatever number of days you want
  // Also I don't think it's worth using date-fns if all you need it Month and Day (i.e May 11). You can just write normal js to convert the month to text and you already have the day using getDate()
};

export const getSign = (num: number) => {
  return num >= 0 ? "+" : "-";
};

export const getVarianceColor = (num: number) => {
  return num >= 0 ? "green" : "red";
};

export const roundTo2dp = (num: number) => {
  return Math.round((num + Number.EPSILON) * 100) / 100;
};

export const getUniqueArrayOfObjects = (arr: any[], prop: string) => {
  const uniqueIds: any[] = [];

  const unique = arr.filter((element) => {
    const isDuplicate = uniqueIds.includes(element[prop]);

    if (!isDuplicate) {
      uniqueIds.push(element[prop]);

      return true;
    }

    return false;
  });

  return unique;
};

// Returns true if an array has only zeros
// otherwise, returns false
export const hasOnlyZeros = (arr: number[]) => {
  return arr?.every((x) => x === 0);
};
