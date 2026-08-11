import React, { FC, useEffect, useState } from "react";

import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { StyledTable, StyledTableCell, TableStyle } from "./Table.style";
import { ITableProps } from "./Table.interface";
import { formatDate, getTime } from "../../utils/helpers/display";
import { ICategoryInfo } from "../../features/services/services.interface";
import {
  useGetCategoryListMutation,
  useUpdateCategoryMutation,
} from "../../features/services";
import { useGetTokens } from "../../hooks/getDataFromStore/getDataFromState";
import { ISelectOption } from "../Select/Select.interface";
import Select from "../Select/Select";
import InfiniteScroll from "react-infinite-scroller";
import { EmptyGraph } from "../EmptyGraph/EmptyGraph";
import Loader from "../Loader/Loader";
import { numberWithCommas } from "../../utils/helpers";

function createData(
  date: JSX.Element,
  bankName: JSX.Element,
  accountNumber: JSX.Element,
  accountName: JSX.Element,
  transactionAmount: JSX.Element,
  transactionId: JSX.Element,
  paymentMethod: JSX.Element,
  narration: JSX.Element,
  category: JSX.Element
) {
  return {
    date,
    bankName,
    accountNumber,
    accountName,
    transactionAmount,
    transactionId,
    paymentMethod,
    narration,
    category,
  };
}

const RowedTable: FC<ITableProps> = ({
  header,
  headers,
  data,
  symbol,
  setTransactions,
  totalCount,
  setNewPage,
  currPage,
  more,
  loadingMore,
  loadMoreTransactions,
  setElement,
  rootElement,
  balance,
  className,
}) => {
  const [categories, setCategories] = useState<ISelectOption[]>([]);
  const { access } = useGetTokens();
  const [getListOfCategories] = useGetCategoryListMutation();
  const [updateTransaction] = useUpdateCategoryMutation();

  const fetchCategories = () => {
    getListOfCategories({
      accessToken: access,
    })
      .unwrap()
      .then((res) => {
        setCategories(
          res.map((category: ICategoryInfo) => ({
            value: String(category.id),
            label: category.category,
          }))
        );
      })
      .catch((err) => {
        fetchCategories();
      });
  };

  const updateCategory = (newCategoryId: string, transactionId: string) => {
    updateTransaction({
      accessToken: access,
      newCategoryId,
      transactionId,
    })
      .unwrap()
      .then((res) => {
        setTransactions((prev) =>
          prev.map((transaction) => {
            if (transaction.uuid === transactionId) {
              return res;
            }
            return transaction;
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    // fetch the list of categories
    fetchCategories();
  }, []);

  const rows = data.map((item) =>
    createData(
      <p className="bold">
        {formatDate(item.tran_date)} - {getTime(item.tran_date)}
      </p>,
      <p className="light">{item.account_info.bank_name}</p>,
      <p className="light">{item.account_info.account_no}</p>,
      <p className="light">
        {item.account_info.name.slice(0, 20) +
          ((item.account_info.name.length as number) > 20 ? "..." : "")}
      </p>,
      balance ? (
        <p className="light">
          {symbol} {numberWithCommas(item.balance / 100)}
        </p>
      ) : (
        <p className={"bold " + (item.tran_type ? "green" : "red")}>
          {item.tran_type ? "+" : "-"} {symbol}{" "}
          {numberWithCommas(item.amount / 100)}
        </p>
      ),
      <p className="light">
        {item.uuid.slice(0, 17)}
        {item.uuid.length > 16 ? "..." : ""}
      </p>,
      <p className="light">{item.channels}</p>,
      <div className="narration">
        {item.narration.slice(0, 40)}
        {item.narration.length > 40 ? "..." : ""}
      </div>,
      <Select
        placeholder="Category"
        Icon={<></>}
        minWidth="80px"
        width="auto"
        handleChange={({ label, value }) => {
          updateCategory(value, item.uuid);
          // setSelectedDate({ label, value });
        }}
        selected={{
          label: item.category_info.category,
          value: String(item.category_info.id),
        }}
        options={categories}
      />
    )
  );

  return (
    <TableStyle className={className}>
      {header && (
        <header>
          <h3>{header}</h3>
        </header>
      )}
      <TableContainer component={Paper}>
        <StyledTable
          sx={{ minWidth: 650 }}
          aria-label="simple table"
          // ref={setElement}
          className="ddkdk"
          ref={rootElement}
        >
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <StyledTableCell>{header}</StyledTableCell>
              ))}
            </TableRow>
          </TableHead>

          {data.length > 0 ? (
            <>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow
                    key={String(row.bankName)}
                    sx={{
                      "&:last-child td, &:last-child th": {
                        border: 0,
                      },
                    }}
                  >
                    <StyledTableCell
                      component="th"
                      scope="row"
                      ref={index === rows.length - 2 ? setElement : null}
                    >
                      {row.date}
                    </StyledTableCell>
                    <StyledTableCell
                      align="left"
                      ref={index === rows.length - 2 ? setElement : null}
                    >
                      {row.bankName}
                    </StyledTableCell>
                    <StyledTableCell
                      align="left"
                      ref={index === rows.length - 2 ? setElement : null}
                    >
                      {row.accountNumber}
                    </StyledTableCell>
                    <StyledTableCell
                      align="left"
                      ref={index === rows.length - 2 ? setElement : null}
                    >
                      {row.accountName}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {row.transactionAmount}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {row.transactionId}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {row.paymentMethod}
                    </StyledTableCell>

                    <StyledTableCell className="narrate-td" align="left">
                      {row.narration}
                    </StyledTableCell>

                    <StyledTableCell align="left">
                      {row.category}
                    </StyledTableCell>
                  </TableRow>
                ))}{" "}
              </TableBody>
              <div>
                {!loadingMore && !more && (
                  <p
                    style={{
                      textAlign: "center",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#99a0ae",
                    }}
                  >
                    End of list
                  </p>
                )}
                {loadingMore && <Loader />}
              </div>
            </>
          ) : (
            <EmptyGraph />
          )}
        </StyledTable>
      </TableContainer>
    </TableStyle>
  );
};

export default RowedTable;
