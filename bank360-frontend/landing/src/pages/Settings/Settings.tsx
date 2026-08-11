import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ISelectOption } from "../../frontend-components/Select/Select.interface";
import { TabsComp } from "../../frontend-components/Tabs/Tabs";
import { Layouts } from "../../layouts";
import { Category } from "./modules/Category";
import { ConnectedBanks } from "./modules/ConnectedBanks";
import { Profile } from "./modules/Profile";
import { SettingsStyle } from "./Settings.style";

const Settings = () => {
  const [selectedDate, setSelectedDate] = useState<ISelectOption>({
    label: "Last 7 days",
    value: "Last 7 days",
  });

  const [search, setSearch] = useSearchParams();
  const tab = search.get("tab");

  return (
    <SettingsStyle>
      <Layouts.DashboardLayout header="Settings ">
        {/* tabs */}
        <TabsComp
          defaultStart={Number(tab)}
          tablabels={SettingsTabsLabels}
          tabPanels={[
            <Profile />,
            <Category {...{ selectedDate, setSelectedDate }} />,
            <ConnectedBanks {...{ selectedDate, setSelectedDate }} />,
          ]}
        />
      </Layouts.DashboardLayout>
    </SettingsStyle>
  );
};

export default Settings;

const SettingsTabsLabels: string[] = [
  "Profile",
  "Categories",
  "Connected Banks",
];
