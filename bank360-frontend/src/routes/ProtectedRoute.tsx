import { Navigate } from "react-router-dom";
import { useGetAccessTokenFromCookieAndStore } from "../hooks/getDataFromCookieAndStore/getDataFromCookieAndStore";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
// import { useEffect, useState } from "react";
import { LoaderIcon } from "react-hot-toast";
import { useGetUserDataQuery } from "../features/services";
import { useAppDispatch } from "../app/hooks";
import { updateUserData } from "../features/userData/userData.slice";
import Loader from "../components/Loader/Loader";

interface IProtectedRouteProps {
    children: any;
}
// protected route
export const ProtectedRoute = ({ children }: IProtectedRouteProps) => {
    // const [accessToken, setAccessToken] = useState(true);
    // useEffect(() => {});
    const dispatch = useAppDispatch();

    const [skip, setSkip] = useState(true);
    const [accessToken, setAccessToken] = useState("");
    const { data } = useGetUserDataQuery(
        { accessToken },
        {
            skip,
        }
    );
    if (data) {
        dispatch(updateUserData(data));
    }
    const [renderedElement, setRenderedElement] = useState(
        <div
            style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                marginTop: "2em",
            }}
        >
            <Loader />
        </div>
    );
    useEffect(() => {}, [renderedElement]);
    const [access] = useGetAccessTokenFromCookieAndStore(
        (accessToken: string) => {
            if (!accessToken) {
                toast.error("You need to be logged in to access this page");
                setRenderedElement(<Navigate to="/signin" replace />);
                return <Navigate to="/signin" replace />;
            } else {
                setAccessToken((prev) => accessToken);
                setSkip(false);
                setRenderedElement(children);
                return children;
                // return children;
            }
        }
    );
    return (
        <>
            {access ? (
                access === "DONE_NO_TOKEN" ? (
                    <Navigate to="/signin" replace />
                ) : (
                    children
                )
            ) : (
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "2em",
                    }}
                >
                    <Loader />
                </div>
            )}
        </>
    );
};
