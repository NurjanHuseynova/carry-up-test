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


// Define the type for props
interface ProfileSidebarProps {
    onTabChange: (tab: string) => void;
    activeTab: string;
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ onTabChange, activeTab }) => {
    const [user, setUser] = useState<any>(null);
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
        setUser(storedUser);
    }, []);

    if (!user) {
        return <div>Loading...</div>;
    }

    const getTabClass = (tabName: string) =>
        `${styles.flex} ${activeTab === tabName ? styles.activeTab : ""}`;

    return (
        <div className={styles.sidebar}>
            <div className={styles.userInfo}>
                <Image
                    src={carry_logo}
                    className={styles.avatar}
                    alt={'avatar'}
                />
                <div>
                    <h2 className={styles.fullname}>{`${user.name || ''} ${user.surname || ''}`}</h2>
                    <p className={styles.location}>
                        <Image
                            src={location}
                            alt={'location'}
                        />
                        {`${user.country}, ${user.city}`}</p>
                    <span className={styles.rating}>
                        <Image
                            src={star1}
                            alt={'star'}
                        />
                        4.8</span>
                </div>
            </div>
            <hr />
            <ul className={styles.menu}>
                <li>
                    <button className={getTabClass("profile")} onClick={() => onTabChange("profile")}>
                        <Image
                            src={profile_icon}
                            alt={'profile'}
                            className={styles.icon}
                        />
                        Profile</button>
                </li>
                <li>
                    <button className={getTabClass("myAdsTrip")} onClick={() => onTabChange("myAdsTrip")}>
                        <Image
                            src={microphone}
                            alt={'microphone'}
                            className="icon"
                        />
                        My Ads Trip</button>
                </li>
                <li>
                    <button className={getTabClass("myAdsSend")} onClick={() => onTabChange("myAdsSend")}>
                        <Image
                            src={buliding}
                            alt={'building'}
                            className="icon"
                        />
                        My Ads Send</button>
                </li>
                <li>
                    <button className={getTabClass("myPoints")} onClick={() => onTabChange("myPoints")}>
                        <Image
                            src={message}
                            alt={'message'}
                            className="icon"
                        />
                        My Points</button>
                </li>
                <li>
                    <button className={styles.flex}>
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
