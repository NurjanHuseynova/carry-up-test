"use client";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import styles from "@/assets/css/login/login.module.css";
import carry_logo from "@/assets/img/Carry UP.svg";
import Image from "next/image";
import success_img from "@/assets/img/success_img.svg";
import axios from "axios";

function ConfirmAccount() {
  const params = useParams();
  const token = params?.token;

  useEffect(() => {
    if (token) {
      const verifyEmail = async () => {
        try {
          const bodyData = { token };

          const res = await axios.put(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/Manage/ConfirmEmail`,
            bodyData,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (res.status !== 200) {
            throw new Error("Email verification failed");
          }

          console.log(res.data);
        } catch (error) {
          console.error("Error during verification:", error);
        }
      };

      verifyEmail();
    }
  }, [token]);

  if (!token) {
    return;
  }

  return (
    <section className={styles.login_container}>
      <div className={styles.login_section}>
        <div className={styles.logo}>
          <Image src={carry_logo} alt="Carry Logo" />
        </div>
        <section className={styles.success_section}>
          <Image src={success_img} alt="Success Image" />
          <div>
            <h2>Confirm your email address</h2>
            <p>You have entered as the email address for your account.</p>
          </div>
          {/* <button className={styles.verify_button}>Verify your email</button> */}
        </section>
      </div>
    </section>
  );
}

export default ConfirmAccount;
