import React, { ChangeEvent } from "react";
import { IMaskInput } from "react-imask";
import styles from "@/assets/css/forSidebar/forSidebar.module.css";
import Image from "next/image";
import date_icon from "@/assets/img/calendar.svg";
import { currency, travelType } from "@/json/constant";
import { CarrySidebarProps, FormData } from "@/types/type";



const CarrySidebar: React.FC<CarrySidebarProps> = ({
  handleSubmit,
  handleInputChange,
  formData,
  fetchTrips,
  setFormData,
  clearForm,
  tripCurrentPage,
}) => {
  return (
    <section className={styles.sidebar_section}>
      <form className={styles.form_section} onSubmit={handleSubmit}>
        <div className={`flex flex-col !gap-2 ${styles.input_group}`}>
          <label>Create Date</label>
          <div className="relative">
            <IMaskInput
              mask="00/00/0000"
              placeholder="DD/MM/YYYY"
              name="createDate"
              value={formData.createDate}
              onAccept={(value: any) =>
                setFormData((prevData) => ({
                  ...prevData,
                  createDate: value,
                }))
              }
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
            placeholder="Enter title"
            value={formData.title}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>

        <div className={`flex flex-col !gap-2 ${styles.input_group}`}>
          <label>Travel Type</label>
          <select
            name="travelType"
            value={formData.travelType}
            onChange={handleInputChange}
            className="form-select"
          >
            <option value="" >Select travel type</option>
            {travelType &&
              Object.entries(travelType).map(([key, value]) => (
                <option key={value} value={value}>
                  {key}
                </option>
              ))}
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
          <label>Currency</label>
          <select
            name="currency"
            value={formData.currency}
            onChange={handleInputChange}
            className="form-select"
          >
            <option value=""  >Select currency</option>
            {currency &&
              Object.entries(currency).map(([key, value]) => (
                <option key={value} value={value}>
                  {key}
                </option>
              ))}
          </select>
        </div>

        {/* <div className={`flex flex-col !gap-2 ${styles.input_group}`}>
                    <label >Price</label>
                    <div className="!grid !grid-cols-2 gap-2">
                      <div className={`flex flex-col !gap-2 ${styles.input_group}`}>
                        <label >
                          Min Price
                        </label>
                        <div className="flex  border ">
                          <input
                            type="text"
                            style={{ width: "50px", border: "none" }}
                            className="focus:outline-none "
                            name="minPrice"
                            value={formData.minPrice}
                            onChange={handleInputChange}
                          />
                          <select
                            style={{ border: "none" }}
                            className="focus:outline-none"
                            name="currency"
                            value={formData.currency}
                            onChange={handleInputChange}
                          >
                            {Object.entries(currency).map((v) => (
                              <>
                                <option value={v[1]} >
                                  {v[0]}
                                </option>
                              </>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className={`flex flex-col !gap-2 ${styles.input_group}`}>
                        <label >
                          Max Price
                        </label>

                        <div className="flex  border ">
                          <input
                            type="text"
                            style={{ width: "50px", border: "none" }}
                            className="focus:outline-none "
                            name="maxPrice"
                            value={formData.maxPrice}
                            onChange={handleInputChange}
                          />
                          <select
                            style={{ border: "none" }}
                            className="focus:outline-none"
                            name="currency"
                            value={formData.currency}
                            onChange={handleInputChange}
                          >
                            {Object.entries(currency).map((v) => (
                              <>
                                <option value={v[1]}>
                                  {v[0]}
                                </option>
                              </>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div> */}

        <div className={`flex flex-col !gap-2 ${styles.input_group}`}>
          <label>Category</label>

          <select
            name="category"
            value={formData.category}
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
            placeholder="Enter starting place"
            value={formData.fromPlace}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>

        <div className={`flex flex-col !gap-2 ${styles.input_group}`}>
          <label>To Place</label>
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
          <label>From Trip Date</label>
          <div className="relative">
            <IMaskInput
              mask="00/00/0000"
              placeholder="DD/MM/YYYY"
              name="fromTripDate"
              value={formData.fromTripDate}
              onAccept={(value: any) =>
                setFormData((prevData) => ({
                  ...prevData,
                  fromTripDate: value,
                }))
              }
            />
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
              <Image src={date_icon} alt="date_icon" />
            </div>
          </div>
        </div>

        <div className={`flex flex-col !gap-2 ${styles.input_group}`}>
          <label>To Trip Date</label>
          <div className="relative">
            <IMaskInput
              mask="00/00/0000"
              placeholder="DD/MM/YYYY"
              name="toTripDate"
              value={formData.toTripDate}
              onAccept={(value: any) =>
                setFormData((prevData) => ({
                  ...prevData,
                  toTripDate: value,
                }))
              }
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
            onClick={() => clearForm}
          >
            Clear all
          </button>
          <button
            type="submit"
            className={`${styles.search_button}`}
            onClick={() => {
              fetchTrips(tripCurrentPage);
            }}
          >
            Search
          </button>
        </div>
      </form>
    </section>
  );
};

export default CarrySidebar;
