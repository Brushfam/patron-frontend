import styles from './HeaderBlocksLayout.module.css'

export function HeaderBlocksLayout(props: {searchBar?: JSX.Element, blocks?: JSX.Element}) {
    return(
        <div className={styles.userContextBlock}>
            {props.searchBar}
            {props.blocks}
        </div>
    )
}