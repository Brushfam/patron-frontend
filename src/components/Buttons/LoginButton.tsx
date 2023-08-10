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
            <img
                src={"icons/buttons/log-in.svg"}
                style={{ marginRight: 10 }}
                alt={"log in button"}
            />
            Log in
        </button>
    )
}