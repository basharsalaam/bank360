// First check the state if the access token is present there
// If yes, return the access token
// If no, check the cookies
// If yes, return the access token and refresh and update state with it
// If no, (means it's expired), get refresh token from cookies
// if present, use it to fetch refresh the access token
// and update the state and cookies with it and return it
// if not, return null

import { useGetAccessTokenFromRefreshTokenMutation } from "../../features/services";
import { useAppDispatch } from "../../app/hooks";
import { getCookie, setCookie } from "../../utils/cookies";
import { useGetTokens } from "../getDataFromStore/getDataFromState";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { updateTokens } from "../../features/tokens/tokens.slice";
import { useEffect, useState } from "react";

export const useGetAccessTokenFromCookieAndStore = (
    callback: (accessToken: string) => any
) => {
    // const [accessToken, set]
    const navigate = useNavigate();
    const [getAccessTokenFromRefreshToken] =
        useGetAccessTokenFromRefreshTokenMutation();
    const dispatch = useAppDispatch();
    const [access, setAccess] = useState("");
    const accessTokenFromState = useGetTokens().access;

    useEffect(() => {
        // if in state
        if (accessTokenFromState) {
            callback(accessTokenFromState);
            setAccess(accessTokenFromState);
            return;
            // return accessTokenFromState;
        }
        const accessTokenFromCookie = getCookie("cfat");

        // if in cookie
        if (accessTokenFromCookie) {
            callback(accessTokenFromCookie);
            setAccess(accessTokenFromCookie);
            dispatch(
                updateTokens({
                    access: accessTokenFromCookie,
                    refresh: getCookie("cfrt") as string,
                })
            );
            return;
            // return accessTokenFromCookie;
        }

        // get refresh token from cookie
        const refreshTokenFromCookie = getCookie("cfrt");
        if (refreshTokenFromCookie) {
            getAccessTokenFromRefreshToken(refreshTokenFromCookie)
                .unwrap()
                .then((data) => {
                    const accessTokenFromRefresh = data.access;

                    if (accessTokenFromRefresh) {
                        setCookie("cfat", accessTokenFromRefresh);
                        setCookie("cfrt", data.refresh);
                        dispatch(
                            updateTokens({
                                access: accessTokenFromRefresh,
                                refresh: data.refresh,
                            })
                        );
                        callback(accessTokenFromRefresh);
                        setAccess(accessTokenFromRefresh);
                        return;
                    } else {
                        callback("");
                        setAccess("DONE_NO_TOKEN");
                        return;
                    }
                })
                .catch(() => {
                    toast.error("Something went wrong");
                    navigate("/signin");
                    callback("");
                    setAccess("DONE_NO_TOKEN");
                    return;
                });
        } else {
            callback("");
            setAccess("DONE_NO_TOKEN");
            return;
        }
    }, []);

    return [access];
};
