import React, { useEffect, useState } from "react";
import styles from "@/assets/css/postanadd/postanadd.module.css";
import toast from "react-hot-toast";
import { postApi } from "@/services/api";
import DatePicker from "react-datepicker";
import Image from "next/image";
import date_icon from "@/assets/img/calendar.svg";
import { currency, travelType } from "@/json/constant";
import trash from "@/assets/img/trash.svg";

type FormDataType = {
  appointmentDate: Date | null;
  fromDate: Date | null;
  toDate: Date | null;
};
interface User {
  id: string;
}


function CarryCreate() {
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

  const [tripPlaceDetails, setTripPlaceDetails] = useState<
    {
      fromPlace: string;
      fromTripDate: Date | null;
      toPlace: string;
      toTripDate: Date | null;
      travelType: number | null;
    }[]
  >([]);

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
    fromDate: null as Date | null,
    toDate: null as Date | null,
    travelType: null,
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "currency" || name === "travelType" ? Number(value) : value,
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

  const handleAddAnother = () => {
    if (
      !formData.from ||
      !formData.to ||
      !formData.fromDate ||
      !formData.toDate ||
      !formData.travelType
    ) {
      return toast.error("Fill in all fields.");
    }

    setTripPlaceDetails((prev) => [
      ...prev,
      {
        fromPlace: formData.from,
        fromTripDate: formData.fromDate,
        toPlace: formData.to,
        toTripDate: formData.toDate,
        travelType: formData.travelType,
      },
    ]);

    setFormData((prev) => ({
      ...prev,
      from: "",
      to: "",
      fromDate: null,
      toDate: null,
      appointmentDate: null,
      travelType: null,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (
        !formData.title ||
        !formData.description ||
        !formData.currency ||
        !formData.price ||
        !formData.count ||
        !formData.appointmentDate ||
        tripPlaceDetails.length === 0
      ) {
        return toast.error("Fill in all fields.");
      }

      const obj = {
        title: formData.title,
        description: formData.description,
        package: {
          currency: formData.currency,
          price: formData.price,
          count: formData.count,
          deadline: formData.appointmentDate,
          packageCategoryId: 1,
          packageSubCategoryId: 0,
        },
        case: {
          userId: user?.id,
        },
        tripPlaceDetailAddModels: tripPlaceDetails,
      };

      const response = await postApi("Trip/Create", obj, accessToken);

      if (response?.success === true) {
        toast.success("Sent successfully");
        setTripPlaceDetails([]);
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
      fromDate: null as Date | null,
      toDate: null as Date | null,
      travelType: null,
    });
  };
  const handleDelete = (index: number) => {
    setTripPlaceDetails((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="grid gap-3 grid-cols-2 mt-8">
        <div>
          <div className={`grid gap-3 grid-cols-2 ${styles.input_group}`}>
            <div className={styles.input_group_item}>
              <label htmlFor="title" className="">
                Title<span className={styles.reqField}> * </span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.input_group_item}>
              <label htmlFor="category" className="">
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
          <div className={`grid gap-3 grid-cols-2 ${styles.input_group}`}>
            <div className={styles.input_group_item}>
              <label htmlFor="from" className="">
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
              <label htmlFor="name" className="">
                Date<span className={styles.reqField}> * </span>
              </label>
              <div className="relative">
                <DatePicker
                  dateFormat="dd/MM/yyyy"
                  selected={formData.fromDate}
                  onChange={(date) => handleDateChange("fromDate", date)}
                  placeholderText="dd/mm/yyyy"
                  className="pl-10"
                />
                <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
                  <Image src={date_icon} alt="date_icon" />
                </div>
              </div>
            </div>
          </div>
          <div className={`grid gap-3 grid-cols-2 ${styles.input_group}`}>
            <div className={styles.input_group_item}>
              <label htmlFor="to" className="">
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
            <div className={styles.input_group_item}>
              <label htmlFor="name" className="">
                Date<span className={styles.reqField}> * </span>
              </label>
              <div className="relative">
                <DatePicker
                  dateFormat="dd/MM/yyyy"
                  selected={formData.toDate}
                  onChange={(date) => handleDateChange("toDate", date)}
                  placeholderText="dd/mm/yyyy"
                  className="pl-10"
                />
                <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
                  <Image src={date_icon} alt="date_icon" />
                </div>
              </div>
            </div>
          </div>
          <div className={`grid gap-3 grid-cols-2 ${styles.input_group}`}>
            <div className={styles.input_group_item}>
              <label htmlFor="travelType">
                Transport<span className={styles.reqField}> * </span>
              </label>
              <select
                name="travelType"
                value={formData.travelType || ""}
                onChange={handleInputChange}
              >
                <option value="">Select travelType</option>
                {Object.entries(travelType).map(([key, value]) => (
                  <option key={value} value={value}>
                    {key}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.input_group_item}>
              <label htmlFor="name" className="">
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
          </div>
        </div>
        <div>
          <div className={`grid gap-3  md:grid-cols-3 ${styles.input_group}`}>
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

          <div className={`grid gap-3 md:grid-cols-1 h-3/6 ${styles.input_group}`}>
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
                className="!pt-[10px] !h-full"
                maxLength={200}
              />
              <span className="flex justify-end !text-[#292d32a6]">
                {formData.description.length}/200
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className={styles.save_btn}
          onClick={handleAddAnother}
        >
          Add another
        </button>
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
          onClick={handleSubmit}
        >
          Save
        </button>
      </div>

      {tripPlaceDetails.length > 0 && (
        <table className="w-full mt-10">
          <thead className={styles.thead}>
            <tr>
              <th>From(City)</th>
              <th>From(Date)</th>
              <th>To(City)</th>
              <th>To(Date)</th>
              <th>Transport</th>
              <th></th>
            </tr>
          </thead>
          <tbody className={styles.tbody}>
            {tripPlaceDetails.map((item, index) => (
              <tr key={index}>
                <td>{item.fromPlace}</td>
                <td>{item.toPlace}</td>
                <td>{item.fromTripDate?.toLocaleDateString()}</td>
                <td>{item.toTripDate?.toLocaleDateString()}</td>
                <td>
                  {item.travelType == 0
                    ? "Bus"
                    : item.travelType == 1
                    ? "Plane"
                    : item.travelType == 2
                    ? "Car"
                    : item.travelType == 3
                    ? "Ship"
                    : item.travelType == 4
                    ? "Train"
                    : null}
                </td>
                <th onClick={() => handleDelete(index)} className="cursor-pointer">
              
                  <Image src={trash} className={""} alt={"delete"} />
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default CarryCreate;
