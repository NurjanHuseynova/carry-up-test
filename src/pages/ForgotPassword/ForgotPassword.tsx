'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import styles from "@/assets/css/login/login.module.css";
import carry_logo from "@/assets/img/Carry UP.svg";


import Image from 'next/image';
import Link from 'next/link';
import { postApi } from '@/services/api';
import toast from 'react-hot-toast';

interface FormState {
  email: string;
}

function ForgotPassword() {
  const [form, setForm] = useState<FormState>({ email: ''});


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((values) => ({ ...values, [name]: value }));
  };

//   const login = async () => {
//     try {
//       const userData = {
//         firstTab: form.email,
//         password: form.password,
//         rememberMe: true,
//       };

//       const response = await postApi('Manage/Login', userData);
//       const responseData = response?.list?.[0];

//       if (response?.errors && response.errors.length > 0) {
//         response.errors.forEach((error: string) => {
//           toast.error(error);
//         });
//         return;
//       }

//       if (responseData) {
//         const { accessToken, refreshToken, user } = responseData;

//         if (accessToken && refreshToken && user) {
//           localStorage.setItem('accessToken', accessToken);
//           localStorage.setItem('refreshToken', refreshToken);
//           localStorage.setItem('user', JSON.stringify(user));

//           if (response?.success) {
//             router.push('/');
//           } else {
//             console.error('Login unsuccessful');
//           }
//         } else {
//           console.error('Error: Missing tokens or user information');
//         }
//       } else {
//         console.error('Error: Invalid response format');
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//     }
//   };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // login();
  };

  return (
    <section className={styles.login_container}>
      <div className={styles.login_section}>
        <div className={styles.logo}>
          <Image src={carry_logo} alt="Carry Logo" />
        </div>
        <div className={styles.welcome_text}>
          <h2>Forgot Password ?</h2>
          <span>Dont’ worry we will help you to recover your account</span>
        </div>
        <div className={styles.form_container}>
          <form onSubmit={handleSubmit}>
            <div className={styles.input_group}>
              <label htmlFor="email">Email address</label>
              <input
                type="text"
                id="email"
                placeholder="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
              />
            </div>
      
          
            <button type="submit" className={styles.login_button}>
            Contunie
            </button>
           
          
          </form>
     
        </div>
      </div>
    </section>
  );
}

export default ForgotPassword;
