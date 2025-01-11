'use client'
import Navbar from '@/components/Navbar/Navbar'
import React from 'react'
import styles from '@/assets/css/profile/profile.module.css'
import Image from 'next/image'
import profile_icon from "@/assets/img/profile-tick.svg";
import carry_logo from "@/assets/img/Carry UP.svg";
import location from "@/assets/img/location.svg";
import star1 from "@/assets/img/star1.svg";
import microphone from "@/assets/img/microphone.svg";
import buliding from "@/assets/img/buliding.svg";
import logout_icon from "@/assets/img/logout.svg";


function Profile() {

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <div>
      <Navbar />

      <div className={styles.profileContainer}>
        <div className={styles.sidebar}>
          <div className={styles.userInfo}>
            <Image
              src={carry_logo}
              className={styles.avatar}
              alt={'avatar'}
            />
            <div>
              <h2 className={styles.fullname}>Raul Gasimov</h2>
              <p className={styles.location}>
                <Image
                  src={location}
                  alt={'location'}
                />
                Azerbaijan, Baku</p>
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
                  className='icon'

                />
                My Ads Trip</button>
            </li>
            <li>
              <button className={styles.flex}>
                <Image
                  src={buliding}
                  alt={'buliding'}
                  className='icon'

                />
                My Ads Send</button>
            </li>
            <li >
              <button className={styles.flex}>
                <Image
                  src={logout_icon}
                  alt={'logout'}
                />
                Log out</button>
            </li>
          </ul>
        </div>

        <div className={styles.mainContent}>
          <form>
            <div className={styles.row}>
              <div className={styles.formGroup}>
                <label>Name</label>
                <input type="text" defaultValue={user.name || ''} />
              </div>
              <div className={styles.formGroup}>
                <label>Surname</label>
                <input type="text" defaultValue={user.surname || ''} />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.formGroup}>
                <label>Email</label>
                <input type="email" defaultValue={user.email || ''} />
              </div>
              <div className={styles.formGroup}>
                <label>Number</label>
                <input type="text" defaultValue={user.phoneNumber || ''} />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.formGroup}>
                <label>Location</label>
                <input type="text" defaultValue={user.country || ''} />
              </div>
              <div className={styles.formGroup}>
                <label>City</label>
                <input type="text" defaultValue={user.city || ''} />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.formGroup}>
                <label>Gender</label>
                <input type="text" defaultValue={user.gender || ''} />
              </div>
              <div className={styles.formGroup}>
                <label>Password</label>
                <input type="password" defaultValue={user.password || ''} />
              </div>
            </div>
            <div className={styles.buttonGroup}>
              <button type="button" className={styles.cancelBtn}>Cancel</button>
              <button type="submit" className={styles.saveBtn}>Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Profile