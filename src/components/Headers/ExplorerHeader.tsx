import { UseUser } from "../../context/UserContext";
import {MainHeader, MainHeaderLogged} from "./MainHeader";

export function ExplorerHeader() {
    const userContext = UseUser();
    return userContext.currentUser ? <MainHeaderLogged /> : <MainHeader />;
}
