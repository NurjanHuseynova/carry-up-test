'use client'
import React, { useEffect, useState } from 'react';
import styles from '@/assets/css/profile/profileForm.module.css';

interface User {
    name: string;
    surname: string;
    email: string;
    phoneNumber: string;
    country: string;
    city: string;
    gender: string;
}

function ProfileForm() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
        setUser(storedUser);
    }, []);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.mainContent}>
            <form>
                <div className={styles.row}>
                    <div className={styles.formGroup}>
                        <label>Name</label>
                        <input type="text" defaultValue={user.name || ''} />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Surname</label>
                        <input type="text" defaultValue={user.surname || ''} />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Email</label>
                        <input type="email" defaultValue={user.email || ''} />
                    </div>
                </div>
                <div className={styles.row}>

                    <div className={styles.formGroup}>
                        <label>Number</label>
                        <input type="text" defaultValue={user.phoneNumber || ''} />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Gender</label>
                        <input type="text" defaultValue={user.gender || ''} />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Location</label>
                        <input type="text" defaultValue={user.country || ''} />
                    </div>
                    <div className={styles.formGroup}>
                        <label>City</label>
                        <input type="text" defaultValue={user.city || ''} />
                    </div>
                </div>

                <div className={styles.row}>
                    <div className={styles.formGroup}>
                        <label>WhatsApp</label>
                        <input type="text" defaultValue={user.gender || ''} />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Instagram</label>
                        <input type="text" defaultValue={user.gender || ''} />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Url</label>
                        <input type="url" defaultValue={user.gender || ''} />
                    </div>

                </div>
                <div className={styles.buttonGroup}>
                    <button type="button" className={styles.cancelBtn}>Cancel</button>
                    <button type="submit" className={styles.saveBtn}>Save</button>
                </div>
            </form>
        </div>
    );
}

export default ProfileForm;
