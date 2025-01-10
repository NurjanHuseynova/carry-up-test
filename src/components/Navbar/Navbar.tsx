'use client';
import React, { useEffect, useRef, useState } from 'react'
import styles from "@/assets/css/navbar/navbar.module.css"
import carry_logo from "@/assets/img/Carry UP.svg";
import logout_icon from "@/assets/img/logout.svg";
import profile_icon from "@/assets/img/profile-tick.svg";

import Image from "next/image";
import Link from 'next/link';

interface User {
  name: string,
  surname: string,
  photo: string; // URL of the user's avatar image
}

function Navbar() {

  const [user, setUser] = useState<User | null>(null);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    const userData = localStorage.getItem('user');

    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Close menu when clicking outside
    const handleOutsideClick = (event: any) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && !event.target.closest(`.${styles.userInfo}`)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  const handleLogout = () => {

    // -------logout functionality-------
    localStorage.removeItem('user');
    window.location.reload(); // Reload to reflect changes
  };


  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Image src={carry_logo} alt="Carry Logo" />
      </div>

      <nav className={styles.nav}>
        {
          !user ? (
            <>
              <Link href="/login" className={styles.navLink}>
                Login
              </Link>
              <Link href="/signUp" className={styles.navLink}>
                Sign Up
              </Link>
            </>) : (
            <div className={styles.userNav}>
              <div
                className={styles.userInfo}
                onClick={() => setShowMenu((prev) => !prev)}>
                <Image
                  src={profile_icon}
                  className={styles.avatar}
                  alt={'avatar'}
                  width={3}
                />
                <span className={styles.username}>{user.name + ' ' + user.surname}</span>
              </div>
              {showMenu && (
                <div className={styles.popupMenu} ref={menuRef}>
                  <Link href="/profile" className={styles.menuItem}>
                    <Image src={profile_icon} alt='profile' className={styles.popIcon} />
                    Profile
                  </Link>
                  <button className={styles.menuItem} onClick={handleLogout}>
                    <Image src={logout_icon} alt='logout' className={styles.popIcon} />
                    Logout
                  </button>
                </div>
              )}
              <button className={styles.postAdButton}>Post an Add</button>
            </div>
          )}
      </nav>
    </header >
  )
}

export default Navbar