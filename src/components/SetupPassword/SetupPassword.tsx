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
    

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
    setIsLoading(true);

      const bodyData = { password: form.password };
      const res = await axios.put(
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
        
        toast.error("Failed to set up password.");
        
      }
    } catch (err) {
      console.error("Error setting up password:", err);
      setIsLoading(false);
      toast.error("An error occurred while setting up your password. Please try again.");
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
      setError("Invalid or missing token.");
    }
  }, [token]);

  if (!token) {
    return (
      <section className={styles.login_container}>
        <div className={styles.login_section}>
          <div className={styles.logo}>
            <Image src={carry_logo} alt="Carry Logo" />
          </div>
          <div className={styles.error_message}>Invalid or missing token.</div>
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
        {isSubmitted ? (
          <div className={styles.success_message}>
            <h2>Password Setup Successful</h2>
            <p>You can now log in with your new password.</p>
          </div>
        ) : (
          <>
            <div className={styles.welcome_text}>
              <h2>Setup Password</h2>
              <span>Please set up your password.</span>
            </div>
            <div className={styles.form_container}>
              <form onSubmit={handleSubmit}>
                <div className={styles.input_group}>
                  <label htmlFor="password">New Password</label>
                  <div className={styles.password_container}>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      placeholder="Enter your password"
                      value={form.password}
                      onChange={handleChange}
                    />
                    <span
                      className={styles.eye_icon}
                      onClick={togglePasswordVisibility}
                      aria-label="Toggle password visibility"
                      role="button"
                    >
                      <Image
                        src={showPassword ? eye : eye_icon}
                        alt={showPassword ? "Hide password" : "Show password"}
                      />
                    </span>
                  </div>
                </div>
                <div className={styles.input_group}>
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <div className={styles.password_container}>
                    <input
                      type={showPasswordConfirm ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Confirm your password"
                      value={form.confirmPassword}
                      onChange={handleChange}
                    />
                    <span
                      className={styles.eye_icon}
                      onClick={togglePasswordConfirmVisibility}
                      aria-label="Toggle confirm password visibility"
                      role="button"
                    >
                      <Image
                        src={showPasswordConfirm ? eye : eye_icon}
                        alt={
                          showPasswordConfirm ? "Hide password" : "Show password"
                        }
                      />
                    </span>
                  </div>
                </div>
                {/* {error && <p className={styles.error_message}>{error}</p>} */}
                <button type="submit" className={styles.login_button}>
                  Continue
                </button>
              </form>
            </div>
          </>
        )}
      </div>
      {isModalOpen && (
        <div className={modalStyles.overlay}>
          <div className={modalStyles.modalContent}>
            {isLoading ? (
              <div className={modalStyles.spinner}></div>
            ) : (
              <>
                <h2>{"Success!"}</h2>
                <p>{"A password reset link has been sent to your email."}</p>
                <button onClick={handleCloseModal} className={modalStyles.closeButton}>
                  Ok
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
