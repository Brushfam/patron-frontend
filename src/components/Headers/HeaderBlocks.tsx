import styles from './HeaderBlocks.module.css'
import {useNavigate} from "react-router-dom";
import {UseUser} from "../../context/UserContext";
import Tooltip from '@mui/material/Tooltip';

export default function HeaderBlocks() {
    const navigate = useNavigate();
    const UserContext = UseUser()

    function navigateToProfile() {
        navigate("/profile");
    }

    return(
        <div style={{display: "flex", alignItems: "center"}}>
            <Tooltip title={"Profile"}>
                <button className={styles.profileButton} onClick={navigateToProfile}>
                    <img src={'/icons/user.svg'} alt={"user icon"}/>
                </button>
            </Tooltip>
            <Tooltip title={"Log out"}>
                <button className={styles.logOutButton} onClick={() => {UserContext.logout()}}>
                    <img src={'/icons/buttons/log-out.svg'} style={{width: 16}} alt={"log out icon"}/>
                </button>
            </Tooltip>
        </div>

    )
}