import SendSidebar from '@/components/SendSidebar/SendSidebar'
import Link from 'next/link'
import React from 'react'
import styles from "@/assets/css/main/main.module.css"

function MainPage() {
  return (
    <section className={`custom_container grid grid-cols-3 ${styles.main_container}`}>
    <article className={`col-span-1 ${styles.left_section}`}>
      <div>
      <Link href ="" className={`${styles.tab_button} ${styles.active_tab_button}`} >
        For Send
        </Link>
        <Link href ="" className={`${styles.tab_button} `}>
        For Carry
        </Link>
      </div>

      <SendSidebar />

      <div>
        <button className={`${styles.clear_button} `}>Clear all</button>
        <button className={`${styles.search_button} `}>Search</button>

      </div>
    </article>
    <article className={`col-span-2 ${styles.right_section}`}>
        right
    </article>


      
    </section>
  )
}

export default MainPage
