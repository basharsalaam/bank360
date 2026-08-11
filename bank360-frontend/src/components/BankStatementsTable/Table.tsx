import React, { FC, useEffect, useState } from "react";

import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { StyledTable, StyledTableCell, TableStyle } from "./Table.style";
import { ITableProps } from "./Table.interface";

import { useGetTokens } from "../../hooks/getDataFromStore/getDataFromState";
import { ISelectOption } from "../Select/Select.interface";
import Select from "../Select/Select";
import { Component } from "..";
import { numberWithCommas } from "../../utils/helpers";
import { removeItemAtAnIndexInArray } from "../../utils/helpers/stringify-array";
import Loader from "../Loader/Loader";
import { Icons } from "../../assets/Icons";
import { EmptyGraph } from "../EmptyGraph/EmptyGraph";

const { CheckIcon } = Icons;

function createData(
  bankName: JSX.Element,
  accountNumber: JSX.Element,
  accountName: JSX.Element,
  balance: JSX.Element,
  action: JSX.Element
) {
  return {
    bankName,
    accountNumber,
    accountName,
    balance,
    action,
  };
}

const BankStatementsTable: FC<ITableProps> = ({
  header,
  headers,
  data,
  symbol,
  setSelectedStatements,
  selectedStatements,
  downloadAll,
  chosenBanks,
  setChosenBanks,
  fetchingData,
  isSuccessful,
}) => {
  const { access } = useGetTokens();
  const [currentlyDownloadingIndex, setCurrentlyDownloadingIndex] = useState<
    null | number
  >(null);
  // const [selectedStatements, setSelectedStatements] = useState<number[]>([]);

  useEffect(() => {
    if (!fetchingData && !isSuccessful) {
      setCurrentlyDownloadingIndex(null);
    }
  }, [fetchingData, isSuccessful]);

  const rows = data.map((item, index) =>
    createData(
      <div className="bold flex">
        <Component.Checkbox
          selected={selectedStatements.includes(index)}
          setSelected={() => {
            if (selectedStatements.includes(index)) {
              const removedIndex = removeItemAtAnIndexInArray(
                chosenBanks!,
                selectedStatements.indexOf(index)
              );

              setChosenBanks(removedIndex);
              setSelectedStatements((prev) =>
                prev.filter((val) => val !== index)
              );
            }
            // if not selected
            else {
              setSelectedStatements((prev) => [...prev, index]);
              setChosenBanks((prev) => [
                ...prev,
                {
                  label: item.bankName,
                  value: item.bankName,
                },
              ]);
            }
          }}
          label=""
          className="check"
        />
        <p>{item.bankName}</p>
      </div>,
      <p className="light number">{item.accountNumber}</p>,
      <p className="light name">
        {item.accountName.slice(0, 20) +
          ((item.accountName.length as number) > 20 ? "..." : "")}
      </p>,

      <p className="light balance">{"₦ " + numberWithCommas(item.balance)}</p>,
      <div className="btn-flex">
        <Select
          placeholder={
            isSuccessful && currentlyDownloadingIndex === index ? (
              <CheckIcon color="#54B773" />
            ) : fetchingData && currentlyDownloadingIndex === index ? (
              <Loader noPadding={true} />
            ) : (
              "Download"
            )
          }
          Icon={<></>}
          width="96px"
          minWidth="96px"
          disabled={fetchingData}
          handleChange={({ label, value }) => {
            downloadAll &&
              downloadAll(value, item.accountId, [
                {
                  label: item.bankName,
                  value: item.bankName,
                },
              ]);
            setCurrentlyDownloadingIndex(index);
            // updateCategory(value, item.uuid);
            // setSelectedDate({ label, value });
          }}
          selected={undefined}
          options={downloadOptions}
        />
        <button className="share-btn">Share</button>
      </div>
    )
  );

  return (
    <TableStyle>
      {header && (
        <header>
          <h3>{header}</h3>
        </header>
      )}
      <TableContainer component={Paper}>
        {rows.length > 0 ? (
          <StyledTable
            sx={{ minWidth: 650 }}
            aria-label="simple table"
            // ref={setElement}
            className="ddkdk"
          >
            <TableHead>
              <TableRow>
                {headers.map((header) => (
                  <StyledTableCell>{header}</StyledTableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map((row, index) => (
                <TableRow
                  key={String(row.bankName) + index}
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: 0,
                    },
                  }}
                >
                  <StyledTableCell component="th" scope="row">
                    {row.bankName}
                  </StyledTableCell>

                  <StyledTableCell align="left">
                    {row.accountNumber}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.accountName}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.balance}</StyledTableCell>
                  <StyledTableCell align="left">{row.action}</StyledTableCell>
                </TableRow>
              ))}{" "}
            </TableBody>
          </StyledTable>
        ) : (
          <EmptyGraph>
            <p>You have not connected any bank account</p>
          </EmptyGraph>
        )}
      </TableContainer>
    </TableStyle>
  );
};

export default BankStatementsTable;

const downloadOptions: ISelectOption[] = [
  {
    label: "Download as PDF",
    value: "PDF",
  },
  {
    label: "Download as CSV",
    value: "CSV",
  },
];
