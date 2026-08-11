export interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

export interface ITabsCompProps {
    tablabels: string[];
    tabPanels: JSX.Element[];
    defaultStart?: number;
}
