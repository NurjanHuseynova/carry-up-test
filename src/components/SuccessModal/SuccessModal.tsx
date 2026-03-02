"use client";

import React from "react";
import styles from "@/assets/css/succesmodal/successmodal.module.css";
import Link from "next/link";
import Image from "next/image";
import success_img from "@/assets/img/success_img.svg";
import { useTranslations } from "next-intl";

interface ModalProps {
  isOpen: boolean;
}

const SuccessModal: React.FC<ModalProps> = ({ isOpen }) => {
  const t = useTranslations("Static");

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <Image src={success_img} alt={t("successImage")} />
        <h2>{t("registrationSuccessful")}</h2>
        <p>{t("Confirm your email address")}</p>
        <Link href={"/login"} className={styles.closeButton}>
          {t("ok")}!
        </Link>
      </div>
    </div>
  );
};

export default SuccessModal;