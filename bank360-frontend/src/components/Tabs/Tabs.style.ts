import Tabs from "@mui/material/Tabs";
import styled from "styled-components";

export const TabsCompContainer = styled.section`
    .panel {
        padding: 0 8px;
    }
`;

export const StyledTabs = styled(Tabs)({
    width: "100%",
    overflowX: "scroll",

    ".css-1gsv261": { borderColor: "red" },

    "& .MuiTabs-flexContainer": {
        padding: "12px 32px 0 32px",
        overflowX: "scroll",
    },
    "& .MuiButtonBase-root.MuiTab-root": {
        justifyContent: "flex-start",
        padding: 0,
        margin: "14px 32px 0px 0 ",
        paddingBottom: "8px",
        minHeight: 0,
        fontWeight: "400",
        fontSize: "14px",
        lineHeight: "22px",
        color: " #99A0AE",
        fontFamily: "Inter",
        textTransform: "none",
        letterSpacing: "0",
    },
    "& .MuiTabs-indicator": {
        backgroundColor: "#67ADC8",
        display: "none",
    },
    "& .MuiTab-root.Mui-selected": {
        fontWeight: "700",
        fontSize: "14px",
        lineHeight: "22px",
        color: "#151E28",
        paddingBottom: "12px",
        borderBottom: "2px solid #67ADC8",
    },
});
