"use client";
import React, { useState } from "react";
import SendSidebar from "@/components/SendSidebar/SendSidebar";
import Link from "next/link";
import styles from "@/assets/css/main/main.module.css";
import CarrySidebar from "@/components/CarrySidebar/CarrySidebar";

function MainPage() {
  const [activeTab, setActiveTab] = useState("send");

  return (
    <section className={`custom_container flex ${styles.main_container}`}>
      <article className={`col-span-1 distanceScroll ${styles.left_section} w-1/4`}>
        <div className={styles.top_button}>
          <button
            className={`${styles.tab_button} ${
              activeTab === "send" ? styles.active_tab_button : ""
            }`}
            onClick={() => setActiveTab("send")}
          >
            For Send
          </button>
          <button
            className={`${styles.tab_button} ${
              activeTab === "carry" ? ` ${styles.carry_tab_button}` : ""
            }`}
            onClick={() => setActiveTab("carry")}
          >
            For Carry
          </button>
        </div>

        {activeTab === "send" && <SendSidebar />}
        {activeTab === "carry" && <CarrySidebar />}

       
      </article>
      <article className={`col-span-2 ${styles.right_section}`}>right</article>
    </section>
  );
}

export default MainPage;
