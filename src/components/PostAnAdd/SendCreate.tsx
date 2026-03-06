import React, { useEffect, useState } from "react";
import styles from "@/assets/css/postanadd/postanadd.module.css";
import DatePicker from "react-datepicker";
import Image from "next/image";
import date_icon from "@/assets/img/calendar.svg";

import toast from "react-hot-toast";
import { postApi } from "../../services/api";
import { currency } from "../../json/constant";
import { useTranslations } from "next-intl";

interface User {
  id: string;
}

function SendCreate() {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("accessToken");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedToken) {
      setAccessToken(storedToken);
    }
  }, []);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    count: "",
    price: "",
    currency: null,
    from: "",
    to: "",
    description: "",
    appointmentDate: null as Date | null,
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "currency" ? parseInt(value) : value,
    }));
  };

  const handleDateChange = (date: Date | null) => {
    setFormData((prev) => ({
      ...prev,
      appointmentDate: date,
    }));
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    if (value.length <= 200) {
      setFormData((prev) => ({
        ...prev,
        description: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (
        !formData?.title ||
        !formData?.description ||
        !formData?.currency ||
        !formData?.price ||
        !formData?.count ||
        !formData?.from ||
        !formData?.to ||
        !formData?.appointmentDate
      ) {
        return  toast.error("Please fill in all required fields.")
      }

      const obj = {
        title: formData?.title,
        description: formData?.description,
        case: {
          userId: user?.id,
        },
        package: {
          currency: formData?.currency,
          price: formData?.price,
          count: formData?.count,
          deadline: "2025-01-26T11:47:16.695Z",
          packageCategoryId: 1,
        },
        sendPlaceDetailAddModels: [
          {
            fromPlace: formData?.from,
            catchDate: formData?.appointmentDate,
            toPlace: formData?.to,
          },
        ],
      };

      const response = await postApi("Send/Create", obj, accessToken);

      if (response?.success === true) {
        toast.success("Sent successfully");
        clearInput();
      } else {
        toast.error("Server error");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const clearInput = () => {
    setFormData({
      title: "",
      category: "",
      count: "",
      price: "",
      currency: null,
      from: "",
      to: "",
      description: "",
      appointmentDate: null as Date | null,
    });
  };
  const t = useTranslations("Static")
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 gap-3 mt-8">
          <div className={`grid gap-3 md:grid-cols-2 ${styles.input_group}`}>
       
            <div className={styles.input_group_item}>
              <label htmlFor="category">
              {t("Category")}  <span className={styles.reqField}> * </span>
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
          <div className={`grid gap-3 grid-cols-2 md:grid-cols-3 mb-2 ${styles.input_group}`}>
  
            <div className={`${styles.input_group_item}`}>
              <label htmlFor="price">
                 {t("price")}<span className={styles.reqField}> * </span>
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
                {t("Currency")}<span className={styles.reqField}> * </span>
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="currency"
                    value={currency.AZN}
                    checked={formData.currency === currency.AZN}
                    onChange={handleInputChange}
                  />{" "}
                  AZN
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="currency"
                    value={currency.USD}
                    checked={formData.currency === currency.USD}
                    onChange={handleInputChange}
                  />{" "}
                  USD
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 md:gap-3 md:mt-3">
          <div className={`grid gap-3 md:grid-cols-2 ${styles.input_group}`}>
            <div className={styles.input_group_item}>
              <label htmlFor="from">
                {t("From City")}<span className={styles.reqField}> * </span>
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
               {t("To City")}<span className={styles.reqField}> * </span>
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
               <div className={styles.input_group_item}>
              <label htmlFor="from" className="">
                 {t("From Country")}<span className={styles.reqField}> * </span>
              </label>
              <input
                type="text"
                id="from"
                name="from"
                placeholder="from"
                value={formData.from}
                onChange={handleInputChange}
              />
            </div>
              <div className={styles.input_group_item}>
              <label htmlFor="to" className="">
                 {t("To Country")}<span className={styles.reqField}> * </span>
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
                {t("description")}<span className={styles.reqField}> * </span>
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
          <div className={`grid gap-3 md:grid-cols-2 ${styles.input_group}`}>
            <div className={styles.input_group_item}>
              <label htmlFor="appointmentDate">
            {t("date of appointment")}    <span className={styles.reqField}> * </span>
              </label>
              <div className="relative">
                <DatePicker
                  dateFormat="dd/MM/yyyy"
                  selected={formData.appointmentDate}
                  onChange={handleDateChange}
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
                 {t("Last apply date")}<span className={styles.reqField}> * </span>
              </label>
              <div className="relative">
                <DatePicker
                  dateFormat="dd/MM/yyyy"
                  // selected={formData.appointmentDate}
                  // onChange={(date) => handleDateChange("appointmentDate", date)}
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
              {t("Cancel")} 
          </button>
          <button type="submit" className={styles.save_btn}>
           {t("save")} 
          </button>
        </div>
      </form>
    </div>
  );
}

export default SendCreate;
