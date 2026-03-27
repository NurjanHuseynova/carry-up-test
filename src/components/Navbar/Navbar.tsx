"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/assets/css/navbar/navbar.module.css";
import Image from "next/image";
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
import { useLocale, useTranslations } from "next-intl";
import NavigationLink from "../UI/NavigationLink";
import { AppPathnames } from "@/config";
import LocaleSwitcher from "../UI/LocaleSwitcher";

interface User {
  name: string;
  surname: string;
  photo: string;
}

function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const currentLocale = useLocale();
  const [menuOpen, setMenuOpen] = useState(false);

  const languages = ["en", "az", "ru"]; 

  const handleSelect = (lang: string) => {
    setMenuOpen(false);
    const path = window.location.pathname; 
    const newPath = `/${lang}${path.replace(/^\/(en|az|ru)/, "")}`;
    router.push(newPath);
  };

  const selectedLang = currentLocale;

  const menuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const t = useTranslations("Static");

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
      } else if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !event.target.closest(`.${styles.hamburger}`)
      ) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

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
    <section className={styles.navbar}>
      <header className={`custom_container ${styles.header}`}>
        <div className={styles.logo}>
           <NavigationLink href={`/` as AppPathnames} className=""><Image src={carry_logo} alt="Carry Logo" width={153} height={43} /></NavigationLink>
          {/* <Link href="/" className="flex items-center">
            <Image src={carry_logo} alt="Carry Logo" width={153} height={43} />
          </Link> */}
        </div>

        <button
          className={styles.hamburger}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Image src={hambuger_menu} alt="menu icon" />
        </button>

        {isMobileMenuOpen && (
          <div className={styles.mobileMenu} ref={mobileMenuRef}>
            <div className={styles.closeHeader}>
              <Image src={carry_logo} alt="" />
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                <Image src={close} alt="close icon" />
              </button>
            </div>
            <ul className={styles.menu}>
              {user?.name && (
                <li>
                  <div className={styles.userInfo}>
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
                </li>
              )}

              {!user ? (
                <>
                  <li>
                         <NavigationLink
                      href={`/login` as AppPathnames}
                      className=""
                    ></NavigationLink>
                    {/* <Link href="/login" className={styles.menuItem}>
                      {t("login")}
                    </Link> */}
                  </li>
                  {!isMobileMenuOpen && <span className={styles.radius}></span>}
                  <li>
                    <NavigationLink  href={`/signUp` as AppPathnames} className={styles.menuItem}>
                      {t("sign up")}
                    </NavigationLink>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <button>
                      <NavigationLink
                      href={`/profile?tab=profile` as AppPathnames}
                     className=""
                        // className={styles.menuItem}
                        // onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Image
                          src={profile_icon}
                          width={36}
                          height={36}
                          alt="profile"
                          className={styles.icon}
                        />
                        {t("profile")}
                      </NavigationLink>
                    </button>
                  </li>
                  <li>
                    <button className={`getTabClass("password")`}>
                      <NavigationLink
                        href={`/profile?tab=password` as AppPathnames}
                        className={styles.menuItem}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Image
                          src={keySquare}
                          alt={"password_icon"}
                          className={styles.icon}
                        />
                        {t("password")}
                      </NavigationLink>
                    </button>
                  </li>
                  <li>
                    <button className={`getTabClass("myAdsTrip")`}>
                      <NavigationLink
                      href={`/profile?tab=myAdsTrip` as AppPathnames}
                       
                        className={styles.menuItem}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Image
                          src={microphone}
                          alt={"microphone"}
                          className={styles.icon}
                        />
                        {t("my ads trip")}
                      </NavigationLink>
                    </button>
                  </li>
                  <li>
                    <button className={`getTabClass("myAdsSend")`}>
                      <NavigationLink
                      href={`/profile?tab=myAdsSend` as AppPathnames}
                       
                        className={styles.menuItem}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Image
                          src={buliding}
                          alt={"building"}
                          className={styles.icon}
                        />
                        {t("my ads send")}
                      </NavigationLink>
                    </button>
                  </li>
                  <li>
                    <button className={`getTabClass("myPoints")`}>
                      <NavigationLink
                      href={`/profile?tab=myPoints` as AppPathnames}
                       
                        className={styles.menuItem}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Image
                          src={message}
                          alt={"message"}
                          className={styles.icon}
                        />
                        {t("my points")}
                      </NavigationLink>
                    </button>
                  </li>
                  <li>
                    <NavigationLink  href={`/post-an-add` as AppPathnames} className={styles.postAdButton}>
                      {t("Post an add")}
                    </NavigationLink>
                  </li>
                  <li>
                    <button className={styles.menuItem} onClick={handleLogout}>
                      <Image
                        src={logout_icon}
                        alt="logout"
                        className={styles.popIcon}
                      />
                      {t("logout")}
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
              <NavigationLink  href={`/login` as AppPathnames} className={styles.navLink}>
                {t("login")}
              </NavigationLink>
              <span className={styles.radius}></span>
              <NavigationLink  href={`/signUp` as AppPathnames} className={styles.navLink}>
                {t("sign up")}
              </NavigationLink>
           <div className={styles.langContainer}>
      <button
        className={styles.langTrigger}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {selectedLang.toUpperCase()}
      </button>

      {menuOpen && (
        <div className={styles.langMenu}>
          {/* <LocaleSwitcher /> */}
          {languages
            .filter((lang) => lang !== selectedLang)
            .map((lang) => (
              <a
                key={lang}
                onClick={() => handleSelect(lang)}
                className={styles.langItem}
              >
                {lang.toUpperCase()}
              </a>
            ))}
        </div>
      )}
    </div>

           
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
                  <NavigationLink  href={`/profile` as AppPathnames} className={styles.menuItem}>
                    <Image
                      src={profile_icon}
                      width={36}
                      height={36}
                      alt="profile"
                      className={styles.popIcon}
                    />
                    {t("profile")}
                  </NavigationLink>
                  <button className={styles.menuItem} onClick={handleLogout}>
                    <Image
                      src={logout_icon}
                      alt="logout"
                      className={styles.popIcon}
                    />
                    {t("logout")}
                  </button>
                </div>
              )}
              <NavigationLink   href={`/post-an-add` as AppPathnames}  className={styles.postAdButton}>
                {t("post an add")}
              </NavigationLink>
            </div>
          )}
        </nav>
      </header>
    </section>
  );
}

export default Navbar;
