import styles from './LoginButton.module.css'
import React from "react";

export function LoginButton() {
    return(
        <div
            className={styles.loginButton}
        >
            Log in
            <img
                src={"/icons/buttons/log-in.svg"}
                style={{ marginLeft: 10 }}
                alt={"log in button"}
            />
        </div>
    )
}