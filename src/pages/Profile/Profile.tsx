import Navbar from '@/components/Navbar/Navbar'
import ProfileForm from '@/components/ProfileForm/ProfileForm'
import ProfileSidebar from '@/components/ProfileSidebar/ProfileSidebar'
import React from 'react'
import styles from '@/assets/css/profile/profile.module.css'



function Profile() {


  return (

      <div className={styles.profileContainer}>
        <ProfileSidebar />
        <ProfileForm />
      </div>
    
  )
}

export default Profile