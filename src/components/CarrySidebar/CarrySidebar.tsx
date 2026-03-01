import React, { ChangeEvent } from "react";
// import { IMaskInput } from "react-imask";
import styles from "@/assets/css/forSidebar/forSidebar.module.css";
import Image from "next/image";
import date_icon from "@/assets/img/calendar.svg";
import { currency, travelType } from "@/json/constant";
import { CarrySidebarProps } from "@/types/type";
import DatePicker from "react-datepicker";
import { useTranslations } from "next-intl";

type FormDataType = {
  appointmentDate: Date | null;
  toTripDate: Date | null;
  fromTripDate: Date | null;

};


const CarrySidebar: React.FC<CarrySidebarProps> = ({
  handleSubmit,
  handleInputChange,
  formData,
  fetchTrips,
  setFormData,
  clearForm,
  tripCurrentPage,
}) => {

  const handleDateChange = (field: keyof FormDataType, date: Date | null) => {

    setFormData((prev) => ({
      ...prev,
      [field]: date,
    }));
  };
  
  
  const t =  useTranslations("Static")
  
  return (
    <section className={styles.sidebar_section}>
      <form className={styles.form_section} onSubmit={handleSubmit}>
  

        <div className={`flex flex-col !gap-2 ${styles.input_group}`}>
          <label>{t("title")}</label>
          <input
            type="text"
            name="title"
            placeholder="Enter title"
            value={formData.title}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>

        <div className={`flex flex-col !gap-2 ${styles.input_group}`}>
          <label>{t("Travel Type")}</label>
          <select
            name="travelType"
            value={formData.travelType}
            onChange={handleInputChange}
            className="form-select"
          >
            <option value="" >{t("Select travel type")}</option>
            {travelType &&
              Object.entries(travelType).map(([key, value]) => (
                <option key={value} value={value}>
                  {key}
                </option>
              ))}
          </select>
        </div>

        <div className={`flex flex-col !gap-2 ${styles.input_group}`}>
          <label>{t("price")}</label>
          <div className="!grid !grid-cols-2 gap-2">
            <div className={`flex flex-col !gap-2 ${styles.input_group}`}>
              <label>{t("min price")}</label>
              <input
                type="text"
                name="minPrice"
                value={formData.minPrice}
                placeholder="Min price"
                onChange={handleInputChange}
              />
            </div>
            <div className={`flex flex-col !gap-2 ${styles.input_group}`}>
              <label>{t("max price")}</label>
              <input
                type="text"
                name="maxPrice"
                value={formData.maxPrice}
                placeholder="Max price"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <div className={`flex flex-col !gap-2 ${styles.input_group}`}>
          <label>{t("currency")}</label>
          <select
            name="currency"
            value={formData.currency}
            onChange={handleInputChange}
            className="form-select"
          >
            <option value="" style={{ color: "gray !important" }} >{t("select currency")}</option>
            {currency &&
              Object.entries(currency).map(([key, value]) => (
                <option key={value} value={value}>
                  {key}
                </option>
              ))}
          </select>
        </div>

 
        <div className={`flex flex-col !gap-2 ${styles.input_group}`}>
          <label>{t("category")}</label>

          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="form-select"
          >
            <option value={0} >
              {t("select category")}
            </option>
            <option value={1}>{t("document")}</option>
          </select>
        </div>

        <div className={`flex flex-col !gap-2 ${styles.input_group}`}>
          <label>{t("from place")}</label>
          <input
            type="text"
            name="fromPlace"
            placeholder="Enter starting place"
            value={formData.fromPlace}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>

        <div className={`flex flex-col !gap-2 ${styles.input_group}`}>
          <label>{t("to place")}</label>
          <input
            type="text"
            name="toPlace"
            placeholder="Enter destination"
            value={formData.toPlace}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>

        <div className={`flex flex-col !gap-2 ${styles.input_group}`}>
  <label>{t("from trip date")}</label>
  <div className="relative">
    <DatePicker
      name="fromTripDate"
      dateFormat="dd/MM/yyyy"
      selected={formData.fromTripDate}
      onChange={(date) => handleDateChange("fromTripDate", date)}
      placeholderText="dd/mm/yyyy"
      className="pl-10"
    />
    <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
      <Image src={date_icon} alt="date_icon" />
    </div>
  </div>
</div>

<div className={`flex flex-col !gap-2 ${styles.input_group}`}>
  <label>{t("to trip date")}</label>
  <div className="relative">
    <DatePicker
      name="toTripDate"
      dateFormat="dd/MM/yyyy"
      selected={formData.toTripDate} 
      onChange={(date) => handleDateChange("toTripDate", date)}
      placeholderText="dd/mm/yyyy"
      className="pl-10"
    />
    <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
      <Image src={date_icon} alt="date_icon" />
    </div>
  </div>
</div>


        <div className="mt-9 flex justify-between gap-4">
          <button
            type="button"
            className={`${styles.clear_button}`}
            onClick={() => clearForm()}
          >
            {t("clear all")}
          </button>
          <button
            type="submit"
            className={`${styles.search_button}`}
            onClick={() => {
              fetchTrips(tripCurrentPage);
            }}
          >
          {t("search")}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CarrySidebar;
