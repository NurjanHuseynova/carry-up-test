'use client'
import ProfileForm from '@/components/ProfileForm/ProfileForm'
import ProfileSidebar from '@/components/ProfileSidebar/ProfileSidebar'
import React, { useEffect, useState } from 'react'
import styles from '@/assets/css/profile/profile.module.css'
import CarryList from '@/components/ProfileCarryList/CarryList'
import SendList from '@/components/ProfileSendList/SendList'
import PasswordTab from '@/components/ProfilePasswordTab/PasswordTab'
import isAuth from '@/components/isAuth/isAuth'
import { useSearchParams, useRouter } from 'next/navigation'




function Profile() {

  const [activeTab, setActiveTab] = useState<string>("profile");
  const [profilePhoto, setProfilePhoto] = useState<string>("");

  const searchParams = useSearchParams();
  const router = useRouter();



  useEffect(() => {
    const tab = searchParams?.get('tab'); // Extract 'tab' from query string
    if (tab && typeof tab === 'string') {
      setActiveTab(tab);
    }
  }, [searchParams]);


  return (
    <div className={styles.profileContainer}>
      <ProfileSidebar
        profilePhoto={profilePhoto}
        activeTab={activeTab}
        onTabChange={(newTab) => {
          setActiveTab(newTab);
          router.push(`/profile?tab=${newTab}`); // Update the URL when tab changes
        }} />
      {activeTab === "profile" && <ProfileForm profilePhoto={profilePhoto} setProfilePhoto={setProfilePhoto} />}
      {activeTab === "password" && <PasswordTab />}
      {activeTab === "myAdsTrip" && <CarryList />}
      {activeTab === "myAdsSend" && <SendList />}
      {/* {JSON.stringify(activeTab)} */}
    </div>
  )
}


export default isAuth(Profile)