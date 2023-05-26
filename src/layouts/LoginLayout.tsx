import React from "react";
import { BaseHeader } from "../components/Headers/BaseHeader";
import { Footer } from "../components/Footer";
import "./LoginLayout.css";

export const LoginLayout = (props: {
    headerText: string;
    children: JSX.Element;
}) => {
    return (
        <div className={"loginLayout"}>
            <BaseHeader />
            <div className={"formDiv"}>
                <div className={"headerBorder"}></div>
                <div className={"headerTextDiv"}>
                    <p>{props.headerText}</p>
                </div>
                {props.children}
            </div>
            <Footer />
        </div>
    );
};
