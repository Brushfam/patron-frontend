import { Navigate, useParams } from "react-router-dom"
import React from "react"

export function NavigateToTab(props: { codeType: string, tab: string }) {
    let params = useParams()
    return params.id ? (
        <Navigate to={"/" + props.codeType + "/" + params.id + '/' + props.tab} />
    ) : (
        <Navigate to={"/"} />
    )
}
