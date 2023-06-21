import styles from './Code.module.css'
import {useEffect, useState} from "react";
import {filesGet} from "../../api/ContractApi";


export function Code(props: {source_id: number}) {
    const [codeState, setCodeState] = useState<string[]>([])

    useEffect(() => {
        let listPromise = filesGet(props.source_id)
        listPromise.then((data) => {
            let parsedText = data.text.replaceAll('\n\n', '\n \n')
            setCodeState(parsedText.split('\n'))
        })

    }, [props.source_id])

    return(
        <div className={styles.codeWrapper}>
            <div className={styles.code}>
                {
                    codeState &&
                    codeState.map((text, i) => {
                        return(
                            <p key={i.toString()} style={{whiteSpace: "pre"}}>{text}</p>
                        )
                    })
                }
            </div>
        </div>
    )
}