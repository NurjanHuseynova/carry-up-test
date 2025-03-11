import React, { useState, ChangeEvent, FormEvent } from "react";
import styles from "@/assets/css/forSidebar/forSidebar.module.css";
import DatePicker from "react-datepicker";
import Image from "next/image";
import date_icon from "@/assets/img/calendar.svg";
import { SendSidebarProps } from "@/types/type";
// import { IMaskInput } from "react-imask";
import { currency } from "@/json/constant";

const SendSidebar: React.FC<SendSidebarProps> = ({
  handleSubmit,
  handleInputChange,
  setSendFormData,
  fetchSends,
  sendFormData,
  sendClearForm,
  sendCurrentPage,
}) => {
  return (
    <section className={styles.sidebar_section}>
      <form className={styles.form_section} onSubmit={handleSubmit}>
        {/* <div className={`flex flex-col !gap-2 ${styles.input_group}`}>
          <label>Create Date</label>
          <div className="relative">
            <IMaskInput
              mask="00/00/0000"
              placeholder="DD/MM/YYYY"
              name="createDate"
              value={sendFormData.createDate}
              onAccept={(value: any) =>
                setSendFormData((prevData) => ({
                  ...prevData,
                  createDate: value,
                }))
              }
            />
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
              <Image src={date_icon} alt="date_icon" />
            </div>
          </div>
        </div> */}
        <div className={`flex flex-col !gap-2 ${styles.input_group}`}>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={sendFormData.title}
            placeholder="Enter"
            onChange={handleInputChange}
          />
        </div>

        <div className={`flex flex-col !gap-2 ${styles.input_group}`}>
          <label>Price</label>
          <div className="!grid !grid-cols-2 gap-2">
            <div className={`flex flex-col !gap-2 ${styles.input_group}`}>
              <label>Min Price</label>
              <input
                type="text"
                name="minPrice"
                value={sendFormData.minPrice}
                placeholder="Min price"
                onChange={handleInputChange}
              />
            </div>
            <div className={`flex flex-col !gap-2 ${styles.input_group}`}>
              <label>Max Price</label>
              <input
                type="text"
                name="maxPrice"
                value={sendFormData.maxPrice}
                placeholder="Max price"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <div className={`flex flex-col !gap-2 ${styles.input_group}`}>
          <label>Currency</label>
          <select
            name="currency"
            value={sendFormData.currency}
            onChange={handleInputChange}
            className="form-select"
          >
            <option value="">Select currency</option>
            {currency &&
              Object.entries(currency).map(([key, value]) => (
                <option key={value} value={value}>
                  {key}
                </option>
              ))}
          </select>
        </div>
        <div className={`flex flex-col !gap-2 ${styles.input_group}`}>
          <label>Category</label>
          <select
            name="category"
            value={sendFormData.category}
            onChange={handleInputChange}
            className="form-select"
          >
            <option value={0} >
              Select category
            </option>
            <option value={1}>Document</option>
          </select>
        </div>
        <div className={`flex flex-col !gap-2 ${styles.input_group}`}>
          <label>From Place</label>
          <input
            type="text"
            name="fromPlace"
            value={sendFormData.fromPlace}
            placeholder="Enter"
            onChange={handleInputChange}
          />
        </div>
        <div className={`flex flex-col !gap-2 ${styles.input_group}`}>
          <label>To Place</label>
          <input
            type="text"
            name="toPlace"
            value={sendFormData.toPlace}
            placeholder="Enter"
            onChange={handleInputChange}
          />
        </div>
      </form>

      <div className="mt-9 flex justify-between gap-4">
        <button
          type="button"
          className={`${styles.clear_button}`}
          onClick={() => sendClearForm()}
        >
          Clear all
        </button>
        <button
          type="submit"
          className={`${styles.search_button}`}
          onClick={() => {
            fetchSends(sendCurrentPage);
          }}
        >
          Search
        </button>
      </div>
    </section>
  );
};

export default SendSidebar;
