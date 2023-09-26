import styles from './LoginButton.module.css'
import React from "react";

export function LoginButton(props: {onClickEvent:  React.Dispatch<React.SetStateAction<boolean>>}) {
    return(
        <button
            className={styles.loginButton}
            onClick={() => {
                props.onClickEvent(true);
            }}
        >
            Log in
            <img
                src={"/icons/buttons/log-in.svg"}
                style={{ marginLeft: 10 }}
                alt={"log in button"}
            />
        </button>
    )
}