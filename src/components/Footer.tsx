import React from 'react';
import './Footer.css'
import { Link } from "react-router-dom";

export function Footer() {
    return(
        <div className={"footerContainer"}>
            <div className={"footer"}>
                <div className={"footerDiv1"}>
                    <Link to={'/getting-started'}>
                        <div className={"footerDocs"}>
                            <img src={"/clip.svg"}/>
                            <p>How it works</p>
                        </div>
                    </Link>
                </div>
                <div className={"footerDiv2"}>
                    <p>Copyright © 2023 Patron</p>
                </div>
            </div>
        </div>
    )
}