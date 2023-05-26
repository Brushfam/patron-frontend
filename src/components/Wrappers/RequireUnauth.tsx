import {UseUser} from "../../context/UserContext";
import {Navigate} from "react-router-dom";


export const RequireUnauth = (props: {children: JSX.Element}) => {
    const auth = UseUser()

    if (auth.currentUser) {
        return <Navigate to={'/'} />
    }

    return props.children
}