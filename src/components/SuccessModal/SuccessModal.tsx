import React from "react";
import styles from "@/assets/css/succesmodal/successmodal.module.css"
import Link from "next/link";
import Image from "next/image";
import success_img from "@/assets/img/success_img.svg"

interface ModalProps {
  isOpen: boolean;
}

const SuccessModal: React.FC<ModalProps> = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} >
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <Image src={success_img} alt="succes_img" />
        <h2>Registration Successful</h2>
        <p>Confirm your email</p>
        <Link href={"/login"} className={styles.closeButton} >
          Ok!
        </Link>
      </div>
    </div>
  );
};

export default SuccessModal;
