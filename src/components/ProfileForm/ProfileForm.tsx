'use client'
import React, { useEffect, useState } from 'react';
import styles from '@/assets/css/profile/profileForm.module.css';
import { mapGenderType } from '@/utils/enumsToData';
import { gender } from "@/json/constant";
import axios from 'axios';
import toast from 'react-hot-toast';

interface User {
    id: string;
    name: string;
    surname: string;
    email: string;
    phoneNumber: string;
    country: string;
    city: string;
    gender: number;
    whatsapp: string;
    instagram: string;
    url: string;
}

function ProfileForm() {
    const [user, setUser] = useState<User>({
        id: '',
        name: '',
        surname: '',
        email: '',
        phoneNumber: '',
        country: '',
        city: '',
        gender: 0,
        whatsapp: '',
        instagram: '',
        url: '',
    });

    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL


    const [formErrors, setFormErrors] = useState<{
        name: boolean;
        surname: boolean;
        email: boolean;
        phoneNumber: boolean,
        country: boolean,
        city: boolean,
        // gender: boolean;
        whatsapp: boolean,
        instagram: boolean,
        url: boolean,
    }>({
        name: false,
        surname: false,
        email: false,
        phoneNumber: false,
        country: false,
        city: false,
        // gender: false,
        whatsapp: false,
        instagram: false,
        url: false,
    });

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
        // storedUser.gender = mapGenderType(storedUser.gender);

        console.log('storedUser', storedUser);

        setUser({
            ...storedUser,
        });
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));

        if (name === 'gender') {
            setUser((prevData) => ({
                ...prevData,
                [name]: Number(value),
            }));
        }

        setFormErrors((prev) => ({ ...prev, [name]: !value.trim() }));
    };

    const handleCancel = () => {
        const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
        // storedUser.gender = mapGenderType(storedUser.gender);

        setUser({
            ...storedUser,
        });

        setFormErrors({
            name: false,
            surname: false,
            email: false,
            phoneNumber: false,
            country: false,
            city: false,
            // gender: false,
            whatsapp: false,
            instagram: false,
            url: false,
        });
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();

        const errors = {
            name: (user.name || "").trim() === "",
            surname: (user.surname || "").trim() === "",
            // gender: (user.gender || "").trim() === "",
            email: (user.email || "").trim() === "",
            phoneNumber: (user.phoneNumber || "").trim() === "",
            country: (user.country || "").trim() === "",
            city: (user.city || "").trim() === "",
            whatsapp: (user.whatsapp || "").trim() === "",
            instagram: (user.instagram || "").trim() === "",
            url: (user.url || "").trim() === "",
        };

        setFormErrors(errors);

        if (Object.values(errors).some((error) => error)) {
            return; // Prevent API request
        }


        console.log('Saved Data:', user);

        console.log(apiUrl);

        try {
            const accessToken = localStorage.getItem('accessToken');

            if (!accessToken) {
                throw new Error('Access token is missing. Please log in again.');
            }

            const userId = user.id;
            const response = await axios.put(`${apiUrl}/User/UserUpdate`, {
                id: userId,
                name: user.name,
                surname: user.surname,
                gender: user.gender,
                // birthDate: user.birthDate,

            }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`
                }
            });

            if (response?.data.errors && response?.data.errors.length > 0) {
                response?.data.errors.forEach((error: string) => {
                    toast.error(error);
                });
                return;
            }

            if (response?.data?.success) {
                toast.success("User updated successfully");
            }
            console.log('User updated successfully:', response.data);
        } catch (error) {
            console.error('Error updating password:', error);
            toast.error(error);
        }

        // Add your save logic here (e.g., send data to an API)
    };


    return (
        <div className={styles.mainContent}>
            <form onSubmit={handleSave}>
                <div className={`grid gap-3 md:grid-cols-3 ${styles.input_group}`}>
                    <div className={styles.input_group_item}>
                        <label>Name<span className={styles.reqField}> * </span></label>
                        <input
                            name="name"
                            placeholder='Name'
                            onChange={handleChange}
                            type="text"
                            value={user?.name || ''}
                            className={formErrors.name ? styles.error_border : ''}
                        />
                    </div>
                    <div className={styles.input_group_item}>
                        <label>Surname<span className={styles.reqField}> * </span></label>
                        <input
                            name="surname"
                            placeholder='Surname'
                            onChange={handleChange}
                            type="text"
                            value={user?.surname || ''}
                            className={formErrors.surname ? styles.error_border : ''}
                        />
                    </div>
                    <div className={styles.input_group_item}>
                        <label>Email<span className={styles.reqField}> * </span></label>
                        <input
                            name="email"
                            placeholder='Email'
                            onChange={handleChange}
                            type="email"
                            value={user?.email || ''}
                            className={formErrors.email ? styles.error_border : ''}
                        />
                    </div>
                </div>
                <div className={`grid gap-3 md:grid-cols-4 ${styles.input_group}`}>

                    <div className={styles.input_group_item}>
                        <label>Number<span className={styles.reqField}> * </span></label>
                        <input
                            name="phoneNumber"
                            placeholder='Phone'
                            onChange={handleChange}
                            type="text"
                            value={user?.phoneNumber || ''}
                            className={formErrors.phoneNumber ? styles.error_border : ''}
                        />
                    </div>

                    <div className={styles.input_group_item}>
                        <label htmlFor="gender" className="">
                            Gender<span className={styles.reqField}> * </span>
                        </label>
                        <select
                            name="gender"
                            value={user?.gender}
                            onChange={handleChange}
                        >
                            <option value="" disabled>
                                Gender
                            </option>

                            <option value={user?.gender}>{mapGenderType(user?.gender)}</option>


                            {Object.entries(gender).map(([key, value]) => {
                                return value != user?.gender ?
                                    <option key={value} value={value}>
                                        {key}
                                    </option> : null
                            }
                            )}
                        </select>
                    </div>
                    <div className={styles.input_group_item}>
                        <label>Location<span className={styles.reqField}> * </span></label>
                        <input
                            name="country"
                            placeholder='Country'
                            onChange={handleChange}
                            type="text"
                            value={user?.country || ''}
                            className={formErrors.country ? styles.error_border : ''}
                        />
                    </div>
                    <div className={styles.input_group_item}>
                        <label>City<span className={styles.reqField}> * </span></label>
                        <input
                            name="city"
                            placeholder='City'
                            onChange={handleChange}
                            type="text" value={user?.city || ''}
                            className={formErrors.city ? styles.error_border : ''}
                        />
                    </div>
                </div>

                <div className={`grid gap-3 md:grid-cols-3 ${styles.row}`}>
                    <div className={styles.input_group_item}>
                        <label>WhatsApp<span className={styles.reqField}> * </span></label>
                        <input
                            name="whatsapp"
                            placeholder='Whatsapp'
                            onChange={handleChange}
                            type="text"
                            value={user?.whatsapp || ''}
                            className={formErrors.whatsapp ? styles.error_border : ''}

                        />
                    </div>
                    <div className={styles.input_group_item}>
                        <label>Instagram<span className={styles.reqField}> * </span></label>
                        <input
                            name="instagram"
                            placeholder='Instagram'
                            onChange={handleChange}
                            type="text"
                            value={user?.instagram || ''}
                            className={formErrors.instagram ? styles.error_border : ''}

                        />
                    </div>
                    <div className={styles.input_group_item}>
                        <label>Url<span className={styles.reqField}> * </span></label>
                        <input
                            name="url"
                            placeholder='Url'
                            onChange={handleChange}
                            type="url"
                            value={user?.url || ''}
                            className={formErrors.url ? styles.error_border : ''}
                        />
                    </div>

                </div>
                <div className={styles.buttonGroup}>
                    <button onClick={handleCancel} type="button" className={styles.cancelBtn}>Cancel</button>
                    <button type="submit" className={styles.saveBtn}>Save</button>
                </div>
            </form>
        </div>
    );
}

export default ProfileForm;
