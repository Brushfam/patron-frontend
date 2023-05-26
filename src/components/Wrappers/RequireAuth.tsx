import {UseUser} from "../../context/UserContext";
import {Navigate} from "react-router-dom";


export const RequireAuth = (props: {children: JSX.Element}) => {
    const auth = UseUser()

    if (!auth.currentUser) {
        return <Navigate to={'/'} />
    }

    return props.children
}