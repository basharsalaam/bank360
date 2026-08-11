import React, { FC } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { ITabsCompProps, TabPanelProps } from "./Tabs.interface";
import { TabsCompContainer } from "./Tabs.style";
import { StyledTabs } from "./Tabs.style";
import { useSearchParams } from "react-router-dom";

export const TabsComp: FC<ITabsCompProps> = ({
    tablabels,
    defaultStart,
    tabPanels,
}) => {
    const [value, setValue] = React.useState(defaultStart || 0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const [search, setSearch] = useSearchParams();
    const updateTabParam = (index: number) => {
        setSearch({ tab: String(index) });
    };
    return (
        <TabsCompContainer>
            <Box sx={{ width: "100%" }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <StyledTabs
                        value={value}
                        onChange={handleChange}
                        aria-label="basic tabs example"
                        variant="scrollable"
                    >
                        {tablabels.map((label, index) => (
                            <Tab
                                label={label}
                                {...a11yProps(index)}
                                onClick={() => {
                                    updateTabParam(index);
                                }}
                            />
                        ))}
                    </StyledTabs>
                </Box>
                <section className="panel">
                    {tabPanels.map((panel, index) => (
                        <TabPanel value={value} index={index}>
                            {panel}
                        </TabPanel>
                    ))}
                </section>
            </Box>
        </TabsCompContainer>
    );
};

const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }} className="tab-content">
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
};

const a11yProps = (index: number) => {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
};
