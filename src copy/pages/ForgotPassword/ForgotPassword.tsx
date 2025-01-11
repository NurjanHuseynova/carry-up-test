"use client";
import React, { useState } from "react";
import styles from "@/assets/css/login/login.module.css";
import carry_logo from "@/assets/img/Carry UP.svg";
import Image from "next/image";
import eye from "@/assets/img/eye.svg";
import eye_icon from "@/assets/img/eye_icon.svg";
import success_img from "@/assets/img/success_img.svg";

interface FormState {
  email: string;
  password: string;
  confirmPassword: string;
}

function ForgotPassword() {
  const [form, setForm] = useState<FormState>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((values) => ({ ...values, [name]: value }));
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isSubmitted) {
      setIsSubmitted(true);
    } else if (!isVerified) {
      setIsVerified(true);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const togglePasswordConfirmVisibility = () => {
    setShowPasswordConfirm((prev) => !prev);
  };

  return (
    <section className={styles.login_container}>
      <div className={styles.login_section}>
        <div className={styles.logo}>
          <Image src={carry_logo} alt="Carry Logo" />
        </div>
        {isVerified ? (
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
        ) : (
          <>
            <div className={styles.welcome_text}>
              <h2>{isSubmitted ? "Setup password" : "Forgot Password?"}</h2>
              <span>
                {isSubmitted
                  ? "Please setup your password"
                  : "Don’t worry, we will help you recover your account."}
              </span>
            </div>
            <div className={styles.form_container}>
              <form onSubmit={handleSubmit}>
                {!isSubmitted ? (
                  <div className={styles.input_group}>
                    <label htmlFor="email">Email address</label>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      placeholder="Email"
                      value={form.email}
                      onChange={handleChange}
                    />
                  </div>
                ) : (
                  <>
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
                            alt={
                              showPassword ? "Hide password" : "Show password"
                            }
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
                              showPasswordConfirm
                                ? "Hide password"
                                : "Show password"
                            }
                          />
                        </span>
                      </div>
                    </div>
                  </>
                )}
                {error && <p className={styles.error_message}>{error}</p>}
                <button type="submit" className={styles.login_button}>
                  Continue
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default ForgotPassword;
