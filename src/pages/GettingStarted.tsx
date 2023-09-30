import styles from "./GettingStarted.module.css"
import { UseUser } from "../context/UserContext"
import React, { useEffect, useState } from "react"
import { GettingStartedHeader } from "../components/Headers/GettingStartedHeader"
import { MainHeaderLogged } from "../components/Headers/MainHeader"
import { LoginModal } from "../components/LoginModal/LoginModal"
import { CodeBlock } from "../components/GettingStarted/CodeBlocks"
import { LoginButton } from "../components/Buttons/LoginButton"

export function GettingStarted() {
    const userContext = UseUser()
    const [loginOpen, setLoginOpen] = useState(false)

    useEffect(() => {
        const currentURL = window.location.href
        let currentSection = currentURL.slice(currentURL.lastIndexOf("#"))
        if (currentSection.startsWith("#")) {
            setTimeout(() => {
                let element = document.getElementById(currentSection.slice(1))
                if (element) {
                    element.scrollIntoView({ behavior: "smooth", block: "center" })
                }
            }, 200)
        }
    }, [])

    return (
        <div className={styles.pageContainer}>
            <LoginModal isOpen={loginOpen} setModal={setLoginOpen} isLogin={false} />
            {!userContext.currentUser ? (
                <GettingStartedHeader loginButton={<LoginButton onClickEvent={setLoginOpen} />} />
            ) : (
                <MainHeaderLogged />
            )}
            <div className={styles.mainBlock}>
                <p id={"about-project"} className={styles.mainTitle}>
                    About project
                </p>
                <p className={styles.docsText}>
                    Smart contract verification ensures the security, reliability, and
                    trustworthiness of dApps and blockchain platforms. With Patron, you can simplify
                    the deployment flow, manage your builds and make the Polkadot ecosystem more
                    secure and transparent.
                </p>
                <p className={styles.docsText}>
                    So, in other words, Patron is an all-in-one contracts platform, which allows you
                    to build and verify ink! smart contracts inside of an isolated environment,
                    explore contract verification details.
                </p>
                <div className={styles.videoText} style={{ marginBottom: 40 }}>
                    <img src={"/icons/video-icon.svg"} alt={"video icon"} />
                    <p>
                        Watch the{" "}
                        <a
                            href={"https://youtu.be/MFmkVMpV4_0?si=fgVZ3zCr2YeQyJXE"}
                            target={"_blank"}
                            rel="noreferrer"
                            style={{
                                color: "#ECEDF1",
                                textDecoration: "underline",
                            }}
                        >
                            video about Patron
                        </a>{" "}
                        to learn more!
                    </p>
                </div>

                <p id={"main-problem"} className={styles.mainTitle}>
                    Main problem
                </p>
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

                <p id={"getting-started"} className={styles.mainTitle}>
                    Getting started
                </p>
                <p className={styles.docsText}>
                    Patron is created by{" "}
                    <a
                        href={"https://brushfam.io/"}
                        target={"_blank"}
                        rel="noreferrer"
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
                        target={"_blank"}
                        rel="noreferrer"
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
                        target={"_blank"}
                        rel="noreferrer"
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

                <p id={"cli-installation"} className={styles.secondTitle}>
                    CLI installation
                </p>
                <p className={styles.docsText}>Start using the CLI by installing it using Cargo:</p>
                <CodeBlock
                    command={
                        "cargo install patron --git https://github.com/brushfam/patron-backend"
                    }
                />
                <p className={styles.docsText}>
                    Using our CLI, you can authenticate and deploy your smart contracts in an
                    instant, with a vastly simplified deploy flow. For deploy purposes, ensure that
                    you have the Rust toolchain installed (the builds themselves are not local, but{" "}
                    <span style={{ color: "#4170E7" }}>cargo</span> is used to install and invoke{" "}
                    <span style={{ color: "#4170E7" }}>cargo-contract</span>).
                </p>
                <div className={styles.videoText}>
                    <img src={"/icons/video-icon.svg"} alt={"video icon"} />
                    <p>
                        Watch the{" "}
                        <a
                            href={"https://youtu.be/6-B64g3-ZSs?si=iD4_FZ6UdhMYnOqa"}
                            target={"_blank"}
                            rel="noreferrer"
                            style={{
                                color: "#ECEDF1",
                                textDecoration: "underline",
                            }}
                        >
                            CLI tutorial video
                        </a>{" "}
                        !
                    </p>
                </div>

                <p id={"authentication"} className={styles.secondTitle}>
                    Authentication
                </p>
                <p className={styles.docsText}>
                    To authenticate, use the <span style={{ color: "#4170E7" }}>auth</span>{" "}
                    subcommand, which automatically redirects you to website to sign an
                    authentication message:
                </p>
                <CodeBlock command={"patron auth"} />
                <p className={styles.docsText}>
                    If you are using a custom server, you can also pass{" "}
                    <span style={{ color: "#4170E7" }}>-s</span> and{" "}
                    <span style={{ color: "#4170E7" }}>-w</span> flags to provide URLs for the API
                    server and website.
                </p>
                <CodeBlock
                    command={"patron auth -s https://api.example.com -w https://example.com"}
                />
                <p className={styles.docsText}>
                    Custom server URLs are later propagated to other commands (such as deploy)
                    automatically.
                </p>

                <p id={"build-without-deploy"} className={styles.secondTitle}>
                    Build without deploy
                </p>
                <p className={styles.docsText}>
                    You can acquire contract's WASM blob and JSON metadata files without the
                    deployment itself by using the <span style={{ color: "#4170E7" }}>build</span>{" "}
                    subcommand which, by default, outputs{" "}
                    <span style={{ color: "#4170E7" }}>contract.wasm</span> and{" "}
                    <span style={{ color: "#4170E7" }}>contract.json</span> files to the{" "}
                    <span style={{ color: "#4170E7" }}>./target/ink</span> directory.
                </p>
                <p className={styles.docsText}>
                    To build the contract with Patron, you need to create a{" "}
                    <span style={{ color: "#4170E7" }}>Deploy.toml</span> file to the root of your
                    project. This file describes{" "}
                    <span style={{ color: "#4170E7" }}>cargo-contract</span> version that will be
                    used during the build. Also, you can check this file into your VCS to share the
                    same configuration with your development team.
                </p>
                <div className={styles.tomlFile}>
                    <img src={"/icons/toml-file.svg"} alt={"toml file"} />
                    <p>Deploy.toml</p>
                </div>
                <CodeBlock command={'cargo_contract_version = "3.2.0"'} />
                <p className={styles.docsText}>After that, you can run the command:</p>
                <CodeBlock command={"patron build"} />
                <p className={styles.docsText}>
                    When the build process is complete, it will return link to the page with
                    verified build session.
                </p>
                <p className={styles.docsText}>
                    Build command also supports building multi-contract projects using the{" "}
                    <span style={{ color: "#4170E7" }}>--root</span> flag:
                </p>
                <CodeBlock command={"patron build --root accumulator"} />
                <p className={styles.docsText}>
                    See <span style={{ color: "#4170E7" }}>--help</span> flag output for more
                    information.
                </p>

                <p id={"local-verifying"} className={styles.secondTitle}>
                    Local verifying
                </p>
                <p className={styles.docsText}>
                    To verify WASM blob use <span style={{ color: "#4170E7" }}>verify</span>{" "}
                    subcommand. It will start two build processes – local and remote one.
                </p>
                <CodeBlock command={"patron verify"} />
                <p className={styles.docsText}>
                    After builds process will finished, it returns result of verification:
                </p>
                <div className={styles.codeExample}>
                    <p>Local code hash: </p>
                    <p>0xce5...</p>
                    <p>Code hashes are matching.</p>
                </div>

                <p id={"deploy"} className={styles.secondTitle}>
                    Deploy
                </p>
                <p className={styles.docsText}>
                    The build process itself is done on a remote server, but the deployment process
                    is done locally to keep your private keys safe and to facilitate possible
                    air-gapped deployments.
                </p>
                <p className={styles.docsText}>
                    First of all, you need to create a{" "}
                    <span style={{ color: "#4170E7" }}>Deploy.toml</span> as described in "Build
                    without deploy" section above.
                </p>
                <p className={styles.docsText}>
                    To start the deployment process for locally running development node simply pass
                    the constructor name and secret URI for the private key:
                </p>
                <CodeBlock command={"patron deploy new --suri //Alice"} />
                <p className={styles.docsText}>or</p>
                <CodeBlock
                    command={'patron deploy new --suri "private key using mnemonic phrase"'}
                />
                <p className={styles.docsText}>
                    If your contract constructor requires any arguments, simply pass them with the
                    same syntax that you use with the
                    <span style={{ color: "#4170E7" }}> cargo-contract</span>:
                </p>
                <CodeBlock command={"patron deploy new --args 123 --suri //Alice"} />
                <p className={styles.docsText}>or</p>
                <CodeBlock
                    command={"patron deploy with_two_args --args 123,false --suri //Alice"}
                />
                <p className={styles.docsText}>
                    Custom node URL can be provided with the{" "}
                    <span style={{ color: "#4170E7" }}>--url</span> flag:
                </p>
                <CodeBlock
                    command={"patron deploy new --url wss://node.example.com:443 --suri ..."}
                />
                <p className={styles.docsText}>
                    You can also pass arbitrary flags to{" "}
                    <span style={{ color: "#4170E7" }}>cargo-contract</span> using{" "}
                    <span style={{ color: "#4170E7" }}>--</span> syntax:
                </p>
                <CodeBlock command={"patron deploy new --suri //Alice -- --password 123"} />
                <p className={styles.docsText}>
                    To deploy a project where multi-contracts are stored within one workspace use{" "}
                    <span style={{ color: "#4170E7" }}>--root</span> flag:
                </p>
                <CodeBlock command={"patron deploy new --suri //Alice --root accumulator"} />
                <p className={styles.docsText}>
                    To get more information, invoke the deploy command with the{" "}
                    <span style={{ color: "#4170E7" }}>--help</span> flag.
                </p>

                <p id={"contract-caller"} className={styles.secondTitle}>
                    Contract caller
                </p>
                <p className={styles.docsText}>
                    Contract pages contain contract caller UI, so that you can interact with smart
                    contracts deployed on Astar or Aleph Zero. For this, you need to be logged in
                    Patron web app. Go to the contract page and find{" "}
                    <span style={{ color: "#4170E7" }}>Caller</span> tab. Here you can see contract
                    functions and documentation if it was provided in the code. To call{" "}
                    <span style={{ color: "#4170E7" }}>write</span> functions you will need to pay a
                    fee using your wallet.
                </p>
                <p className={styles.docsText}>
                    Take note, you need to build a contract with{" "}
                    <span style={{ color: "#4170E7" }}>cargo-contract</span> version that matches
                    the version of pallet contracts of the blockchain (for instance,{" "}
                    <span style={{ color: "#4170E7" }}>cargo-contract 3.2.0</span> is compatible
                    with Aleph Zero network).
                </p>

                <p id={"watch"} className={styles.secondTitle}>
                    Watch
                </p>
                <p className={styles.docsText}>
                    File watch functionality allows you to simplify your build-deploy-interact cycle
                    during the development process with an automatically refreshed contract caller
                    and contract builder invoked on any meaningful file change.
                </p>
                <p className={styles.docsText}>
                    To start watching, provide the constructor name and suri to the{" "}
                    <span style={{ color: "#4170E7" }}>watch</span> subcommand:
                </p>
                <CodeBlock command={"patron watch new --suri //Alice"} />
                <p className={styles.docsText}>
                    It will open the page with the local contract caller. This component will be
                    refreshed after every build created during the watch command process.
                </p>

                <p id={"local-build-with-verification"} className={styles.secondTitle}>
                    Local build with remote verification
                </p>
                <p className={styles.docsText}>
                    You can also utilize <span style={{ color: "#4170E7" }}>cargo-contract's</span>{" "}
                    support of verifiable builds to locally build your contract, deploy it on chain
                    and verify it only after the deployment process.
                </p>
                <p className={styles.docsText} style={{ marginBottom: 10 }}>
                    1. Run{" "}
                    <span style={{ color: "#4170E7" }}>cargo contract build --verifiable</span>,
                    wait for the build to finish.
                </p>
                <p className={styles.docsText} style={{ marginBottom: 10 }}>
                    2. Deploy your contract on chain.
                </p>
                <p className={styles.docsText}>
                    3. Run patron build to verify your source code remotely.
                </p>
                <p className={styles.docsText}>
                    By using CLI in that manner, you can ensure that the code on chain was produced
                    locally, while still verifying it with Patron.
                </p>
            </div>
        </div>
    )
}
