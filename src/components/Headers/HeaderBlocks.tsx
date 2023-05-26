import './HeaderBlocks.css'
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
                <button className={"profileButton"} onClick={navigateToProfile}>
                    <img src={'/icons/user.svg'} style={{width: 20}} alt={"user icon"}/>
                </button>
            </Tooltip>
            <Tooltip title={"Log out"}>
                <button className={"disconnectButton"} onClick={() => {UserContext.logout()}}>
                    <img src={'/icons/disconnect.svg'} style={{width: 20}} alt={"disconnect icon"}/>
                </button>
            </Tooltip>
        </div>

    )
}