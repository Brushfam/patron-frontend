import styles from "./MainHeader.module.css";
import { BaseHeader } from "./BaseHeader";
import { HeaderBlocksLayout } from "./HeaderBlocksLayout";
import { HeaderSearchBar } from "./HeaderSearchBar";

export function GettingStartedHeader(props: {loginButton: JSX.Element}) {
    return (
        <>
            <div className={styles.desktop}>
                <BaseHeader children={<HeaderBlocksLayout searchBar={<HeaderSearchBar elementId={'search-header'} />} blocks={props.loginButton}/> } />
            </div>
            <div className={styles.mobile}>
                <div className={styles.headerSearchWrapper}>
                    <HeaderSearchBar barWidth={"100%"} elementId={'search-header-mobile'}/>
                </div>
                <BaseHeader children={<HeaderBlocksLayout blocks={props.loginButton}/>}/>
            </div>
        </>
    );
}
