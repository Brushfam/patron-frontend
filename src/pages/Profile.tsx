import { MainHeaderLogged} from "../components/Headers/MainHeader";
import styles from './Profile.module.css'
import {AddressBlock} from "../components/AddressBlock/AddressBlock";
import { UseUser } from "../context/UserContext";
import {UserContractsList} from "../components/Lists/UserContractsList";


export function Profile() {
    const userContext = UseUser()

    return(
        <div className={styles.profile}>
            <MainHeaderLogged/>
            <div className={styles.mainBlock}>
                <div className={styles.addressWrapper}>
                    <AddressBlock name={"Address"} iconPath={"/address-square.svg"} address={userContext.currentUser} verified={false}/>
                </div>
                <UserContractsList/>
            </div>
        </div>
    )
}