"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/assets/css/login/login.module.css";
import carry_logo from "@/assets/img/Carry UP.svg";
import Image from "next/image";
import { postApi } from "@/services/api";
import modalStyles from "@/assets/css/succesmodal/successmodal.module.css";
import { useTranslations } from "next-intl";

interface FormState {
  email: string;
}

function ForgotPassword() {
  const [form, setForm] = useState<FormState>({
    email: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((values) => ({ ...values, [name]: value }));
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    forgotPasswordEmail();
  };

  const forgotPasswordEmail = async () => {
    try {
      setIsLoading(true);
      const userData = {
        email: form.email,
      };

      const response = await postApi("Manage/ForgotPasswordEmail", userData);

      if (response.success) {
        setIsModalOpen(true);
      } else {
        setError(response.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    router.push("/"); 
  };

   const t = useTranslations("Static")

  return (
 <div>
     {isLoading && (
      <div className={styles.loading_overlay}>
        <div className="loader"></div>
      </div>
    )}
    <section className={styles.login_container}>
      <div className={styles.login_section}>
        <div className={styles.logo}>
          <Image src={carry_logo} alt="Carry Logo" />
        </div>

        <div className={styles.welcome_text}>
          <h2>{t("Forgot Password")}</h2>
          <span>{t("Don’t worry, we will help you recover your account")}</span>
        </div>

        <div className={styles.form_container}>
          <form onSubmit={handleSubmit}>
            <div className={styles.input_group}>
              <label htmlFor="email">{t("email address")}</label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            {error && <p className={styles.error_message}>{error}</p>}
            <button type="submit" className={styles.login_button} disabled={isLoading}>
              {isLoading ? `${t("Loading")}...` : `${t("Continue")}`}
            </button>
          </form>
        </div>
      </div>

      {isModalOpen && (
        <div className={modalStyles.overlay}>
          <div className={modalStyles.modalContent}>
            {isLoading ? (
              <div className={modalStyles.spinner}></div>
            ) : (
              <>
                <h2>{t("Success")!}</h2>
                <p>{t("A password reset link has been sent to your email")}</p>
                <button onClick={handleCloseModal} className={modalStyles.closeButton}>
                 {t("ok")} 
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </section>
 </div>
  );
}

export default ForgotPassword;