import React from 'react';
import './BaseHeader.css'
import { Link } from "react-router-dom";

// The most complete BaseHeader structure:
// BaseHeader
// |- HeaderBlocksLayout (optional)
//    |- HeaderSearchBar (optional)
//    |- HeaderBlocks (optional)
export function BaseHeader(props: {children?: JSX.Element}) {
    return(
        <div className={"baseHeaderContainer"}>
            <div className={"baseHeader"}>
                <Link  to={'/'} className={"patronLogo"} style={{height: 36}}>
                    <img src={"/logos/patron-logo.svg"} alt={"Patron logo"}/>
                </Link>
                {props.children}
            </div>
        </div>
    )
}