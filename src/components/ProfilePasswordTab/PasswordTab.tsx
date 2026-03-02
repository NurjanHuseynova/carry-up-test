import React, { useState } from "react";
import styles from "@/assets/css/profile/profilePasswordTab.module.css";
import Image from "next/image";
import eye_icon from "@/assets/img/eye_icon.svg";
import eye from "@/assets/img/eye.svg";
import axios from "axios";
import toast from "react-hot-toast";
import { putApi } from "@/services/api";
import { useTranslations } from "next-intl";

function PasswordTab() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [validationChecks, setValidationChecks] = useState({
    minLength: false,
    hasNumber: false,
    hasUppercase: false,
    hasLowercase: false,
    hasSpecialChar: false,
  });

  // const [errors, setErrors] = useState({
  //     currentPassword: '',
  //     newPassword: '',
  //     confirmPassword: '',
  // });
  const t = useTranslations("Static");

  const togglePasswordVisibility = (field: string) => {
    setShowPassword((prevState: any) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name == "newPassword") {
      setValidationChecks({
        minLength: value.length >= 8,
        hasNumber: /\d/.test(value),
        hasUppercase: /[A-Z]/.test(value),
        hasLowercase: /[a-z]/.test(value),
        hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value),
      });
    }
    if (name == "confirmPassword") {
      setValidationChecks({
        minLength: value.length >= 8,
        hasNumber: /\d/.test(value),
        hasUppercase: /[A-Z]/.test(value),
        hasLowercase: /[a-z]/.test(value),
        hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value),
      });
    }

    // setErrors((prevState) => ({
    //     ...prevState,
    //     [name]: '',
    // }));
  };

  const handleCancel = () => {
    // Reset the passwords state to its initial values
    setPasswords({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setValidationChecks({
      minLength: false,
      hasNumber: false,
      hasUppercase: false,
      hasLowercase: false,
      hasSpecialChar: false,
    });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = passwords;
    let isValid = true;

    // const newErrors = { currentPassword: '', newPassword: '', confirmPassword: '' };

    // Validate current password
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error(t("allFieldsRequired"));
      // newErrors.currentPassword = 'Current password is required.';
      isValid = false;
      return;
    }

    const { minLength, hasNumber, hasUppercase, hasLowercase, hasSpecialChar } =
      validationChecks;

    if (!minLength) {
      isValid = false;
      toast.error(t("passwordMinLength"));
    }
    if (!hasNumber) {
      isValid = false;
      toast.error(t("passwordMustContainNumber"));
    }
    if (!hasUppercase) {
      isValid = false;
      toast.error(t("passwordMustContainUppercase"));
    }
    if (!hasLowercase) {
      isValid = false;
      toast.error(t("passwordMustContainLowercase"));
    }
    if (!hasSpecialChar) {
      isValid = false;
      toast.error(t("passwordMustContainSpecialChar"));
    }

    // Validate confirm password
    if (newPassword !== confirmPassword) {
      toast.error(t("passwordsDoNotMatch"));
      isValid = false;
    }

    if (isValid) {
      // Proceed with form submission logic (e.g., API call)
      setIsSubmitted(true);

      try {
        const accessToken = localStorage.getItem("accessToken");
        const user = JSON.parse(localStorage.getItem("user") || "{}");

        if (!accessToken) {
          throw new Error("Access token is missing. Please log in again.");
        }

        const userId = user.id;
        const responseData = await putApi(
          `User/PasswordUpdate`,
          {
            userId: userId,
            oldPassword: currentPassword,
            password: newPassword,
          },
          accessToken,
        );

        setIsSubmitted(true);

        if (responseData?.errors && responseData?.errors.length > 0) {
          responseData?.errors.forEach((error: string) => {
            toast.error(error);
          });
          return;
        }

        if (responseData?.success) {
          setPasswords({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
          toast.success(t("passwordUpdatedSuccessfully"));
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          toast.error(error.message);
          console.error("Error updating password:", error.message);
        } else {
          toast.error(t("unknownError"));
          console.error("Error updating password: An unknown error occurred.");
        }
      }
    }
  };

  return (
    <div className={styles.mainContent}>
      <form onSubmit={handleSubmit}>
        <div className={`grid gap-3 md:grid-cols-3 ${styles.input_group}`}>
          {/* Current Password Field */}
          <div className={styles.input_group_item}>
            <label>{t("password")}</label>
            <div className={styles.passwordWrapper}>
              <input
                name="currentPassword"
                placeholder={t("enter")}
                value={passwords.currentPassword}
                onChange={handleInputChange}
                type={showPassword.currentPassword ? "text" : "password"}
              />
              <span
                className={styles.eye_icon}
                onClick={() => togglePasswordVisibility("currentPassword")}
              >
                <Image
                  src={showPassword.currentPassword ? eye : eye_icon}
                  alt={showPassword.currentPassword ? "hide" : "show"}
                />
              </span>
            </div>
          </div>

          {/* New Password Field */}
          <div className={styles.input_group_item}>
            <label>{t("newPassword")}</label>
            <div className={styles.passwordWrapper}>
              <input
                type={showPassword.newPassword ? "text" : "password"}
                name="newPassword"
                placeholder={t("enter")}
                value={passwords.newPassword}
                onChange={handleInputChange}
              />
              <span
                className={styles.eye_icon}
                onClick={() => togglePasswordVisibility("newPassword")}
              >
                <Image
                  src={showPassword.newPassword ? eye : eye_icon}
                  alt={showPassword.newPassword ? "hide" : "show"}
                />
              </span>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className={styles.input_group_item}>
            <label>{t("confirmPassword")}</label>
            <div className={styles.passwordWrapper}>
              <input
                name="confirmPassword"
                value={passwords.confirmPassword}
                onChange={handleInputChange}
                type={showPassword.confirmPassword ? "text" : "password"}
                placeholder={t("enter")}
              />
              <span
                className={styles.eye_icon}
                onClick={() => togglePasswordVisibility("confirmPassword")}
              >
                <Image
                  src={showPassword.confirmPassword ? eye : eye_icon}
                  alt={showPassword.confirmPassword ? "hide" : "show"}
                />
              </span>
            </div>
          </div>
        </div>

        <div className={styles.buttonGroup}>
          <button
            onClick={handleCancel}
            type="button"
            className={styles.cancelBtn}
          >
            {t("Cancel")}
          </button>
          <button type="submit" className={styles.saveBtn}>
            {t("save")}
          </button>
        </div>
      </form>
    </div>
  );
}

export default PasswordTab;
