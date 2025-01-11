import SendSidebar from '@/components/SendSidebar/SendSidebar'
import Link from 'next/link'
import React from 'react'

function MainPage() {
  return (
    <section className={`custom_container `}>
    <article>
      <div>
      <Link href ="" >
        For Send
        </Link>
        <Link href ="" >
        For Carry
        </Link>
      </div>

      <SendSidebar />

      <div>
        <button>Clear all</button>
        <button>Search</button>

      </div>
    </article>
    <article>
        right
    </article>


      
    </section>
  )
}

export default MainPage
