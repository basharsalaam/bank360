import { FC } from "react";
import { Link } from "react-router-dom";
import { Icons } from "../../assets/Icons";
import { AuthLayoutStyle } from "./AuthLayout.style";

const AuthLayout: FC = ({ children }) => {
    return (
        <AuthLayoutStyle>
            <section className="left">
                <Icons.LogoIcon className="logo" />
                <Icons.TopQuadrantIcon className="top-quadrant" />
                <Icons.BottomQuadrantIcon className="bottom-quadrant" />

                {/* <figure className="money-emoji">
                    <Icons.MoneyIcon />
                </figure> */}
                <h1>One-Bank For All Your Accounts</h1>
                <h6>
                    Integrate all your bank accounts into one platform giving
                    you a 360 view of your finances across multiple banks
                    accounts.
                </h6>
                <footer className="sm-none">
                    <Link to="/">Terms</Link>
                    <Link to="/" className="middle">
                        Contact
                    </Link>
                    <Link to="/">Privacy Policy</Link>
                </footer>
            </section>
            <section className="right">
                {" "}
                {children}
                <Icons.BottomQuadrantIcon className="bottom-bottom" />
                <footer className="sm-show">
                    <Link to="/">Terms</Link>
                    <Link to="/" className="middle">
                        Contact
                    </Link>
                    <Link to="/">Privacy Policy</Link>
                </footer>
            </section>
        </AuthLayoutStyle>
    );
};

export default AuthLayout;
