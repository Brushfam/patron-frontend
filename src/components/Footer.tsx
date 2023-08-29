import React from 'react';
import './Footer.css'
import { Link } from "react-router-dom";

export function Footer() {
    return(
        <div className={"footerContainer"}>
            <div className={"footerFundedBy"}>
                <p>Funded by </p>
                <Link to={"https://alephzero.org/"}>
                    <img src={"/logos/aleph-zero-logo.svg"} alt={"Aleph Zero logo"}/>
                </Link>
                <Link to={"https://web3.foundation/"}>
                    <img src={"/logos/w3f-logo.svg"} alt={"Web3 Foundation logo"}/>
                </Link>
            </div>
            <div className={"footer"}>
                <div className={"footerMobileBorder"}></div>
                <div className={"footerDocsAndSocial"}>
                    <div className={"footerDocsWrapper"}>
                        <Link to={'/getting-started'}>
                            <div className={"footerDocs"}>
                                <img src={"/icons/buttons/docs.svg"} alt={"docs icon"}/>
                                <p>How it works</p>
                            </div>
                        </Link>
                    </div>
                    <div className={"footerContactsBlock"}>
                        <Link to={"https://discord.gg/9FRETSPmp9"} target={"_blank"} >
                            <img src={"/icons/social/discord.svg"} alt={"discord icon"}/>
                        </Link>
                        <Link to={"https://matrix.to/#/!utTuYglskDvqRRMQta:matrix.org?via=matrix.org&via=t2bot.io&via=web3.foundation"} target={"_blank"} >
                            <img src={"/icons/social/element.svg"} alt={"element icon"}/>
                        </Link>
                        <Link to={"https://github.com/Brushfam/patron-backend"} target={"_blank"} >
                            <img src={"/icons/social/github.svg"} alt={"github icon"}/>
                        </Link>
                        <Link to={"https://brushfam.io/"} target={"_blank"} >
                            <img src={"/icons/social/brushfam.svg"} alt={"brushfam icon"}/>
                        </Link>
                    </div>
                </div>
                <div className={"footerMobileBorder"}></div>
                <div>
                    <p>Copyright © 2023 Patron</p>
                </div>
            </div>
        </div>
    )
}