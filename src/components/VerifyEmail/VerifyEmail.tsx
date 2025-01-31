"use client";
import React, { useState } from "react";
import styles from "@/assets/css/login/login.module.css";
import carry_logo from "@/assets/img/Carry UP.svg";
import Image from "next/image";
import success_img from "@/assets/img/success_img.svg";

interface FormState {
  email: string;
}

function VerifyEmail() {
  const [form, setForm] = useState<FormState>({
    email: "",

  });




  return (
    <section className={styles.login_container}>
      <div className={styles.login_section}>
        <div className={styles.logo}>
          <Image src={carry_logo} alt="Carry Logo" />
        </div>
      
          <section className={styles.success_section}>
            <Image src={success_img} alt="Success Image" />
            <div>
              <h2>Verify your email address</h2>
              <p>
                You have entered <b>{form.email}</b> as the email address for
                your account.
              </p>
            </div>
            <button className={styles.verify_button}>Verify your email</button>
          </section>
  
      </div>
    </section>
  );
}

export default VerifyEmail;
