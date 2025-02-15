import Navbar from '@/components/Navbar/Navbar'
import Profile from '@/pages/Profile/Profile'
import React from 'react'

function Page() {
  return (
    <div>
      <Navbar />
      <div className='custom_container'>
        <Profile />
      </div>
    </div>
  )
}

export default Page