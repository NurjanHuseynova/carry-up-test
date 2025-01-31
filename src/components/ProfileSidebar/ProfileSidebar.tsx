'use client'
import React, { useEffect, useState } from 'react';
import styles from '@/assets/css/profile/profileSidebar.module.css';
import Image from 'next/image';
import profile_icon from "@/assets/img/profile-tick.svg";
import carry_logo from "@/assets/img/Carry UP.svg";
import location from "@/assets/img/location.svg";
import star1 from "@/assets/img/star1.svg";
import microphone from "@/assets/img/microphone.svg";
import buliding from "@/assets/img/buliding.svg";
import logout_icon from "@/assets/img/logout.svg";
import message from "@/assets/img/message.svg";
import keySquare from "@/assets/img/key-square.svg";
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import axios from 'axios';


// Define the type for props
interface ProfileSidebarProps {
    onTabChange: (tab: string) => void;
    activeTab: string;
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ onTabChange, activeTab }) => {

    const [user, setUser] = useState<any>(null);
    const router = useRouter();
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL


    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
        setUser(storedUser);
    }, []);

    if (!user) {
        return <div>Loading...</div>;
    }

    const getTabClass = (tabName: string) =>
        `${styles.flex} ${activeTab === tabName ? styles.activeTab : ""}`;

    const handleLogout = async () => {
        const confirmDelete = window.confirm("Are you sure you want to log out?");
        if (!confirmDelete) return;

        try {
            const refreshToken = localStorage.getItem("refreshToken");

            const response = await axios.get(`${apiUrl}/Manage/Logout`, {
                params: { refreshToken },
            });

            console.log("Logout response:", response.data);

            // Clear local storage after logout request
            localStorage.removeItem("user");
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");

            setUser(null);
            router.push("/");
            toast.success('You have successfully logged out!')
        } catch (error: any) {
            toast.error(`Logout failed: ${error?.message}`);

        }
    };


    const base64Image = `data:image/png;base64,${user?.photo}`;

    return (
        <div className={styles.sidebar}>
            <div className={styles.userInfo}>
                <Image
                    src={base64Image}
                    className={styles.avatar}
                    alt={'avatar'}
                    width={85}
                    height={85}
                />
                <div>
                    <h2 className={styles.fullname}>{`${user.name || ''} ${user.surname || ''} `}</h2>
                    <p className={styles.location}>
                        <Image
                            src={location}
                            alt={'location'}
                        />
                        {`${user?.country || 'no country'}, ${user?.city || 'no city'} `}</p>
                    <span className={styles.rating}>
                        <Image
                            src={star1}
                            alt={'star'}
                        />
                        {user?.point}</span>
                </div>
            </div>
            <hr />
            <ul className={styles.menu}>
                <li>
                    <button className={getTabClass("profile")} onClick={() => onTabChange("profile")}>
                        <Image
                            color='red'
                            src={profile_icon}
                            alt={'profile'}
                            className={styles.icon}
                        />
                        Profile</button>
                </li>
                <li>
                    <button className={getTabClass("password")} onClick={() => onTabChange("password")}>
                        <Image
                            src={keySquare}
                            alt={'password_icon'}
                            className={styles.icon}
                        />
                        Password</button>
                </li>
                <li>
                    <button className={getTabClass("myAdsTrip")} onClick={() => onTabChange("myAdsTrip")}>
                        <Image
                            src={microphone}
                            alt={'microphone'}
                            className={styles.icon}
                        />
                        My Ads Trip</button>
                </li>
                <li>
                    <button className={getTabClass("myAdsSend")} onClick={() => onTabChange("myAdsSend")}>
                        <Image
                            src={buliding}
                            alt={'building'}
                            className={styles.icon}
                        />
                        My Ads Send</button>
                </li>
                <li>
                    <button className={getTabClass("myPoints")} onClick={() => onTabChange("myPoints")}>
                        <Image
                            src={message}
                            alt={'message'}
                            className={styles.icon}
                        />
                        My Points</button>
                </li>
                <li>
                    <button className={styles.flex} onClick={handleLogout}>
                        <Image
                            src={logout_icon}
                            alt={'logout'}
                        />
                        Log out</button>
                </li>
            </ul>
        </div>
    );
}

export default ProfileSidebar;
