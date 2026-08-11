import { selectUserData } from "./../../features/userData/userData.slice";
import { selectCollapsedMenu } from "./../../features/layout/layout.slice";
import { useAppSelector } from "./../../app/hooks";
import { selectTempAuth } from "../../features/temp/temp.slice";
import { selectTokens } from "../../features/tokens/tokens.slice";
import { selectFinData } from "../../features/finData/finData.slice";
export const useGetCollapsedMenu = () => {
    const collapsedMenu = useAppSelector(selectCollapsedMenu);
    return collapsedMenu;
};

export const useGetTempAuth = () => {
    const tempAuth = useAppSelector(selectTempAuth);
    return tempAuth;
};

export const useGetTokens = () => {
    const tokens = useAppSelector(selectTokens);
    return tokens;
};

export const useGetUserData = () => {
    const userData = useAppSelector(selectUserData);
    return userData;
};

export const useGetFinData = () => {
    const finData = useAppSelector(selectFinData);
    return finData;
};
