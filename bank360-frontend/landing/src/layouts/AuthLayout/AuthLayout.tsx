import React, { FC } from "react";
import { Link } from "react-router-dom";
import { Icons } from "../../assets/icons";
import { AuthLayoutStyle } from "./AuthLayout.style";


interface AuthLayoutProps {
    children: React.ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
    return (
        <AuthLayoutStyle>
            <section className="left">
                <Link to='/'>
                    <Icons.WhiteLogoIcon className="logo" /> <br />
                </Link>
                <Icons.MoneyIcon className='money-emoji'/>
                <Icons.TopQuadrantIcon className="top-quadrant" />
                <Icons.BottomQuadrantIcon className="bottom-quadrant" />
                <h1>Financial Clarity, <br />at your Fingertips.</h1>
                <h6>
                    Integrate all your bank accounts into one platform giving
                    you a 360 view of your finances across multiple banks
                    accounts.
                </h6>
                <footer className="sm-none">
                    <Link to="/">Terms</Link>
                    <Link to="/" className="middle">Contact</Link>
                    <Link to="/">Privacy Policy</Link>
                </footer>
            </section>
            <section className="right">
                {children}
                <Icons.BottomQuadrantIcon className="bottom-bottom" />
                <footer className="sm-show">
                    <Link to="/">Terms</Link>
                    <Link to="/" className="middle">Contact</Link>
                    <Link to="/">Privacy Policy</Link>
                </footer>
            </section>
        </AuthLayoutStyle>
        
    );
};

export default AuthLayout;
