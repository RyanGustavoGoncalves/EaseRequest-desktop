/* eslint-disable prettier/prettier */
import { useState, useEffect } from "react";
import Logo from '../assets/iconList.png';
import user from '../pages/auth/assets/user.png';
import { Link } from "react-router-dom";
import { FetchUser } from "@renderer/pages/home/components/utils/getInfoUser/FetchUser";

interface UserData {
    idUsers: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    profileImage: null;
}

const Navbar: React.FC = () => {
    const token = localStorage.getItem('token');
    const [userData, setUserData] = useState<UserData>({});

    const isActive = (path: string): boolean => {
        return window.location.pathname === path;
    };

    useEffect(() => {
        FetchUser(token, setUserData);
    }, [token]);


    return (
        <header>
            <nav className="navSup">
                <div className="headerLogoName">
                    <Link to={"/"}>
                        <img src={Logo} width={30} alt="Logo" />
                    </Link>
                    <div className="userPerfil">
                        <Link to={"/Settings"}>
                            <img
                                src={userData.profileImage ? `data:image/png;base64,${userData.profileImage}` : user}
                                alt="userImage"
                            />
                            <h1>{userData.username}</h1>
                        </Link>
                    </div>
                </div>
                <div className="scroll">
                    <nav className={"show"}>
                        <ul>
                            <li key="overview">
                                <Link to={"/"} className={isActive("/") ? "active" : "noActive"}>
                                    Overview
                                </Link>
                            </li>
                        </ul>
                        <ul>
                            <li key="settings">
                                <Link to={"/Settings"} className={isActive("/Settings") ? "active" : "noActive"}>
                                    Settings
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;
