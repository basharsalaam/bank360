import { ISelectOption } from "../frontend-components/Select/Select.interface";
export const currencyOptions: ISelectOption[] = [
    {
        label: "₦ -  Naira",
        value: "naira",
    },
    {
        label: "$ -  US Dollars",
        value: "usd",
    },
    {
        label: "€ - Euros",
        value: "euro",
    },
];

export const bankOptions: ISelectOption[] = [
    {
        label: "GTBank",
        value: "GTBank",
    },
    {
        label: "Access Bank",
        value: "AccessBank",
    },
    {
        label: "Access Diamond",
        value: "AccessDiamond",
    },
];

export const dateOptions: ISelectOption[] = [
    {
        label: "Last 7 days",
        value: "Last 7 days",
    },
    {
        label: "Last 30 days",
        value: "Last 30 days",
    },
    {
        label: "Last 90 days",
        value: "Last 90 days",
    },
    {
        label: "Last 12 months",
        value: "Last 12 months",
    },
    {
        label: "This year",
        value: "This year",
    },
];

// maps the different date values to some information
export const dateOptionsMeaning: () => {
    [key: string]: {
        date: string;
        duration: number;
        size: number;
        distance: string;
    };
} = () => {
    const currentDate = new Date();

    return {
        "Last 7 days": {
            date: `${currentDate.getFullYear()},${
                currentDate.getMonth() + 1
            },${currentDate.getDate()}` as string,
            duration: 7 as number,
            size: 1 as number,
            distance: "last week",
        },
        "Last 30 days": {
            date: `${currentDate.getFullYear()},${
                currentDate.getMonth() + 1
            },${currentDate.getDate()}` as string,
            duration: 30,
            size: 1,
            distance: "last month",
        },
        "Last 90 days": {
            date: `${currentDate.getFullYear()},${
                currentDate.getMonth() + 1
            },${currentDate.getDate()}`,
            duration: 90,
            size: 1,
            distance: "last three months",
        },
        "Last 12 months": {
            date: `${currentDate.getFullYear()},${currentDate.getMonth() + 1}`,
            duration: 12,
            size: 1,
            distance: "last twelve months",
        },
        "This year": {
            date: `${currentDate.getFullYear()}`,
            duration: 1,
            size: 1,
            distance: "last year",
        },
    };
};

// maps the different date values to some information
// for graph
export const dateOptionsGraphMeaning: () => {
    [key: string]: {
        date: string;
        duration: number;
        size: number;
        distance: string;
    };
} = () => {
    const currentDate = new Date();

    return {
        "Last 7 days": {
            date: `${currentDate.getFullYear()},${
                currentDate.getMonth() + 1
            },${currentDate.getDate()}` as string,
            duration: 1 as number,
            size: 7 as number,
            distance: "last week",
        },
        "Last 30 days": {
            date: `${currentDate.getFullYear()},${
                currentDate.getMonth() + 1
            },${currentDate.getDate()}` as string,
            duration: 1,
            size: 30,
            distance: "last month",
        },
        "Last 90 days": {
            date: `${currentDate.getFullYear()},${
                currentDate.getMonth() + 1
            },${currentDate.getDate()}`,
            duration: 1,
            size: 90,
            distance: "last three months",
        },
        "Last 12 months": {
            date: `${currentDate.getFullYear()},${currentDate.getMonth() + 1}`,
            duration: 1,
            size: 12,
            distance: "last twelve months",
        },
        "This year": {
            date: `${currentDate.getFullYear()},${currentDate.getMonth() + 1}`,
            duration: 1,
            size: currentDate.getMonth() + 1,
            distance: "last year",
        },
    };
};
