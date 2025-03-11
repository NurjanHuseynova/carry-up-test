"use client";
import React, { useEffect, useState } from "react";
import styles from "@/assets/css/profile/profileSidebar.module.css";
import Image from "next/image";
import profile_icon from "@/assets/img/profile-tick.svg";
import pen from "@/assets/img/pen.svg";

import location from "@/assets/img/location.svg";
import star1 from "@/assets/img/star1.svg";
import microphone from "@/assets/img/microphone.svg";
import buliding from "@/assets/img/buliding.svg";
import logout_icon from "@/assets/img/logout.svg";
import keySquare from "@/assets/img/key-square.svg";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { fetchApi } from "@/services/api";

interface ProfileSidebarProps {
  onTabChange: (tab: string) => void;
  activeTab: string;
  profilePhoto: string;
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({
  onTabChange,
  activeTab,
  profilePhoto,
}) => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(storedUser);
  }, []);

  if (!user) {
    return <div></div>;
  }

  const getTabClass = (tabName: string) =>
    `${styles.flex} ${activeTab === tabName ? styles.activeTab : ""}`;

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");

      const res = await fetchApi(`Manage/Logout`, {
        refreshToken,
      });

      if (res?.errors && res?.errors.length > 0) {
        res?.errors.forEach((error: string) => {
          toast.error(error);
        });
        return;
      }

      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      setUser(null);
      router.push("/");
      toast.success("You have successfully logged out!");
    } catch (error: any) {
      toast.error(`Logout failed!`);
    }
  };

  const base64Image = `data:image/png;base64,${user?.photo}`;

  return (
    <div className={styles.sidebar}>
      <div className={styles.userInfo}>
      <div>
      <Image
          src={profilePhoto || base64Image}
          className={styles.avatar}
          alt={"avatar"}
          width={85}
          height={85}
        />
          {/* <Image
              color="red"
              src={pen}
              alt={"profile"}
              className={styles.icon}
            /> */}
      </div>
        <div className="flex flex-col gap-2">
          <h2 className={styles.fullname}>{`${user.name || ""} ${
            user.surname || ""
          } `}</h2>
          <p className={styles.location}>
            <Image src={location} alt={"location"} />
            {`${user?.country?.name || "no country"}, ${
              user?.city || "no city"
            } `}
          </p>
          <span className={styles.rating}>
            <Image src={star1} alt={"star"} />
            {user?.point}
          </span>
        </div>
      </div>
      <hr />
      <ul className={styles.menu}>
        <li>
          <button
            className={getTabClass("profile")}
            onClick={() => onTabChange("profile")}
          >
           <Image
              color="red"
              src={profile_icon}
              alt={"profile"}
              className={styles.icon}
            />
           
            Profile
          </button>
        </li>
        <li>
          <button
            className={getTabClass("password")}
            onClick={() => onTabChange("password")}
          >
            <Image
              src={keySquare}
              alt={"password_icon"}
              className={styles.icon}
            />
            Password
          </button>
        </li>
        <li>
          <button
            className={getTabClass("myAdsTrip")}
            onClick={() => onTabChange("myAdsTrip")}
          >
            <Image
              src={microphone}
              alt={"microphone"}
              className={styles.icon}
            />
            My Ads Trip
          </button>
        </li>
        <li>
          <button
            className={getTabClass("myAdsSend")}
            onClick={() => onTabChange("myAdsSend")}
          >
            <Image src={buliding} alt={"building"} className={styles.icon} />
            My Ads Send
          </button>
        </li>
        <li>
          <button className={styles.flex} onClick={handleLogout}>
            <Image src={logout_icon} alt={"logout"} />
            Log out
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ProfileSidebar;
