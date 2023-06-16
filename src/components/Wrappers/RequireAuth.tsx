import {UseUser} from "../../context/UserContext";
import {Navigate} from "react-router-dom";

export const RequireAuth = (props: {children: JSX.Element}) => {
    const userContext = UseUser()

    if (userContext.cState === "loading") {
        return <></>
    }

    return userContext.currentUser ? props.children : <Navigate to={'/'} />
}