import { Table, TableCell, tableCellClasses, TableRow } from "@mui/material";
import styled from "styled-components";

export const TableStyle = styled.section`
  background: #ffffff;
  border: 1px solid #ecf0f3;
  border-radius: 10px;

  .btn-flex {
    display: flex;
    align-items: center;

    & > * {
      &:first-child {
        margin-right: 8px;
      }
    }

    .share-btn {
      border: 1px solid #ecf0f3;
      border-radius: 8px;
      font-weight: 600;
      font-size: 14px;
      line-height: 22px;
      color: #151e28;
      padding: 8px 16px;
    }
  }

  header {
    padding: 16px 24px;
    border-bottom: 1px solid #ecf0f3;

    h3 {
      font-weight: 600;
      font-size: 1.4em;
      line-height: 22px;
      color: #151e28;
    }
  }

  .bold {
    font-weight: 500;
    font-size: 14px;
    line-height: 22px;
    color: #151e28;
    /* min-width: 20%; */

    &.flex {
      display: flex;
      align-items: center;
      p {
        margin-left: 8px;
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        text-decoration-line: underline;
        color: #151e28;
      }
    }
  }

  .light {
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    color: #99a0ae;
  }

  .green {
    color: #54b773;
    font-weight: 600;
  }

  .red {
    color: #e3452f;
    font-weight: 600;
  }

  .narration {
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    color: #99a0ae;
    padding: 4px 8px;
    display: block;
    background: #ffffff;
    border: 1px solid #ecf0f3;
    border-radius: 4px;
    white-space: pre;
    width: auto;
    margin-right: 4em;
  }

  .narrate-td {
    min-width: 320px !important;
    /* margin-right: 5em; */
    /* padding-right: 4em; */
  }
  button .displayed {
    justify-content: center;
  }
`;

export const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    padding: "0 0 16px 0",
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "14px",
    lineHeight: "22px",
    minWidth: "200px",
    /* identical to box height, or 157% */

    /* Text/main */

    color: "#151E28",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: "16px 0 16px 0",
    minWidth: "200px",
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const StyledTable = styled(Table)(() => ({
  margin: "16px 24px",
  maxHeight: "300px",

  "& .MuiTableBody-root": {},
}));
