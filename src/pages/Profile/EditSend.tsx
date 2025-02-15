"use client";
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { getApiWithToken, putApi } from '@/services/api';
import toast from 'react-hot-toast';
import { currency, travelType } from "@/json/constant";
import DatePicker from "react-datepicker";
import Image from "next/image";
import date_icon from "@/assets/img/calendar.svg";

import styles from "@/assets/css/postanadd/postanadd.module.css";
import "@/assets/css/profile/profileEdit.css";

type FormDataType = {
    appointmentDate: Date | null;
    deadline: Date | null;
    // fromDate: Date | null;
    // toDate: Date | null;
};


const EditSend = () => {
    const router = useRouter();
    // const searchParams = useSearchParams()
    // const id = searchParams?.get("id");


    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        id: '',
        userId: "",
        caseId: "",
        packageId: '',
        packageCategoryId: '',
        title: "",
        category: "",
        count: "",
        price: "",
        currency: null,
        from: "",
        to: "",
        description: "",
        appointmentDate: null as Date | null,
        deadline: null as Date | null,
        // fromDate: null as Date | null,
        // toDate: null as Date | null,
        // travelType: null,
        sendPlaceDetail: [],
    });


    // const [tripPlaceDetails, setTripPlaceDetails] = useState<
    //     {
    //         id: string;
    //         fromPlace: string;
    //         fromTripDate: Date | null;
    //         toPlace: string;
    //         toTripDate: Date | null;
    //         travelType: number | null;
    //     }[]
    // >([]);

    // useEffect(() => {
    //     if (id) fetchSendDetails(id as string);
    // }, [id]);

    async function fetchSendDetails(sendId: string) {
        setIsLoading(true);

        try {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                toast.error('User credentials missing.');
                return;
            }

            const response = await getApiWithToken(`Send/GetById/${sendId}`, accessToken);
            const value = await response?.value;
            console.log(value);

            if (value) {
                setFormData({
                    id: value?.id || '',
                    caseId: value?.case?.id || '',
                    userId: value?.case?.user.id || '',
                    packageId: value?.package?.id || '',
                    packageCategoryId: value?.package?.packageCategory?.id || '',
                    title: value?.title || "",
                    category: value?.package.packageCategory.name
                        || "",
                    count: value?.package.count || "",
                    price: value?.package.price || "",
                    currency: value?.package.currency || null,
                    from: value?.sendPlaceDetails[0]?.fromPlace || "",
                    to: value?.sendPlaceDetails[0]?.toPlace || "",
                    description: value?.description || "",
                    appointmentDate: value?.sendPlaceDetails[0]?.catchDate ? new Date(value?.sendPlaceDetails[0]?.catchDate) : null,
                    deadline: value?.package?.deadline ? new Date(value?.package?.deadline) : null,
                    // fromDate: value?.tripPlaceDetails[0]?.fromTripDate ? new Date(value?.tripPlaceDetails[0]?.fromTripDate) : null,
                    // toDate: value?.tripPlaceDetails[0]?.toTripDate ? new Date(value?.tripPlaceDetails[0]?.toTripDate) : null,
                    // travelType: value?.tripPlaceDetails[0]?.travelType || null,
                    sendPlaceDetail: value.sendPlaceDetails
                });

            } else {
                toast.error('Send not found.');
            }
        } catch (error: any) {
            toast.error('Error fetching send: ' + error.message);
        } finally {
            setIsLoading(false);
        }
    }


    const handleInputChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]:
                name === "currency" || name === "travelType" || name == 'count' || name == 'price' ? Number(value) : value,
        }));
    };

    const handleDateChange = (field: keyof FormDataType, date: Date | null) => {
        setFormData((prev) => ({
            ...prev,
            [field]: date,
        }));
    };

    const handleDescriptionChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        const { value } = e.target;
        if (value.length <= 200) {
            setFormData((prev) => ({
                ...prev,
                description: value,
            }));
        }
    };

    const clearInput = () => {
        setFormData({
            ...formData,
            title: "",
            category: "",
            count: "",
            price: "",
            currency: null,
            from: "",
            to: "",
            description: "",
            appointmentDate: null as Date | null,
            // fromDate: null as Date | null,
            // toDate: null as Date | null,
            // travelType: null,
        });
    };

    async function handleSave() {

        setIsLoading(true);

        //    const tripPlaceDetailUpdateModels = [...formData.tripPlaceDetail, ]

        try {
            const accessToken = localStorage.getItem('accessToken');
            const user = localStorage.getItem('user');

            if (!accessToken) {
                toast.error('User credentials missing.');
                return;
            }

            const payload = {
                id: formData.id,
                title: formData.title,
                description: formData.description,
                package: {
                    id: formData.packageId,
                    currency: formData.currency,
                    price: formData.price,
                    count: formData.count,
                    deadline: formData.deadline,
                    packageCategoryId: null,
                    packageSubCategoryId: null,
                },
                case: {
                    id: formData.caseId,
                    userId: formData.userId,
                },
                sendPlaceDetailUpdateModels: [
                    {
                        id: formData?.sendPlaceDetail[0]?.['id'] || '',
                        fromPlace: formData.from,
                        // fromTripDate: formData.fromDate,
                        catchDate: formData.appointmentDate,
                        toPlace: formData.to,
                        // toTripDate: formData.toDate,
                        // travelType: formData.travelType,
                    }
                ],
            };

            const response = await putApi(`Send/Update`, payload, accessToken);

            if (response?.success) {
                setFormData({
                    ...formData,
                    title: "",
                    category: "",
                    count: "",
                    price: "",
                    currency: null,
                    from: "",
                    to: "",
                    description: "",
                    appointmentDate: null as Date | null,
                    // fromDate: null as Date | null,
                    // toDate: null as Date | null,
                    // travelType: null,
                });
                toast.success('Send updated successfully.');
                router.push('/profile?tab=myAdsSend');
            } else {
                toast.error('Failed to update send!');
            }
        } catch (error: any) {
            toast.error('Error updating send: ' + error.message);
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <div style={{
            justifyContent: isLoading ? 'center' : '', // Deactivate justify-content when loading
        }} className={`editContainer ${styles.create_container}`}>
            <h4 className={styles.activeTab}>Edit Send</h4>
            {isLoading ? (
                <div role="status" className='loading'>
                    <svg
                        aria-hidden="true"
                        className="inline w-8 h-8 text-gray-200 animate-spin  fill-purple-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                        />
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                        />
                    </svg>
                </div>
            ) : (
                formData.title && (
                    <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                        <div className="grid grid-cols-2 gap-3 mt-8">
                            <div className={`grid gap-3 md:grid-cols-2 ${styles.input_group}`}>
                                <div className={styles.input_group_item}>
                                    <label htmlFor="title">
                                        Title<span className={styles.reqField}> * </span>
                                    </label>
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        placeholder="Type here"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className={styles.input_group_item}>
                                    <label htmlFor="category">
                                        Category<span className={styles.reqField}> * </span>
                                    </label>
                                    <input
                                        type="text"
                                        id="category"
                                        name="category"
                                        placeholder="Category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className={`grid gap-3 md:grid-cols-3 ${styles.input_group}`}>
                                <div className={`${styles.input_group_item}`}>
                                    <label htmlFor="count">
                                        Count<span className={styles.reqField}> * </span>
                                    </label>
                                    <input
                                        type="number"
                                        id="count"
                                        name="count"
                                        placeholder="0"
                                        value={formData.count}
                                        onChange={handleInputChange}
                                        min="0"
                                    />
                                </div>
                                <div className={`${styles.input_group_item}`}>
                                    <label htmlFor="price">
                                        Price<span className={styles.reqField}> * </span>
                                    </label>
                                    <input
                                        type="number"
                                        id="price"
                                        name="price"
                                        placeholder="0"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        min="0"
                                        max="999"
                                    />
                                </div>
                                <div className={`${styles.currencySection}`}>
                                    <label>
                                        Currency<span className={styles.reqField}> * </span>
                                    </label>
                                    <div className="flex gap-4">
                                        <label className="flex items-center gap-2">
                                            <input
                                                type="radio"
                                                name="currency"
                                                value={currency.AZN}
                                                checked={Boolean(formData.currency) == Boolean(currency.AZN)}
                                                onChange={handleInputChange}
                                            />{" "}
                                            AZN
                                        </label>
                                        <label className="flex items-center gap-2">
                                            <input
                                                type="radio"
                                                name="currency"
                                                value={currency.USD}
                                                checked={Boolean(formData.currency) == Boolean(currency.USD)}
                                                onChange={handleInputChange}
                                            />{" "}
                                            USD
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mt-3">
                            <div className={`grid gap-3 md:grid-cols-2 ${styles.input_group}`}>
                                <div className={styles.input_group_item}>
                                    <label htmlFor="from">
                                        From<span className={styles.reqField}> * </span>
                                    </label>
                                    <input
                                        type="text"
                                        id="from"
                                        name="from"
                                        placeholder="From"
                                        value={formData.from}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className={styles.input_group_item}>
                                    <label htmlFor="to">
                                        To<span className={styles.reqField}> * </span>
                                    </label>
                                    <input
                                        type="text"
                                        id="to"
                                        name="to"
                                        placeholder="To"
                                        value={formData.to}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className={`grid gap-3 md:grid-cols-1 ${styles.input_group}`}>
                                <div className={styles.input_group_item}>
                                    <label htmlFor="description">
                                        Description<span className={styles.reqField}> * </span>
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        placeholder="Type here"
                                        value={formData.description}
                                        onChange={handleDescriptionChange}
                                        className="!pt-[10px]"
                                        maxLength={200}
                                    />
                                    <span className="flex justify-end !text-[#292d32a6]">
                                        {formData.description.length}/200
                                    </span>
                                </div>
                            </div>
                            <div className={`grid gap-3 md:grid-cols-1 ${styles.input_group}`}>
                                <div className={styles.input_group_item}>
                                    <label htmlFor="appointmentDate">
                                        Date of appointment<span className={styles.reqField}> * </span>
                                    </label>
                                    <div className="relative">
                                        <DatePicker
                                            dateFormat="dd/MM/yyyy"
                                            selected={formData.appointmentDate}
                                            onChange={(date) => handleDateChange("appointmentDate", date)}
                                            placeholderText="dd/mm/yyyy"
                                            className="pl-10"
                                        />
                                        <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
                                            <Image src={date_icon} alt="date_icon" />
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.input_group_item}>
                                    <label htmlFor="name" className="">
                                        Deadline<span className={styles.reqField}> * </span>
                                    </label>
                                    <div className="relative">
                                        <DatePicker
                                            dateFormat="dd/MM/yyyy"
                                            selected={formData.deadline}
                                            onChange={(date) => handleDateChange("deadline", date)}
                                            placeholderText="dd/mm/yyyy"
                                            className="pl-10"
                                        />
                                        <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
                                            <Image src={date_icon} alt="date_icon" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 justify-end items-end mt-3">
                            <button
                                type="button"
                                className={styles.cancel_btn}
                                onClick={clearInput}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className={styles.save_btn}
                                disabled={isLoading}>
                                Save
                            </button>
                        </div>
                    </form>
                ))}

        </div>
    );
};

export default EditSend;