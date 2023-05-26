import React from 'react';
import './LoginStepTitle.css'

export function LoginStepTitle(props: {text: string}) {
    return(
        <div className={"tab"}>
            {props.text}
        </div>
    )
}