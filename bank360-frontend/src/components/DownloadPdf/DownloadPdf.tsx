import React, { FC } from "react";
import logo from "./../../assets/Icons/logo-black.svg";
import {
  PDFDownloadLink,
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";

import InterBold from "./fonts/Inter-Bold.ttf";
import InterExtrabold from "./fonts/Inter-ExtraBold.ttf";
import InterMedium from "./fonts/Inter-Medium.ttf";
import InterRegular from "./fonts/Inter-Regular.ttf";
import InterSemibold from "./fonts/Inter-SemiBold.ttf";
import { shortenWithEllipsis } from "../../utils/helpers/shorten-with-ellipsis";
import { numberWithCommas } from "../../utils/helpers";
import { formatDate } from "../../utils/helpers/display";

Font.register({
  family: "Inter",
  fonts: [
    {
      src: InterRegular,
      fontWeight: "regular",
    },
    {
      src: InterMedium,
      fontWeight: "medium",
    },
    {
      src: InterSemibold,
      fontWeight: "semibold",
    },
    {
      src: InterBold,
      fontWeight: "bold",
    },
    {
      src: InterExtrabold,
      fontWeight: 800,
    },
  ],
});

const DownloadButton: FC<IProps> = ({ head, table }) => {
  return (
    <div>
      <PDFDownloadLink
        document={<FileRendered {...{ head, table }} />}
        fileName={`${head.org_name}-Bank Statement.pdf`}
      >
        {({ blob, url, loading, error }) =>
          loading ? (
            "Loading document..."
          ) : (
            <button className="filled-btn">Download</button>
          )
        }
      </PDFDownloadLink>
    </div>
  );
};

const FileRendered: FC<IProps> = ({ head, table }) => (
  <Document>
    <Page size="A3" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.logo}>Cashflow</Text>
        <Text style={styles.date}>{formatDate(new Date().toString())}</Text>
      </View>
      <View style={styles.summary} wrap={false}>
        <View style={styles.half}>
          <Text style={styles.companyname}>{head.org_name}</Text>
          <View style={styles.flex}>
            <Text style={styles.flex__left}>Number of Banks</Text>
            <Text style={styles.flex__right}>
              {head.numberOfBanks} Bank{head.numberOfBanks > 1 ? "s" : ""}
            </Text>
          </View>
          <View style={styles.flex}>
            <Text style={styles.flex__left}>Time Period</Text>
            <Text style={styles.flex__right}>{head.timePeriod}</Text>
          </View>

          <View style={styles.flex}>
            <Text style={styles.flex__left}>Email Address</Text>
            <Text style={styles.flex__right}>{head.emailAddress}</Text>
          </View>
          {head.numberOfBanks === 1 && (
            <View style={styles.flex}>
              <Text style={styles.flex__left}>Account Name</Text>
              <Text style={styles.flex__right}>{table[0].name}</Text>
            </View>
          )}
          <View style={styles.flex}>
            <Text style={styles.flex__left}>Opening Balance</Text>
            <Text style={styles.flex__right}>
              ₦{numberWithCommas(Number(head.openingBalance))}
            </Text>
          </View>
        </View>
        <View style={styles.half}>
          <View style={styles.closingCard}>
            <Text style={styles.mutedText}>Closing Balance</Text>
            <Text style={styles.closingAmount}>
              {" "}
              ₦{numberWithCommas(Number(head.closingBalance))}
            </Text>
          </View>
          <View style={styles.flex}>
            <View style={styles.balance__card}>
              <Text style={styles.mutedText__small}>Total Inflow</Text>
              <Text style={styles.amount}>
                ₦{numberWithCommas(Number(head.deposit))}
              </Text>
            </View>
            <View style={styles.balance__card}>
              <Text style={styles.mutedText__small}>Total outflow</Text>
              <Text style={styles.amount}>
                ₦{numberWithCommas(Number(head.withdraw))}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.table}>
        <View style={styles.table__head}>
          <Text style={styles.table__headcell}>Date</Text>
          <Text style={styles.table__headcell}>Bank</Text>
          <Text style={styles.table__headcell}>Account Name</Text>
          <Text style={styles.table__headcell}>Account No</Text>
          <Text style={styles.table__headcell}>Type</Text>
          <Text style={styles.table__headcell}>Amount</Text>
          <Text style={styles.table__headcell}>Balance</Text>
        </View>
        <View style={styles.table__body}>
          {table.map((trx: ITrx, index: number) => (
            <View
              style={
                !(index % 2)
                  ? styles.table__bodyrow
                  : styles.table__bodyrow__white
              }
            >
              <Text style={styles.table__bodycell}>{trx.time}</Text>
              <Text style={styles.table__bodycell}>{trx.bankName}</Text>
              <Text style={styles.table__bodycell}>{trx.name}</Text>
              <Text style={styles.table__bodycell}>{trx.accountNo}</Text>
              <Text style={styles.table__bodycell}>{trx.type}</Text>
              <Text style={styles.table__bodycell}>
                ₦{numberWithCommas(Number(trx.amount))}
              </Text>
              <Text style={styles.table__bodycell}>
                ₦{numberWithCommas(Number(trx.balance))}
              </Text>
            </View>
          ))}
          {/* <View style={styles.table__bodyrow}>
            <Text style={styles.table__bodycell}>10/11/2022</Text>
            <Text style={styles.table__bodycell}>Wema Bank</Text>
            <Text style={styles.table__bodycell}>0233750334</Text>
            <Text style={styles.table__bodycell}>MHFLOPRSBJ</Text>
            <Text style={styles.table__bodycell}>Inflow</Text>
            <Text style={styles.table__bodycell}>₦40,000</Text>
            <Text style={styles.table__bodycell}>₦40,000</Text>
          </View>
          <View style={styles.table__bodyrow__white}>
            <Text style={styles.table__bodycell}>10/11/2022</Text>
            <Text style={styles.table__bodycell}>Wema Bank</Text>
            <Text style={styles.table__bodycell}>0233750334</Text>
            <Text style={styles.table__bodycell}>MHFLOPRSBJ</Text>
            <Text style={styles.table__bodycell}>Inflow</Text>
            <Text style={styles.table__bodycell}>₦40,000</Text>
            <Text style={styles.table__bodycell}>₦40,000</Text>
          </View> */}
        </View>
      </View>
    </Page>
  </Document>
);

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#F6F8FA",
    display: "flex",
    border: "1px solid #D1EDF0",
    width: "100%",
    padding: "26px 20px",
  },
  logo: {
    fontWeight: 800,
    fontSize: "20px",
    color: "#67ADC8",
    fontFamily: "Inter",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  date: {
    fontWeight: 700,
    fontSize: "14px",
    color: "#94A6B3",
    fontFamily: "Inter",
  },
  header: {
    margin: 0,
    display: "flex",
    flexDirection: "row",
    padding: 0,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  summary: {
    borderBottom: "1px solid #F3F4F6",
    borderTop: "4px solid #67ADC8",
    backgroundColor: "white",
    padding: "32px",
    marginTop: "40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexDirection: "row",
    borderBottomLeftRadius: "10px",
    borderBottomRightRadius: "10px",
  },
  half: {
    width: "45%",
    display: "flex",
    flexDirection: "column",
  },
  companyname: {
    fontWeight: 800,
    fontSize: "24px",
    color: "#121A26",
    textAlign: "left",
    fontFamily: "Inter",
    marginBottom: "40px",
  },
  flex: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "16px",
  },
  flex__left: {
    textAlign: "left",
    fontWeight: 400,
    fontSize: "13px",
    color: "#5D6167",
    fontFamily: "Inter",
  },
  flex__right: {
    textAlign: "right",
    fontWeight: 700,
    fontSize: "13px",
    color: "#384860",
    fontFamily: "Inter",
  },
  closingCard: {
    backgroundColor: "#d9eff1",
    borderRadius: "10px",
    padding: "24px 40px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  mutedText: {
    fontWeight: 500,
    fontSize: "16px",
    color: "#94A6B3",
    fontFamily: "Inter",
  },
  closingAmount: {
    marginTop: "8px",
    fontWeight: 700,
    fontSize: "32px",
    color: "#151E28",
    fontFamily: "Inter",
  },
  balance__card: {
    width: "48%",
    backgroundColor: "#edeff1",
    borderRadius: "10px",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  mutedText__small: {
    fontWeight: 500,
    fontSize: "14px",
    color: "#94A6B3",
    fontFamily: "Inter",
  },
  amount: {
    fontWeight: 600,
    fontSize: "16px",
    marginTop: "8px",
    fontFamily: "Inter",
  },
  table: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    marginTop: "16px",
    // border: "1px solid #D1EDF0",
  },
  table__head: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
    padding: "12px 16px",
    flexDirection: "row",
    borderBottom: "1px solid #F3F4F6",
  },
  table__headcell: {
    width: "14%",
    fontWeight: 500,
    fontSize: "12px",
    color: "#99A0AE",
    fontFamily: "Inter",
    textAlign: "left",
  },
  table__body: {
    backgroundColor: "white",
    padding: "16px 12px",
  },
  table__bodyrow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F6FAFB",
    padding: "16px 12px",
    flexDirection: "row",
    borderRadius: "8px",
    marginBottom: "12px",
  },
  table__bodyrow__white: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    padding: "16px 12px",
    flexDirection: "row",
    borderRadius: "8px",
    marginBottom: "12px",
  },
  table__bodycell: {
    width: "14%",
    fontWeight: 400,
    fontSize: "12px",
    color: "#151E28",
    fontFamily: "Inter",
    textAlign: "left",
  },
});

interface IProps {
  head: any;
  table: any;
}

interface ITrx {
  time: string;
  accountNo: string;
  name: string;
  bankName: string;
  type: string;
  amount: string;
  balance: string;
}

export const Pdf = { DownloadButton, FileRendered };
