"use client";
import Navbar from "@/components/Navbar/Navbar";
import React, { useState } from "react";
import styles from "@/assets/css/postanadd/postanadd.module.css";
import SendCreate from "./SendCreate";
import CarryCreate from "./CarryCreate";
import { useTranslations } from "next-intl";

function PostAnAdd() {
  const [activeTab, setActiveTab] = useState("send");

  const t = useTranslations("Static")

  return (
    <section>
      <div className="custom_container">
      <section className={` ${styles.create_container}`}>
        <h3>
          {t("Reason for publication")}<span>*</span>
        </h3>
        <div className="flex gap-3 md:gap-4 items-center mt-4">
          <button
            className={`${styles.createTab} ${
              activeTab === "send" ? styles.activeTab : ""
            }`}
            onClick={() => setActiveTab("send")}
          >
            {t("for send")} 
          </button>
          <button
            className={`${styles.createTab} ${
              activeTab === "carry" ? styles.activeTab : ""
            }`}
            onClick={() => setActiveTab("carry")}
          >
             {t("for carry")}
          </button>
        </div>
        {activeTab === "send" && <SendCreate />}
        {activeTab === "carry" && <CarryCreate />}
      </section>
      </div>
    
    </section>
  );
}

export default PostAnAdd;
