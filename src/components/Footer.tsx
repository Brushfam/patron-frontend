import React from 'react';
import './Footer.css'
import { Link } from "react-router-dom";

export function Footer() {
    return(
        <div className={"footerContainer"}>
            <div className={"footer"}>
                <Link to={'/getting-started'}>
                    <p style={{textDecoration: "underline"}}>Getting started</p>
                </Link>
                <p>|</p>
                <p>© 2023 Patron</p>
            </div>
        </div>
    )
}