import "./HomePage.css";
import {useNavigate} from "react-router-dom";
import { Footer } from "../components/Footer";
import React from "react";
import { UseUser } from "../context/UserContext";
import HeaderBlocks from "../components/Headers/HeaderBlocks";
import {SearchInput} from "../components/SearchInput";
import {HeaderBlocksLayout} from "../components/Headers/HeaderBlocksLayout";


export default function HomePage() {
    const userContext = UseUser()
    const navigate = useNavigate();

    function navigateToLogin() {
        navigate("/login");
    }

    return (
        <div className={"mainContainer"}>
            {
                !userContext.currentUser ? (
                    <button className={"loginButton"} onClick={navigateToLogin}>
                        Log in
                    </button>
                ) : <HeaderBlocksLayout blocks={<HeaderBlocks/>}/>
            }
            <div className={"mainDiv"}>
                <img
                    src={"patron-main-logo.svg"}
                    alt={"Patron logo"}
                    className={"mainLogo"}
                />
                <div className={"polkadotNote"}>
                    <p>Product works in the</p>
                    <a
                        href={"https://polkadot.network/"}
                        style={{ margin: "0 10px", height: 22 }}
                        target={"_blank"}
                        rel={"noreferrer"}
                    >
                        <img src={"polkadot-logo.svg"} alt={"Polkadot logo"} />
                    </a>
                    <p>ecosystem</p>
                </div>
                <SearchInput/>
            </div>
            <Footer />
        </div>
    );
}
