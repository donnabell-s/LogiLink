import React from "react";
import { SideBar } from "../SideBar/SideBar";
import { TopBar } from "../TopBar/TopBar";
import "./Layout.css";

interface LayoutProps {
    children: React.ReactNode;
    backgroundColor?: string;
}


export const Layout: React.FC<LayoutProps> = ({ children, backgroundColor = "#F6F7F9" }) => {
    return (
        <div className="layout d-flex" style={{ backgroundColor, minHeight: "100vh" }}>
            <SideBar />
            <div className="main-content d-flex flex-column">
                <TopBar />
                <div className="content">
                    {children}
                </div>
            </div>
        </div>
    );
};