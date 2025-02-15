import React, { useState } from 'react';
import styles from '@/assets/css/profile/profilePasswordTab.module.css'
import Image from 'next/image';
import eye_icon from "@/assets/img/eye_icon.svg";
import eye from "@/assets/img/eye.svg";
import axios from 'axios';
import toast from 'react-hot-toast';
import { putApi } from '@/services/api';


function PasswordTab() {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [showPassword, setShowPassword] = useState({
        currentPassword: false,
        newPassword: false,
        confirmPassword: false,
    });

    const [passwords, setPasswords] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
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

        if (name == 'newPassword') {
            setValidationChecks({
                minLength: value.length >= 8,
                hasNumber: /\d/.test(value),
                hasUppercase: /[A-Z]/.test(value),
                hasLowercase: /[a-z]/.test(value),
                hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value),
            });
        }
        if (name == 'confirmPassword') {
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
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        });
        setValidationChecks({
            minLength: false,
            hasNumber: false,
            hasUppercase: false,
            hasLowercase: false,
            hasSpecialChar: false,
        })
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { currentPassword, newPassword, confirmPassword } = passwords;
        let isValid = true;

        // const newErrors = { currentPassword: '', newPassword: '', confirmPassword: '' };


        // Validate current password
        if (!currentPassword || !newPassword || !confirmPassword) {
            toast.error('All the fields  are required!');
            // newErrors.currentPassword = 'Current password is required.';
            isValid = false;
            return;
        }

        const { minLength, hasNumber, hasUppercase, hasLowercase, hasSpecialChar } = validationChecks;

        if (!minLength) {
            isValid = false;
            toast.error('Password must be at least 8 characters long.')
        }
        if (!hasNumber) {
            isValid = false;
            toast.error('Password must contain at least one digit.')
        }
        if (!hasUppercase) {
            isValid = false;
            toast.error('Password must contain at least one uppercase letter.')
        }
        if (!hasLowercase) {
            isValid = false;
            toast.error('Password must contain at least one lowercase letter.')
        }
        if (!hasSpecialChar) {
            isValid = false;
            toast.error('Password must contain at least one special character.')
        }

        // Validate confirm password
        if (newPassword !== confirmPassword) {
            toast.error('Passwords do not match!')
            isValid = false;
        }


        if (isValid) {

            // Proceed with form submission logic (e.g., API call)
            setIsSubmitted(true);

            try {
                const accessToken = localStorage.getItem('accessToken');
                const user = JSON.parse(localStorage.getItem('user') || '{}');

                if (!accessToken) {
                    throw new Error('Access token is missing. Please log in again.');
                }

                const userId = user.id;
                const responseData = await putApi(`User/PasswordUpdate`, {
                    userId: userId,
                    oldPassword: currentPassword,
                    password: newPassword
                }, accessToken);



                setIsSubmitted(true);

                if (responseData?.errors && responseData?.errors.length > 0) {
                    responseData?.errors.forEach((error: string) => {
                        toast.error(error);
                    });
                    return;
                }

                if (responseData?.success) {
                    setPasswords({
                        currentPassword: '',
                        newPassword: '',
                        confirmPassword: '',
                    });
                    toast.success("Password updated successfully");
                }
            } catch (error) {
                toast.error(error);
                console.error('Error updating password:', error);
            }

        }
    };


    return (
        <div className={styles.mainContent}>
            <form onSubmit={handleSubmit}>
                <div className={`grid gap-3 md:grid-cols-3 ${styles.input_group}`}>
                    {/* Current Password Field */}
                    <div className={styles.input_group_item}>
                        <label>Password</label>
                        <div className={styles.passwordWrapper}>
                            <input
                                name="currentPassword"
                                placeholder="Enter"
                                value={passwords.currentPassword}
                                onChange={handleInputChange}
                                type={showPassword.currentPassword ? 'text' : 'password'}
                            />
                            <span
                                className={styles.eye_icon}
                                onClick={() => togglePasswordVisibility('currentPassword')}
                            >
                                <Image
                                    src={showPassword.currentPassword ? eye : eye_icon}
                                    alt={showPassword.currentPassword ? 'hide' : 'show'}
                                />
                            </span>
                        </div>
                    </div>

                    {/* New Password Field */}
                    <div className={styles.input_group_item}>
                        <label>New Password</label>
                        <div className={styles.passwordWrapper}>
                            <input
                                type={showPassword.newPassword ? 'text' : 'password'}
                                name="newPassword"
                                placeholder="Enter"
                                value={passwords.newPassword}
                                onChange={handleInputChange}
                            />
                            <span
                                className={styles.eye_icon}
                                onClick={() => togglePasswordVisibility('newPassword')}
                            >
                                <Image
                                    src={showPassword.newPassword ? eye : eye_icon}
                                    alt={showPassword.newPassword ? 'hide' : 'show'}
                                />
                            </span>
                        </div>

                    </div>

                    {/* Confirm Password Field */}
                    <div className={styles.input_group_item}>
                        <label>Confirm Password</label>
                        <div className={styles.passwordWrapper}>
                            <input
                                name="confirmPassword"
                                value={passwords.confirmPassword}
                                onChange={handleInputChange}
                                type={showPassword.confirmPassword ? 'text' : 'password'}
                                placeholder="Enter"
                            />
                            <span
                                className={styles.eye_icon}
                                onClick={() => togglePasswordVisibility('confirmPassword')}
                            >
                                <Image
                                    src={showPassword.confirmPassword ? eye : eye_icon}
                                    alt={showPassword.confirmPassword ? 'hide' : 'show'}
                                />
                            </span>
                        </div>
                    </div>
                </div>

                <div className={styles.buttonGroup}>
                    <button onClick={handleCancel} type="button" className={styles.cancelBtn}>
                        Cancel
                    </button>
                    <button type="submit" className={styles.saveBtn}>
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
}

export default PasswordTab;
