import React from "react"
import styles from "./PrivacyPolicy.module.css"
import { GettingStartedHeader } from "../components/Headers/GettingStartedHeader"
import { LoginButton } from "../components/Buttons/LoginButton"
import { privacyPolicyNavigation } from "../data/PrivacyPolicy/PrivacyPolicyNavigation"
import { point0, points } from "../data/PrivacyPolicy/PrivacyPolicyPoints"

export function PrivacyPolicy() {

    return (
        <div className={styles.pageContainer}>
            <GettingStartedHeader loginButton={<LoginButton />} />
            <div className={styles.mainBlock}>
                <p className={styles.titleText}>CONTENT</p>
                <p className={styles.updatedText}>LAST UPDATED: Sep 18, 2023</p>
                <div className={styles.navigation}>
                    {privacyPolicyNavigation &&
                        privacyPolicyNavigation.map((item, i) => {
                            return (
                                <a key={i.toString()} href={"#point" + (i + 1).toString()}>
                                    <div>
                                        {i + 1}. {item.point}
                                    </div>
                                </a>
                            )
                        })}
                </div>
                <div className={styles.content}>
                    <div className={styles.contentPointText}>
                        {point0 &&
                            point0.map((item, i) => {
                                return <div key={i.toString()}>{item.text}</div>
                            })}
                    </div>
                    {points &&
                        points.map((item, itemNumber) => {
                            return (
                                <div
                                    key={itemNumber.toString()}
                                    className={styles.contentPoint}
                                    id={"point" + (itemNumber + 1).toString()}
                                >
                                    <div className={styles.titleText}>{item.title}</div>
                                    <div className={styles.contentPointText}>
                                        {item.point &&
                                            item.point.map((paragraph, textNumber) => {
                                                return (
                                                    <div key={textNumber.toString()}>
                                                        {paragraph.text}
                                                    </div>
                                                )
                                            })}
                                    </div>
                                </div>
                            )
                        })}
                </div>
            </div>
        </div>
    )
}
