"use client";
import React, { useState } from "react";
import styles from "@/assets/css/login/login.module.css";
import carry_logo from "@/assets/img/Carry UP.svg";
import Image from "next/image";
import success_img from "@/assets/img/success_img.svg";
import { useTranslations } from "next-intl";

interface FormState {
  email: string;
}

function VerifyEmail() {
  const t = useTranslations("Static");

  const [form, setForm] = useState<FormState>({
    email: "",
  });

  return (
    <section className={styles.login_container}>
      <div className={styles.login_section}>
        <div className={styles.logo}>
          <Image src={carry_logo} alt={t("carryLogo")} />
        </div>

        <section className={styles.success_section}>
          <Image src={success_img} alt={t("successImage")} />
          <div>
            <h2>{t("verifyEmailTitle")}</h2>
            <p>
              {t("verifyEmailTextStart")}{" "}
              <b>{form.email}</b>{" "}
              {t("verifyEmailTextEnd")}
            </p>
          </div>
          <button className={styles.verify_button}>
            {t("verifyEmailButton")}
          </button>
        </section>
      </div>
    </section>
  );
}

export default VerifyEmail;