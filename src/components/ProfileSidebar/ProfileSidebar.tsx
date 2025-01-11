'use client'
import React, { useEffect, useState } from 'react';
import styles from '@/assets/css/profileSidebar/profileSidebar.module.css';
import Image from 'next/image';
import profile_icon from "@/assets/img/profile-tick.svg";
import carry_logo from "@/assets/img/Carry UP.svg";
import location from "@/assets/img/location.svg";
import star1 from "@/assets/img/star1.svg";
import microphone from "@/assets/img/microphone.svg";
import buliding from "@/assets/img/buliding.svg";
import logout_icon from "@/assets/img/logout.svg";

function ProfileSidebar() {
    const [user, setUser] = useState<any>(null); 

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
        setUser(storedUser);
    }, []);

    if (!user) {
        return <div>Loading...</div>; 
    }

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
                    <button className={styles.flex}>
                        <Image
                            src={profile_icon}
                            alt={'profile'}
                            className={styles.icon}
                        />
                        Profile</button>
                </li>
                <li>
                    <button className={styles.flex}>
                        <Image
                            src={microphone}
                            alt={'microphone'}
                            className="icon"
                        />
                        My Ads Trip</button>
                </li>
                <li>
                    <button className={styles.flex}>
                        <Image
                            src={buliding}
                            alt={'building'}
                            className="icon"
                        />
                        My Ads Send</button>
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
