"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/assets/css/navbar/navbar.module.css";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { fetchApi } from "@/services/api";

import carry_logo from "@/assets/img/Carry Us.svg";
import logout_icon from "@/assets/img/logout.svg";
import profile_icon from "@/assets/img/profile-tick.svg";
import hambuger_menu from "@/assets/img/hamburger_menu.svg";
import keySquare from "@/assets/img/key-square.svg";
import microphone from "@/assets/img/microphone.svg";
import buliding from "@/assets/img/buliding.svg";
import message from "@/assets/img/message.svg";
import close from "@/assets/img/close.svg";



interface User {
  name: string;
  surname: string;
  photo: string;
}

function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();


  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (userData) {
      setUser(JSON.parse(userData));
    }
    const handleOutsideClick = (event: any) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !event.target.closest(`.${styles.userInfo}`)
      ) {
        setShowMenu(false);
      }
      else if (mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !event.target.closest(`.${styles.hamburger}`)) {
        setIsMobileMenuOpen(false)
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);


  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");

      const res = await fetchApi(`Manage/Logout`, {
        refreshToken
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
      toast.success('You have successfully logged out!')
    } catch (error: any) {
      toast.error(`Logout failed!`);
    }
  };

  const base64Image = `data:image/png;base64,${user?.photo}`;


  return (
    <section className={styles.navbar}>
      <header className={`custom_container ${styles.header}`}>
        <div className={styles.logo}>
          <Link href="/" className="flex items-center">
            <Image src={carry_logo} alt="Carry Logo"  width={153} height={43}/>
          </Link>
        </div>

        <button className={styles.hamburger} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <Image src={hambuger_menu} alt="menu icon" />
        </button>

        {isMobileMenuOpen && (
          <div className={styles.mobileMenu} ref={mobileMenuRef}>
            <div className={styles.closeHeader}>
              <Image src={carry_logo} alt=""/>
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                <Image src={close} alt="close icon" />
              </button>
            </div>
            <ul className={styles.menu}>
              {
                user?.name && (<li>
                  <div
                    className={styles.userInfo}
                  >
                    <Image
                      src={base64Image}
                      className={styles.avatar}
                      alt={"avatar"}
                      width={36}
                      height={36}
                    />
                    <span className={styles.username}>
                      {user?.name + " " + user?.surname}
                    </span>
                  </div>
                </li>)
              }

              {
                !user ? (
                  <>
                    <li>
                      <Link href="/login" className={styles.menuItem}>
                        Login
                      </Link>
                    </li>
                    {!isMobileMenuOpen &&
                      <span className={styles.radius}></span>
                    }
                    <li>
                      <Link href="/signUp" className={styles.menuItem}>
                        Sign Up
                      </Link>
                    </li>
                  </>
                )
                  : (
                    <>
                      <li>
                        <button>
                          <Link href="/profile?tab=profile" className={styles.menuItem} onClick={() => setIsMobileMenuOpen(false)}>
                            <Image
                              src={profile_icon}
                              width={36}
                              height={36}
                              alt="profile"
                              className={styles.icon}
                            />
                            Profile
                          </Link>
                        </button>
                      </li>
                      <li>
                        <button className={`getTabClass("password")`}>
                          <Link href="/profile?tab=password" className={styles.menuItem} onClick={() => setIsMobileMenuOpen(false)}>
                            <Image
                              src={keySquare}
                              alt={'password_icon'}
                              className={styles.icon}
                            />
                            Password
                          </Link>
                        </button>

                      </li>
                      <li>
                        <button className={`getTabClass("myAdsTrip")`} >
                          <Link href="/profile?tab=myAdsTrip" className={styles.menuItem} onClick={() => setIsMobileMenuOpen(false)}>
                            <Image
                              src={microphone}
                              alt={'microphone'}
                              className={styles.icon}
                            />
                            My Ads Trip
                          </Link>
                        </button>
                      </li>
                      <li>
                        <button className={`getTabClass("myAdsSend")`}>
                          <Link href="/profile?tab=myAdsSend" className={styles.menuItem} onClick={() => setIsMobileMenuOpen(false)}>

                            <Image
                              src={buliding}
                              alt={'building'}
                              className={styles.icon}
                            />
                            My Ads Send
                          </Link>
                        </button>
                      </li>
                      <li>
                        <button className={`getTabClass("myPoints")`} >
                          <Link href="/profile?tab=myPoints" className={styles.menuItem} onClick={() => setIsMobileMenuOpen(false)}>
                            <Image
                              src={message}
                              alt={'message'}
                              className={styles.icon}
                            />
                            My Points
                          </Link>
                        </button>
                      </li>
                      <li>

                          <Link href={"post-an-add"} className={styles.postAdButton}>Post an Add</Link>
                 
                      </li>
                      <li>
                        <button className={styles.menuItem} onClick={handleLogout}>
                          <Image
                            src={logout_icon}
                            alt="logout"
                            className={styles.popIcon}
                          />
                          Logout
                        </button>
                      </li>
                    </>
                  )}
            </ul>


          </div>
        )}

        <nav className={styles.nav}>
          {!user ? (
            <>
              <Link href="/login" className={styles.navLink}>
                Login
              </Link>
              <span className={styles.radius}></span>
              <Link href="/signUp" className={styles.navLink}>
                Sign Up
              </Link>
            </>
          ) : (
            <div className={styles.userNav}>
              <div
                className={styles.userInfo}
                onClick={() => setShowMenu((prev) => !prev)}
              >
                <Image
                  src={base64Image}
                  className={styles.avatar}
                  alt={"avatar"}
                  width={36}
                  height={36}
                />
                <span className={styles.username}>
                  {user.name + " " + user.surname}
                </span>
              </div>
              {showMenu && (
                <div className={styles.popupMenu} ref={menuRef}>
                  <Link href="/profile" className={styles.menuItem}>
                    <Image
                      src={profile_icon}
                      width={36}
                      height={36}
                      alt="profile"
                      className={styles.popIcon}
                    />
                    Profile
                  </Link>
                  <button className={styles.menuItem} onClick={handleLogout}>
                    <Image
                      src={logout_icon}
                      alt="logout"
                      className={styles.popIcon}
                    />
                    Logout
                  </button>
                </div>
              )}
                <Link href={"post-an-add"}  className={styles.postAdButton}>Post an Add</Link>
             
            </div>
          )}
        </nav>
      </header>
    </section>
  );
}

export default Navbar;
