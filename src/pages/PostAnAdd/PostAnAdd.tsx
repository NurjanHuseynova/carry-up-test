"use client";
import Navbar from "@/components/Navbar/Navbar";
import React, { useState } from "react";
import styles from "@/assets/css/postanadd/postanadd.module.css";
import SendCreate from "./SendCreate";
import CarryCreate from "./CarryCreate";

function PostAnAdd() {
  const [activeTab, setActiveTab] = useState("send");

  return (
    <section>
      <Navbar />
      <div className="custom_container">
      <section className={` ${styles.create_container}`}>
        <h3>
          Reason for publication<span>*</span>
        </h3>
        <div className="flex gap-3 md:gap-4 items-center mt-4">
          <button
            className={`${styles.createTab} ${
              activeTab === "send" ? styles.activeTab : ""
            }`}
            onClick={() => setActiveTab("send")}
          >
            For Send
          </button>
          <button
            className={`${styles.createTab} ${
              activeTab === "carry" ? styles.activeTab : ""
            }`}
            onClick={() => setActiveTab("carry")}
          >
            For Carry
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
