import Login from '@/pages/Login/Login'
import React from 'react'
import styles from "@/assets/css/login/login.module.css"


function Page() {
  return (
    <section className={styles.login_container}>
      <Login />
    </section>
  )
}

export default Page