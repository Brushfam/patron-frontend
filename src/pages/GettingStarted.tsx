import styles from "./GettingStarted.module.css"
import { UseUser } from "../context/UserContext"
import React, { useState } from "react"
import { GettingStartedHeader } from "../components/Headers/GettingStartedHeader"
import { MainHeaderLogged } from "../components/Headers/MainHeader"
import { LoginModal } from "../modal/LoginModal"
import { LoginButton } from "../components/Buttons/LoginButton"

export function GettingStarted() {
    const userContext = UseUser()
    const [loginOpen, setLoginOpen] = useState(false)

    return (
        <div className={styles.pageContainer}>
            <LoginModal isOpen={loginOpen} setModal={setLoginOpen} />
            {!userContext.currentUser ? (
                <GettingStartedHeader loginButton={<LoginButton onClickEvent={setLoginOpen} />} />
            ) : (
                <MainHeaderLogged />
            )}
            <div className={styles.mainBlock}>
                <p className={styles.mainTitle}>About project</p>
                <p className={styles.docsText}>
                    Smart contract verification ensures the security, reliability, and
                    trustworthiness of dApps and blockchain platforms. With Patron, you can simplify
                    the deployment flow, manage your builds and make the Polkadot ecosystem more
                    secure and transparent.
                </p>
                <p className={styles.docsText} style={{ marginBottom: 40 }}>
                    So, in other words, Patron is an all-in-one contracts platform, which allows you
                    to build and verify ink! smart contracts inside of an isolated environment,
                    explore contract verification details.
                </p>

                <p className={styles.mainTitle}>Main problem</p>
                <p className={styles.docsText}>
                    Our project solves the problem of reproducible and verifiable smart contract
                    builds. We utilize isolated and constrained environments to build your project
                    in a manner, which produces the same code hash for the same source code. By
                    using such reproducible builds for your smart contracts you can improve trust
                    with your users by guaranteeing that the source code that you publish is the
                    same source code that is used to deploy the contract on-chain.
                </p>
                <p className={styles.docsText} style={{ marginBottom: 40 }}>
                    Your deployment entrypoint is provided by the{" "}
                    <span style={{ color: "#4170E7" }}>patron deploy </span>
                    command, which encapsulates both build, upload and instantiation phases of your
                    smart contract deployment lifecycle.
                </p>

                <p className={styles.mainTitle}>Getting started</p>
                <p className={styles.docsText}>
                    Patron is created by{" "}
                    <a
                        href={"https://brushfam.io/"}
                        style={{
                            color: "#ECEDF1",
                            textDecoration: "underline",
                        }}
                    >
                        Brushfam
                    </a>{" "}
                    team as unified solution for smart contract verification. First, it provides a
                    developer-oriented CLI that allows to deploy and verify a contract in one step.
                    Patron uses{" "}
                    <a
                        href={"https://astar.network/"}
                        style={{
                            color: "#ECEDF1",
                            textDecoration: "underline",
                        }}
                    >
                        Astar
                    </a>{" "}
                    and{" "}
                    <a
                        href={"https://alephzero.org/"}
                        style={{
                            color: "#ECEDF1",
                            textDecoration: "underline",
                        }}
                    >
                        Aleph Zero
                    </a>{" "}
                    networks for deployment. Another part of the project is Patron UI, where you can
                    find smart contracts by their address or hash code and see the data of
                    contracts.
                </p>

                <p className={styles.secondTitle}>CLI installation</p>
                <p className={styles.docsText}>Start using the CLI by installing it using Cargo:</p>
                <div className={styles.codeBlock}>
                    <p>cargo install patron --git https://github.com/brushfam/patron-backend</p>
                </div>
                <p className={styles.docsText}>
                    Using our CLI, you can authenticate and deploy your smart contracts in an
                    instant, with a vastly simplified deploy flow. For deploy purposes, ensure that
                    you have the Rust toolchain installed (the builds themselves are not local, but{" "}
                    <span style={{ color: "#4170E7" }}>cargo</span> is used to install and invoke{" "}
                    <span style={{ color: "#4170E7" }}>cargo-contract</span>).
                </p>

                <p className={styles.secondTitle}>Authentication</p>
                <p className={styles.docsText}>
                    To authenticate, use the <span style={{ color: "#4170E7" }}>auth</span>{" "}
                    subcommand, which automatically redirects you to website to sign an
                    authentication message:
                </p>
                <div className={styles.codeBlock}>
                    <p>patron auth</p>
                </div>
                <p className={styles.docsText}>
                    If you are using a custom server, you can also pass{" "}
                    <span style={{ color: "#4170E7" }}>-s</span> and{" "}
                    <span style={{ color: "#4170E7" }}>-w</span> flags to provide URLs for the API
                    server and website.
                </p>
                <div className={styles.codeBlock}>
                    <p>patron auth -s https://api.example.com -w https://example.com</p>
                </div>
                <p className={styles.docsText}>
                    Custom server URLs are later propagated to other commands (such as deploy)
                    automatically.
                </p>

                <p className={styles.secondTitle}>Deploy</p>
                <p className={styles.docsText}>
                    The build process itself is done on a remote server, but the deployment process
                    is done locally to keep your private keys safe and to facilitate possible
                    air-gapped deployments.
                </p>
                <p className={styles.docsText}>
                    First of all, you need to create a{" "}
                    <span style={{ color: "#4170E7" }}>Deploy.toml</span> file at the root of your
                    contract source code. This file describes{" "}
                    <span style={{ color: "#4170E7" }}>cargo-contract</span> version that will be
                    used during the build:
                </p>
                <div className={styles.codeBlock}>
                    <p>cargo_contract_version = "3.0.1"</p>
                </div>
                <p className={styles.docsText}>
                    You can check this file into your VCS to share the same configuration with your
                    development team.
                </p>
                <p className={styles.docsText}>
                    To start the deploy process for locally running development node simply pass the
                    constructor name and secret URI for the private key:
                </p>
                <div className={styles.codeBlock}>
                    <p>patron deploy new --suri //Alice</p>
                </div>
                <p className={styles.docsText}>
                    If your contract constructor requires any arguments, simply pass them with the
                    same syntax that you use with the
                    <span style={{ color: "#4170E7" }}> cargo-contract</span>:
                </p>
                <div className={styles.codeBlock}>
                    <p>patron deploy new --args 123 --suri //Alice</p>
                </div>
                <p className={styles.docsText}>
                    Custom node URL can be provided with the{" "}
                    <span style={{ color: "#4170E7" }}>--url</span> flag:
                </p>
                <div className={styles.codeBlock}>
                    <p>patron deploy new --url wss://node.example.com:443 --suri ...</p>
                </div>
                <p className={styles.docsText}>
                    You can also pass arbitrary flags to{" "}
                    <span style={{ color: "#4170E7" }}>cargo-contract</span> using{" "}
                    <span style={{ color: "#4170E7" }}>--</span> syntax:
                </p>
                <div className={styles.codeBlock}>
                    <p>patron deploy new --suri //Alice -- --password 123</p>
                </div>
                <p className={styles.docsText}>
                    To get more information, invoke the deploy command with the{" "}
                    <span style={{ color: "#4170E7" }}>--help</span> flag.
                </p>

                <p className={styles.secondTitle}>Build without deploy</p>
                <p className={styles.docsText}>
                    You can get a verified WASM blob without automatic deployment:
                </p>
                <div className={styles.codeBlock}>
                    <p>patron build</p>
                </div>
            </div>
        </div>
    )
}
