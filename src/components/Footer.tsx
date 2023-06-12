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
                            <img src={"/icons/docs.svg"} alt={"docs icon"}/>
                            <p>How it works</p>
                        </div>
                    </Link>
                </div>
                <div className={"footerMediaBlock"}>
                    <Link to={"https://discord.gg/9FRETSPmp9"} target={"_blank"}>
                        <img src={"/icons/social/discord.svg"}/>
                    </Link>
                    <Link to={"https://matrix.to/#/!utTuYglskDvqRRMQta:matrix.org?via=matrix.org&via=t2bot.io&via=web3.foundation"} target={"_blank"}>
                        <img src={"/icons/social/element.svg"}/>
                    </Link>
                    <Link to={"https://github.com/Brushfam/patron-backend/issues"} target={"_blank"}>
                        <img src={"/icons/social/bug-report.svg"}/>
                    </Link>
                    <Link to={"https://brushfam.io/"} target={"_blank"}>
                        <img src={"/icons/social/brushfam.svg"}/>
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