"use client";

import React, { useEffect, useState } from "react";
import styles from "@/assets/css/login/login.module.css";
import carry_logo from "@/assets/img/Carry UP.svg";
import Image from "next/image";
import eye from "@/assets/img/eye.svg";
import eye_icon from "@/assets/img/eye_icon.svg";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import modalStyles from "@/assets/css/succesmodal/successmodal.module.css";
import { useTranslations } from "next-intl";


interface FormState {
  password: string;
  confirmPassword: string;
}

function SetupPassword() {
  const params = useParams();
  const token = params?.token;

  const [form, setForm] = useState<FormState>({
    
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

      const router = useRouter();
    
const t = useTranslations("Static");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
     toast.error(t("passwordsDoNotMatch"));

      return;
    }

    try {
    setIsLoading(true);

      const bodyData = { password: form.password };
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/Manage/ForgotPassword`,
        bodyData,
        {
          headers: {
            "Content-Type": "application/json",
            token: `${token}`,
          },
        }
      );

      if (res.status ) {
        setIsSubmitted(true);
        setIsModalOpen(true);

      } else {
        
       toast.error(t("failedSetupPassword"));
        setIsLoading(false);
      }
      setIsLoading(false);

    } catch (err) {
      console.error("Error setting up password:", err);
      setIsLoading(false);
     toast.error(t("setupPasswordError"));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const togglePasswordConfirmVisibility = () => {
    setShowPasswordConfirm((prev) => !prev);
  };

  useEffect(() => {
    if (!token) {
     setError(t("invalidToken"));
    }
  }, [token]);

  if (!token) {
    return (
      <section className={styles.login_container}>
        <div className={styles.login_section}>
          <div className={styles.logo}>
            <Image src={carry_logo} alt="Carry Logo" />
          </div>
          <div className={styles.error_message}> {t("invalidToken")}</div>
        </div>
      </section>
    );
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
    router.push("/login"); 
  };

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
                <h2>{t("setupPasswordTitle")}</h2>
                <span>{t("setupPasswordSubtitle")}</span>
            </div>
            <div className={styles.form_container}>
              <form onSubmit={handleSubmit}>
                <div className={styles.input_group}>
                <label htmlFor="password">{t("newPassword")}</label>
                  <div className={styles.password_container}>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                       placeholder={t("enterPassword")}
                      value={form.password}
                      onChange={handleChange}
                    />
                <span
  className={styles.eye_icon}
  onClick={togglePasswordVisibility}
  aria-label={t("togglePasswordVisibility")}
  role="button"
>
  <Image
    src={showPassword ? eye : eye_icon}
    alt={showPassword ? t("hidePassword") : t("showPassword")}
  />
</span>
                  </div>
                </div>
                <div className={styles.input_group}>
                 <label htmlFor="confirmPassword">
  {t("confirmPassword")}
</label>
                  <div className={styles.password_container}>
                    <input
                      type={showPasswordConfirm ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                       placeholder={t("confirmYourPassword")}
                      value={form.confirmPassword}
                      onChange={handleChange}
                    />
                 <span
  className={styles.eye_icon}
  onClick={togglePasswordConfirmVisibility}
  aria-label={t("togglePasswordVisibility")}
  role="button"
>
  <Image
    src={showPasswordConfirm ? eye : eye_icon}
    alt={
      showPasswordConfirm
        ? t("hidePassword")
        : t("showPassword")
    }
  />
</span>
                  </div>
                </div>
                {/* {error && <p className={styles.error_message}>{error}</p>} */}
                <button type="submit" className={styles.login_button}>
                   {t("Continue")}
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
              <h2>{t("Success")}!</h2>
               <p>{t("passwordSetupSuccess")}</p>
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

export default SetupPassword;
