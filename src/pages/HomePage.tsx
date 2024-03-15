import styles from "./HomePage.module.css"
import { Footer } from "../components/Footer"
import React from "react"
import { SearchBlock } from "../components/HomePage/SearchBlock"
import { LoginButton } from "../components/Buttons/LoginButton"

export default function HomePage() {
    return (
        <div className={styles.mainContainer}>
            <div className={styles.loginButtonWrapper}>
                <LoginButton />
            </div>
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
