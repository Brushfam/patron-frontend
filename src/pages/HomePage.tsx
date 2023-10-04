import styles from "./HomePage.module.css"
import { Footer } from "../components/Footer/Footer"
import React, { useEffect, useState } from "react"
import { UseUser } from "../context/UserContext"
import HeaderBlocks from "../components/Headers/HeaderBlocks"
import { SearchBlock } from "../components/HomePage/SearchBlock"
import { LoginModal } from "../components/LoginModal/LoginModal"
import { LoginButton } from "../components/Buttons/LoginButton"

export default function HomePage() {
    const userContext = UseUser()
    const [loginOpen, setLoginOpen] = useState(false)
    const [isLogin, setIsLogin] = useState(false)

    useEffect(() => {
        let params = new URL(window.location.href).searchParams
        if (params.get("cli_token")) {
            setLoginOpen(true)
            setIsLogin(true)
        }
    }, [])

    return (
        <div className={styles.mainContainer}>
            <LoginModal isOpen={loginOpen} setModal={setLoginOpen} isLogin={isLogin}/>
            {!userContext.currentUser ? (
                <div className={styles.loginButtonWrapper}>
                    <LoginButton onClickEvent={setLoginOpen} />
                </div>
            ) : (
                <div className={styles.homePageHeaderBlocks}>
                    <HeaderBlocks />
                </div>
            )}
            <div className={styles.mainDiv}>
                <img
                    src={"/logos/patron-main-logo.svg"}
                    alt={"Patron logo"}
                    className={styles.mainLogo}
                />
                <div className={styles.polkadotNote}>
                    <p>Product works in the</p>
                    <a
                        href={"https://polkadot.network/"}
                        style={{
                            margin: "0 10px",
                            height: 22,
                        }}
                        target={"_blank"}
                        rel={"noreferrer"}
                    >
                        <img src={"/logos/polkadot-logo.svg"} alt={"Polkadot logo"} />
                    </a>
                    <p>ecosystem</p>
                </div>
                <SearchBlock />
            </div>
            <Footer />
        </div>
    )
}
