import { MainHeaderLogged} from "../components/Headers/MainHeader";
import styles from './Profile.module.css'
import {AddressElements} from "../components/ContractComponents/AddressElements";
import { UseUser } from "../context/UserContext";
import {UserContractsList} from "../components/Lists/UserContractsList";


export function Profile() {
    const userContext = UseUser()

    return(
        <div className={styles.profile}>
            <MainHeaderLogged/>
            <div className={styles.mainBlock}>
                <div className={styles.addressWrapper}>
                    <AddressElements name={"Address"} iconPath={"/address-square.svg"} address={userContext.currentUser} verified={false}/>
                </div>
                <UserContractsList/>
            </div>
        </div>
    )
}