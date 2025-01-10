"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import styles from "@/assets/css/login/login.module.css";
import carry_logo from "@/assets/img/Carry UP.svg";
import eye_icon from "@/assets/img/eye_icon.svg";
import eye from "@/assets/img/eye.svg";
import google_icon from "@/assets/img/google.svg";

import Image from "next/image";
import Link from "next/link";
import { postApi } from "@/services/api";
import toast from "react-hot-toast";

interface FormState {
  email: string;
  password: string;
  rememberMe: boolean;
}

function Login() {
  const [form, setForm] = useState<FormState>({
    email: "",
    password: "",
    rememberMe: false, // Default state for Remember Me
  });
  const [formErrors, setFormErrors] = useState<{ email: boolean; password: boolean }>({
    email: false,
    password: false,
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    setForm((values) => ({
      ...values,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name !== "rememberMe") {
      setFormErrors((errors) => ({ ...errors, [name]: false }));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const login = async () => {
    setLoading(true);
    try {
      const userData = {
        firstTab: form.email,
        password: form.password,
        rememberMe: form.rememberMe, // Sending Remember Me value
      };

      const response = await postApi("Manage/Login", userData);
      const responseData = response?.list?.[0];

      if (response?.errors && response.errors.length > 0) {
        response.errors.forEach((error: string) => {
          toast.error(error);
        });
        setLoading(false);
        return;
      }

      if (responseData) {
        const { accessToken, refreshToken, user } = responseData;

        if (accessToken && refreshToken && user) {
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
          localStorage.setItem("user", JSON.stringify(user));

          if (response?.success) {
            router.push("/");
          }
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = {
      email: form.email.trim() === "",
      password: form.password.trim() === "",
    };

    setFormErrors(errors);

    if (errors.email || errors.password) {
      toast.error("Please fill out all required fields.");
      return;
    }

    login();
  };

  return (
    <>
      {loading && (
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
            <h2>Welcome!</h2>
            <span>Please enter your profile information</span>
          </div>
          <div className={styles.form_container}>
            <form onSubmit={handleSubmit}>
              <div className={styles.input_group}>
                <label htmlFor="email_or_phone">Mobile number or email</label>
                <input
                  type="text"
                  id="email_or_phone"
                  placeholder="Enter your mobile or email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className={formErrors.email ? styles.error_border : ""}
                />
              </div>
              <div className={styles.input_group}>
                <label htmlFor="password">Password</label>
                <div className={styles.password_container}>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Enter your password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    className={formErrors.password ? styles.error_border : ""}
                  />
                  <span
                    className={styles.eye_icon}
                    onClick={togglePasswordVisibility}
                  >
                    <Image
                      src={showPassword ? eye : eye_icon}
                      alt={showPassword ? "Hide password" : "Show password"}
                    />
                  </span>
                </div>
              </div>
              <div className="flex justify-between">
              <div className="checkbox-wrapper">
  <input
    type="checkbox"
    id="rememberMe"
    className="checkbox"
    checked={form.rememberMe}
    onChange={(e) =>
      setForm((prev) => ({ ...prev, rememberMe: e.target.checked }))
    }
  />
  <div className="checkbox-icon">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
    >
      <path
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 12l5 5L20 7"
      />
    </svg>
  </div>
  <label htmlFor="rememberMe">Remember me</label>
</div>


  <div className={styles.forgot_password}>
    <Link href="/forgot-password">Forgot password?</Link>
  </div>
</div>
              <button type="submit" className={styles.login_button}>
                Log In
              </button>
              <div className={styles.or_container}>
                <span></span>
                <p>Or with</p>
                <span></span>
              </div>
              <button type="button" className={styles.google_button}>
                <Image src={google_icon} alt="Google Login" />
              </button>
            </form>
            <div className={styles.signup_link}>
              <p>
                Don’t have an account? <Link href="/signUp">Sign Up</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
