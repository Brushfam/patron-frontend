import { BaseHeader } from "./BaseHeader";
import HeaderBlocks from "./HeaderBlocks";
import { HeaderSearchBar } from "./HeaderSearchBar";
import {HeaderBlocksLayout} from "./HeaderBlocksLayout";
import styles from './MainHeader.module.css'

export function MainHeader() {
    return (
        <>
            <div className={styles.desktop}>
                <BaseHeader children={<HeaderBlocksLayout searchBar={<HeaderSearchBar elementId={'search-header'} />}/> } />
            </div>
            <div className={styles.mobile}>
                <div className={styles.headerSearchWrapper}>
                    <HeaderSearchBar barWidth={"100%"} elementId={'search-header-mobile'}/>
                </div>
                <BaseHeader />
            </div>
        </>
    );
}

export function MainHeaderLogged() {
    return (
        <>
            <div className={styles.desktop}>
                <BaseHeader children={<HeaderBlocksLayout searchBar={<HeaderSearchBar elementId={'search-header'} />} blocks={<HeaderBlocks />}/> } />
            </div>
            <div className={styles.mobile}>
                <div className={styles.headerSearchWrapper}>
                    <HeaderSearchBar barWidth={"100%"} elementId={'search-header-mobile'}/>
                </div>
                <BaseHeader children={<HeaderBlocks /> } />
            </div>
        </>
    );
}
