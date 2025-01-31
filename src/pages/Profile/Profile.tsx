'use client'
import ProfileForm from '@/components/ProfileForm/ProfileForm'
import ProfileSidebar from '@/components/ProfileSidebar/ProfileSidebar'
import React, { useState } from 'react'
import styles from '@/assets/css/profile/profile.module.css'
import CarryList from '@/components/ProfileCarryList/CarryList'
import SendList from '@/components/ProfileSendList/SendList'
import PasswordTab from '@/components/ProfilePasswordTab/PasswordTab'
import isAuth from '@/components/isAuth/isAuth'



function Profile() {

  const [activeTab, setActiveTab] = useState<string>("profile");

  return (
    <div className={styles.profileContainer}>
      <ProfileSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      {activeTab === "profile" && <ProfileForm />}
      {activeTab === "password" && <PasswordTab />}
      {activeTab === "myAdsTrip" && <CarryList />}
      {activeTab === "myAdsSend" && <SendList />}
      {/* {JSON.stringify(activeTab)} */}
    </div>
  )
}

export default isAuth(Profile)