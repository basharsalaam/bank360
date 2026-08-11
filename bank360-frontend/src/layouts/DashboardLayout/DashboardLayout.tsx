import React, { FC, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { Icons } from "../../assets/Icons";
import { Images } from "../../assets/Images";
import { Component } from "../../components";
import { IBankProps } from "../../components/BankList/BankList.interface";
import Select from "../../components/Select/Select";
import { ISelectOption } from "../../components/Select/Select.interface";
import { setCollapsedMenu } from "../../features/layout/layout.slice";
import { useGetListOfAccountsMutation } from "../../features/services";
import { useRefresh } from "../../hooks/display/refresh";
import {
  useGetCollapsedMenu,
  useGetTokens,
  useGetUserData,
} from "../../hooks/getDataFromStore/getDataFromState";
import { deleteCookie } from "../../utils/cookies";
import { shortenWithEllipsis } from "../../utils/helpers/shorten-with-ellipsis";
import { fetchAccountList } from "../../views/Home/Home.utils";
import { IDashboardLayoutProps } from "./DashboardLayout.interface";
import { DashboardLayoutStyle } from "./DashboardLayout.style";

const DashboardLayout: FC<IDashboardLayoutProps> = ({
  children,
  active,
  header,
}) => {
  // Checks if the menu is collapsed or not
  const collapsedMenu = useGetCollapsedMenu();
  const dispatch = useAppDispatch();

  // mobile menu
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    setMenuOpen(false);
  }, []);

  const userData = useGetUserData();

  const navigate = useNavigate();
  const logout = () => {
    deleteCookie("cfat");
    deleteCookie("cfrt");
    navigate("/signin");
  };

  const { refreshAccounts, refreshing } = useRefresh();
  const [accountList, setAccountList] = useState<ISelectOption[]>([]);
  const [getAccountsList] = useGetListOfAccountsMutation();
  const [loadingBankList, setLoadingBankList] = useState(true);
  const { access } = useGetTokens();

  const getAccounts = async () => {
    const response: any = await getAccountsList({
      accessToken: access,
      params: {
        currency: "",
        paginate: false,
      },
    });

    setAccountList(
      response.data.map((acc: any) => ({
        label: `${shortenWithEllipsis(acc.bank_name)} (${acc.account_no})`,
        value: acc.account_id,
      }))
    );
    setLoadingBankList(false);
  };

  useEffect(() => {
    getAccounts();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [access]);

  return (
    <DashboardLayoutStyle {...{ collapsedMenu, menuOpen }}>
      <div
        className={"overlay" + (menuOpen ? "" : " d-none")}
        onClick={() => {
          setMenuOpen(false);
        }}
      ></div>
      {/* side navigation */}
      <aside className="side-bar">
        <div className="user-card">
          <Component.Avatar
            first_name={userData?.first_name}
            last_name={userData?.last_name}
            className="avatar-card"
            src={userData?.avatar}
          />
          <div className={collapsedMenu ? "d-none" : ""}>
            <h3>
              {userData?.first_name} {userData?.last_name}
            </h3>
            <p>
              {`${userData?.email?.slice(0, 18)} ${
                userData.email?.length > 18 ? "..." : ""
              }
                               `}
            </p>
          </div>
          <button
            className={"collapse-btn" + (collapsedMenu ? " d-none" : " ")}
            onClick={() => {
              dispatch(setCollapsedMenu(true));
            }}
          >
            {" "}
            <Icons.ChevronLeftIcon />
          </button>
        </div>

        <div className="nav-links">
          <nav className="top">
            <button
              className={"collapse-btn" + (!collapsedMenu ? " d-none" : " ")}
              onClick={() => {
                dispatch(setCollapsedMenu(false));
              }}
            >
              {" "}
              <Icons.ChevronRightIcon />
            </button>
            <NavLink
              to={"/home"}
              className={({ isActive }) =>
                `link${isActive || active === 1 ? " active" : ""}`
              }
            >
              <Icons.HomeIcon />
              <span className={collapsedMenu ? "d-none" : ""}>Home</span>
            </NavLink>
            <NavLink
              to={"/dashboard"}
              className={({ isActive }) =>
                `link${isActive || active === 2 ? " active" : ""}`
              }
            >
              <Icons.DashboardIcon />
              <span className={collapsedMenu ? "d-none" : ""}>Dashboard</span>
            </NavLink>
            <NavLink
              to={"/daily-updates"}
              className={({ isActive }) =>
                `link${isActive || active === 3 ? " active" : ""}`
              }
            >
              <Icons.DailyUpdatesIcon />
              <span className={collapsedMenu ? "d-none" : ""}>
                Daily Updates
              </span>
            </NavLink>
            <NavLink
              to={"/financial-trends"}
              className={({ isActive }) =>
                `link${isActive || active === 4 ? " active" : ""}`
              }
            >
              <Icons.FinancialTrendsIcon />
              <span className={collapsedMenu ? "d-none" : ""}>
                {" "}
                Financial Trends{" "}
              </span>
            </NavLink>
            <NavLink
              to={"/bank-statements"}
              className={({ isActive }) =>
                `link${isActive || active === 5 ? " active" : ""}`
              }
            >
              <Icons.BankStatementsIcon />
              <span className={collapsedMenu ? "d-none" : ""}>
                {" "}
                Bank Statements{" "}
              </span>
            </NavLink>
            <NavLink
              to={"/analytics"}
              className={({ isActive }) =>
                `link${isActive || active === 6 ? " active" : ""}`
              }
            >
              <Icons.AnalyticsIcon />
              <span className={collapsedMenu ? "d-none" : ""}> Analytics </span>
            </NavLink>
          </nav>
          <nav className="bottom">
            <NavLink
              to={"/settings"}
              className={({ isActive }) =>
                `link${isActive || active === 7 ? " active" : ""}`
              }
            >
              <Icons.SettingsIcon />
              <span className={collapsedMenu ? "d-none" : ""}> Settings </span>
            </NavLink>
            <NavLink
              to={"/logout"}
              onClick={(e) => {
                e.preventDefault();
                logout();
              }}
              className={({ isActive }) =>
                `link${isActive || active === 8 ? " active" : ""}`
              }
            >
              <Icons.LogoutIcon />
              <span className={collapsedMenu ? "d-none" : ""}> Logout </span>
            </NavLink>
          </nav>
        </div>
      </aside>
      <aside className="main">
        <div className="top-nav">
          <div className="header">
            <button
              className="menu-btn"
              onClick={() => {
                setMenuOpen(true);
              }}
            >
              <Icons.MenuIcon />
            </button>
            <h2>{header}</h2>
          </div>
          {/* <button className="refresh-btn" onClick={refreshAccounts}>
            <Icons.RefreshIcon />
            <span>{refreshing ? "Refreshing" : "Refresh"}</span>
          </button> */}

          {!loadingBankList && (
            <Select
              Icon={<></>}
              placeholder={
                <button className="refresh-btn">
                  <Icons.RefreshIcon className={refreshing ? "roll" : ""} />
                  <span>{refreshing ? "Refreshing" : "Refresh"}</span>
                </button>
              }
              className="refresh-select"
              handleChange={({ label, value }) => {
                refreshAccounts(value);
              }}
              selected={undefined}
              options={accountList}
              disabled={refreshing}
            />
          )}
        </div>
        <main>{children}</main>
      </aside>
    </DashboardLayoutStyle>
  );
};

export default DashboardLayout;
