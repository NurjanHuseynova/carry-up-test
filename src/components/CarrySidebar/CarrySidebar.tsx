import React, { useState, ChangeEvent, FormEvent } from "react";
import styles from "@/assets/css/forSidebar/forSidebar.module.css";
import DatePicker from "react-datepicker";
import Image from "next/image";
import date_icon from "@/assets/img/calendar.svg";


interface FormData {
  createDate: string;
  title: string;
  travelType: string;
  minPrice: string;
  maxPrice: string;
  category: string;
  fromPlace: string;
  toPlace: string;
  fromTripDate: string;
  toTripDate: string;
}

const CarrySidebar: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    createDate: "",
    title: "",
    travelType: "",
    minPrice: "",
    maxPrice: "",
    category: "",
    fromPlace: "",
    toPlace: "",
    fromTripDate: "",
    toTripDate: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <section className={styles.sidebar_section}>
      <form className={styles.form_section} onSubmit={handleSubmit}>
        <div className={`flex flex-col !gap-2 ${styles.input_group}`}>
          <label>Create Date</label>
          <div className="relative">
                  <DatePicker
                 
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Created Date"
                    className={`pl-10 w-full`}
                  />
                  <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
                    <Image src={date_icon} alt="date_icon" />
                  </div>
                </div>
        </div>
        <div className={`flex flex-col !gap-2 ${styles.input_group}`}>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            placeholder="Enter"
            onChange={handleInputChange}
          />
        </div>
        <div className={`flex flex-col !gap-2 ${styles.input_group}`}>
          <label>Travel Type</label>
          <select
            name="travelType"
            value={formData.travelType}
            onChange={handleInputChange}
          >
            <option value="">Select</option>
            <option value="business">Business</option>
            <option value="leisure">Leisure</option>
          </select>
        </div>
        <div className={`flex flex-col !gap-2 ${styles.input_group}`}>
          <label>Price</label>
          <div className="!grid !grid-cols-2 gap-2">
            <div className={`flex flex-col !gap-2 ${styles.input_group}`}>
              <label>Min Price</label>
              <input
                type="text"
                name="minPrice"
                value={formData.minPrice}
                placeholder="Min price"
                onChange={handleInputChange}
              />
            </div>
            <div className={`flex flex-col !gap-2 ${styles.input_group}`}>
              <label>Max Price</label>
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
          <label>Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          >
            <option value="">Select</option>
            <option value="economy">Economy</option>
            <option value="luxury">Luxury</option>
          </select>
        </div>
        <div className={`flex flex-col !gap-2 ${styles.input_group}`}>
          <label>From Place</label>
          <input
            type="text"
            name="fromPlace"
            value={formData.fromPlace}
            placeholder="Enter"
            onChange={handleInputChange}
          />
        </div>
        <div className={`flex flex-col !gap-2 ${styles.input_group}`}>
          <label>To Place</label>
          <input
            type="text"
            name="toPlace"
            value={formData.toPlace}
            placeholder="Enter"
            onChange={handleInputChange}
          />
        </div>
        <div className={`flex flex-col !gap-2 ${styles.input_group}`}>
          <label>From Trip Date</label>
          <div className="relative">
                  <DatePicker
                 
                    dateFormat="dd/MM/yyyy"
                    placeholderText="From Trip Date"
                    className={`pl-10 w-full`}
                  />
                  <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
                    <Image src={date_icon} alt="date_icon" />
                  </div>
                </div>
        </div>
        <div className={`flex flex-col !gap-2 ${styles.input_group}`}>
          <label>To Trip Date</label>
          <div className="relative">
                  <DatePicker
                 
                    dateFormat="dd/MM/yyyy"
                    placeholderText="To Trip Date"
                    className={`pl-10 w-full`}
                  />
                  <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
                    <Image src={date_icon} alt="date_icon" />
                  </div>
                </div>
        </div>
     
      </form>

      <div className="mt-9 flex justify-between gap-4">
          <button className={`${styles.clear_button}`}>Clear all</button>
          <button className={`${styles.search_button}`}>Search</button>
        </div>
    </section>
  );
};

export default CarrySidebar;
