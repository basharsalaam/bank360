import React, { FC, useState } from "react";
import { AnalyticsHeader } from "./AnalyticsHeader";
import circleLogo from "./../../../assets/icons/circle-information.svg";
import footStepIcon from "../../../assets/icons/footstep1.svg";
import footStep2Icon from "./../../../assets/icons/footstep2.svg";
import footStep3Icon from "./../../../assets/icons/footstep3.svg";
import Loader from "../../../frontend-components/Loader/Loader";

export const CarbonFootprint = () => {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <AnalyticsHeader
        header={
          <span>
            Your Estimated Footprint{" "}
            <small className="gain">+ 1.5 % this month</small>
          </span>
        }
      />
      <section className="footprint-overview">
        <div className="footprint-overview__card">
          {/* <footStepIcon className="abs abs-1" />
          <Footstep2Icon className="abs abs-2" />
          <footStep3Icon className="abs abs-3" /> */}
          <div className="footprint-overview__card-item">
            <p>Total Carbon Generated</p>
            <h1>
              568KG <span>of</span> CO2
            </h1>
          </div>
          <div className="footprint-overview__card-item">
            <p>Total Amount</p>
            <h1>₦56,340,000</h1>
          </div>
          <div className="footprint-overview__card-item">
            <p>Highest Omission Category</p>
            <h1>Transport</h1>
          </div>
        </div>
        <div className="footprint-overview__footer">
          {/* <CircleInfoIcon /> */}
          <p>That is the same as charging 234568 smart phones.</p>
        </div>
      </section>

      <div className="table-container">
        {" "}
        <section className="header">
          <p>Footprint Breakdown</p>
        </section>
        <table>
          <tr>
            <th className="catr">Category</th>
            <th className="dater">Total Amount</th>
            <th>C02 Footprint</th>
          </tr>
          {!loading ? (
            footprintsData.map((cat) => (
              <tr>
                <td className="category catr">{cat.category}</td>
                <td className="date dater">{cat.amount}</td>
                <td className="print">{cat.footprint}</td>
              </tr>
            ))
          ) : (
            <Loader />
          )}
        </table>
      </div>
    </>
  );
};

interface IFootprintData {
  category: string;
  amount: string;
  footprint: string;
}

const footprintsData: IFootprintData[] = [
  {
    category: "Utilities",
    amount: "₦ 200,000",
    footprint: "26Kg of CO2",
  },
  {
    category: "School Fees",
    amount: "₦ 400,000",
    footprint: "54Kg of CO2",
  },
  {
    category: "Tax",
    amount: "₦ 100,000",
    footprint: "6Kg of CO2",
  },
  {
    category: "Laundry",
    amount: "₦ 200,000",
    footprint: "51Kg of CO2",
  },
  {
    category: "Food",
    amount: "₦ 400,000",
    footprint: "50Kg of CO2",
  },
  {
    category: "Transportation",
    amount: "₦ 90,000",
    footprint: "56Kg of CO2",
  },
  {
    category: "Provisions",
    amount: "₦ 3,000",
    footprint: "21Kg of CO2",
  },
  {
    category: "Electronics",
    amount: "₦ 1,000",
    footprint: "20Kg of CO2",
  },
  {
    category: "Pocket Money",
    amount: "₦ 120,000",
    footprint: "2Kg of CO2",
  },
];
