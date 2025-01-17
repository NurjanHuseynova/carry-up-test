'use client'
import ProfileForm from '@/components/ProfileForm/ProfileForm'
import ProfileSidebar from '@/components/ProfileSidebar/ProfileSidebar'
import React, { useState } from 'react'
import styles from '@/assets/css/profile/profile.module.css'
import CarryList from '@/components/CarryList/CarryList'
import SendList from '@/components/SendList/SendList'



function Profile() {

  const [activeTab, setActiveTab] = useState<string>("profile");

  return (
    <div className={styles.profileContainer}>
      <ProfileSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      {activeTab === "profile" && <ProfileForm />}
      {activeTab === "myAdsTrip" && <CarryList />}
      {activeTab === "myAdsSend" && <SendList />}
      {/* {JSON.stringify(activeTab)} */}
    </div>
  )
}

export default Profile