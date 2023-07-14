import React from 'react';
import './Footer.css'
import { Link } from "react-router-dom";

export function Footer() {
    return(
        <div className={"footerContainer"}>
            <div className={"footer"}>
                <div className={"footerDocsWrapper"}>
                    <Link to={'/getting-started'}>
                        <div className={"footerDocs"}>
                            <img src={"/icons/buttons/docs.svg"} alt={"docs icon"}/>
                            <p>How it works</p>
                        </div>
                    </Link>
                </div>
                <div className={"footerContactsBlock"}>
                    <Link to={"https://github.com/Brushfam/patron-backend/issues"} target={"_blank"} >
                        <img src={"/icons/buttons/our-contacts.svg"} alt={"contract icon"}/>
                        <p style={{marginLeft: 12}}>Our Contacts</p>
                    </Link>
                </div>
                <div className={"footerMobileBorder"}></div>
                <div>
                    <p>Copyright © 2023 Patron</p>
                </div>
            </div>
        </div>
    )
}