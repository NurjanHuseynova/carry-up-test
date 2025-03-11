"use client";
import React, { useEffect, useState } from "react";
import styles from "@/assets/css/signUp/signUp.module.css";
import carry_logo from "@/assets/img/Carry UP.svg";
import google_icon from "@/assets/img/google.svg";
import eye_icon from "@/assets/img/eye_icon.svg";
import date_icon from "@/assets/img/calendar.svg";
import Image from "next/image";
import Link from "next/link";
import { fetchApi, getApiWithToken, postApi } from "@/services/api";
import DatePicker from "react-datepicker";
import { gender } from "@/json/constant";
import eye from "@/assets/img/eye.svg";
import toast from "react-hot-toast";
import SuccessModal from "@/components/SuccessModal/SuccessModal";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

// // @ts-ignore
// import { LoginSocialGoogle } from "reactjs-social-login";

interface GoogleProviderData {
  data: {
    code: string;
  };
}

interface Country {
  id: number;
  name: string;
}

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    birthday: null as Date | null,
    gender: "" as number | "",
    email: "",
    number: "",
    password: "",
    confirmPassword: "",
    terms: false,
    country: "",
    city: "",
  });
  const [toggle, setToggle] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [countries, setCountries] = useState<Country[]>([]);
  const [formErrors, setFormErrors] = useState<{
    name: boolean;
    surname: boolean;
    birthday: boolean;
    gender: boolean;
    email: boolean;
    number: boolean;
    password: boolean;
    confirmPassword: boolean;
    // terms: boolean;
    // country: boolean;
    city: boolean;
  }>({
    name: false,
    surname: false,
    birthday: false,
    gender: false,
    email: false,
    number: false,
    password: false,
    confirmPassword: false,
    // terms: false,
    // country: false,
    city: false,
  });

  const [loading, setLoading] = useState<boolean>(false);

  const [showPasswordConfirm, setShowPasswordConfirm] =
    useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const togglePasswordConfirmVisibility = () => {
    setShowPasswordConfirm((prev) => !prev);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    const parsedValue = name === "gender" ? Number(value) : value;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: parsedValue,
      }));
    }

    if (name !== "terms") {
      setFormErrors((errors) => ({ ...errors, [name]: false }));
    }
  };

  const handleDateChange = (date: Date | null) => {
    setFormData((prevData) => ({
      ...prevData,
      birthday: date,
    }));

    setFormErrors((errors) => ({
      ...errors,
      birthday: !date || isNaN(date.getTime()),
    }));
  };

  const handlePhoneChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      number: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = {
      name: formData.name.trim() === "",
      surname: formData.surname.trim() === "",
      birthday:
        formData.birthday instanceof Date
          ? formData.birthday.toString().trim() === ""
          : (formData.birthday ?? "").trim() === "",
      gender: formData.gender === "",
      email: formData.email.trim() === "",
      number: formData.number.trim() === "",
      password: formData.password.trim() === "",
      confirmPassword: formData.confirmPassword.trim() === "",
      // terms: !formData.terms,
      // country: formData.country.trim() === "",
      city: formData.city.trim() === "",
    };

    setFormErrors(errors);

    if (Object.values(errors).some((error) => error)) {
      // toast.error("Please fill out all required fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const userData = {
        name: formData.name,
        surname: formData.surname,
        email: formData.email,
        phoneNumber: formData.number,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        birthDate: formData.birthday ? formData.birthday.toISOString() : null,
        gender: formData.gender,
        city: formData.city,
        country: formData.country,
        term: formData.terms,
      };

      const response = await postApi("Manage/Register", userData);

      if (response?.errors && response.errors.length > 0) {
        response.errors.forEach((error: string) => {
          toast.error(error);
        });
        setLoading(false);
        return;
      }

      if (response?.success) {
        setToggle(true);
        toast.success("Registration successful!");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const loginByGoogle = async (code: string) => {
    try {
      const res = await postApi("Manage/LoginByGoogle", {
        code: String(code),
      });

      console.log("responseData", res);
    } catch (error) {
      console.log("loginByGoogle", error);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const res = await fetchApi("Country/AllCountries");

      if (res?.success) {
        setCountries(res.list || []);
      } else {
        toast.error("Failed to load countries");
      }
    } catch (error) {
      console.error("Error fetching countries:", error);
      toast.error("Error fetching country data");
    }
  };

  return (
    <>
      {loading && (
        <div className={styles.loading_overlay}>
          <div className="loader"></div>
        </div>
      )}
      <section className={styles.signup_container}>
        <div className={styles.signup_section}>
          <div className={styles.logo}>
            <Image src={carry_logo} alt="carry_logo" />
          </div>
          <div className={styles.welcome_text}>
            <h2>Welcome!</h2>
            <span>Please create an account</span>
          </div>

          <div className={styles.form_container}>
            <form onSubmit={handleSubmit} className="mt-4">
              <div
                className={`grid gap-3 md:grid-cols-2 ${styles.input_group}`}
              >
                <div className={styles.input_group_item}>
                  <label htmlFor="name" className="">
                    Name<span className={styles.reqField}> * </span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className={formErrors.name ? styles.error_border : ""}
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.input_group_item}>
                  <label htmlFor="surname" className="">
                    Surname<span className={styles.reqField}> * </span>
                  </label>
                  <input
                    type="text"
                    id="surname"
                    name="surname"
                    className={formErrors.surname ? styles.error_border : ""}
                    placeholder="Surname"
                    value={formData.surname}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div
                className={`grid gap-3 md:grid-cols-2 ${styles.input_group}`}
              >
                <div className={styles.input_group_item}>
                  <label htmlFor="birthday">
                    Birthday<span className={styles.reqField}> * </span>
                  </label>
                  <div className="relative">
                    <DatePicker
                      selected={formData.birthday}
                      onChange={handleDateChange}
                      dateFormat="dd/MM/yyyy"
                      placeholderText="Select your birthday"
                      className={`pl-10 ${
                        formErrors.birthday ? styles.error_border : ""
                      }`}
                    />
                    <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
                      <Image src={date_icon} alt="date_icon" />
                    </div>
                  </div>
                </div>
                <div className={styles.input_group_item}>
                  <label htmlFor="gender" className="">
                    Gender<span className={styles.reqField}> * </span>
                  </label>
                  <select
                    name="gender"
                    className={`${
                      formErrors.gender ? styles.error_border : ""
                    } form-select`}
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Gender
                    </option>
                    {Object.entries(gender).map(([key, value]) => (
                      <option key={value} value={value}>
                        {key}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div
                className={`grid gap-3  md:grid-cols-2 ${styles.input_group}`}
              >
                <div className={styles.input_group_item}>
                  <label htmlFor="email" className="">
                    Email<span className={styles.reqField}> * </span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={formErrors.email ? styles.error_border : ""}
                    placeholder="Enter"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.input_group_item}>
                  <label htmlFor="number" className="">
                    Phone Number<span className={styles.reqField}> * </span>
                  </label>
                  {/* <input
                    type="text"
                    id="number"
                    name="number"
                    className={formErrors.number ? styles.error_border : ""}
                    placeholder="Enter"
                    value={formData.number}
                    onChange={handleChange}
                  /> */}
                    <PhoneInput
              country="az"
              value={formData?.number || ""}
              onChange={handlePhoneChange}
      
              excludeCountries={["am"]}
            />
                </div>
              </div>

              <div
                className={`grid gap-3 md:grid-cols-2 ${styles.input_group}`}
              >
                <div className={styles.input_group_item}>
                  <label htmlFor="text" className="">
                    City<span className={styles.reqField}> * </span>
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    className={formErrors.city ? styles.error_border : ""}
                    placeholder="Enter"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.input_group_item}>
                  <label htmlFor="text" className="">
                    Country
                  </label>
                  <select
                    className={`${
                      formErrors.gender ? styles.error_border : ""
                    } form-select`}
                    onChange={handleChange}
                    id="country"
                    name="country"
                    value={formData.country}
                  >
                    <option value="0">Select country</option>
                    {countries.map((item, i) => (
                      <option value={item?.id} key={item?.id}>
                        {item?.name}
                      </option>
                    ))}
                  </select>
                  {/* <input
                  type="text"
                  id="country"
                  name="country"
              
                  placeholder="Enter"
                  value={formData.country}
                  onChange={handleChange}
                /> */}
                </div>
              </div>

              <div
                className={`grid gap-3  md:grid-cols-2 ${styles.input_group}`}
              >
                <div className={styles.input_group_item}>
                  <label htmlFor="password" className="">
                    Create password<span className={styles.reqField}> * </span>
                  </label>
                  <div className={styles.password_container}>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      className={formErrors.password ? styles.error_border : ""}
                      placeholder="Enter"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <span
                      className={styles.eye_icon}
                      onClick={togglePasswordVisibility}
                    >
                      <Image
                        src={showPassword ? eye : eye_icon}
                        alt={showPassword ? "Hide password" : "Show password"}
                      />
                    </span>
                  </div>
                </div>
                <div className={styles.input_group_item}>
                  <label htmlFor="confirmPassword" className="">
                    Confirm password<span className={styles.reqField}> * </span>
                  </label>
                  <div className={styles.password_container}>
                    <input
                      type={showPasswordConfirm ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      className={
                        formErrors.confirmPassword ? styles.error_border : ""
                      }
                      placeholder="Enter"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                    <span
                      className={styles.eye_icon}
                      onClick={togglePasswordConfirmVisibility}
                    >
                      <Image
                        src={showPasswordConfirm ? eye : eye_icon}
                        alt={
                          showPasswordConfirm
                            ? "Hide password"
                            : "Show password"
                        }
                      />
                    </span>
                  </div>
                </div>
              </div>

              <div
                className={`w-full flex gap-3 mb-3 items-center checkbox-wrapper `}
              >
                <input
                  type="checkbox"
                  name="terms"
                  id="terms"
                  checked={formData.terms}
                  onChange={handleChange}
                  className="checkbox"
                />
                <div
                  className={`checkbox-icon `}
                  onClick={() => {
                    const checkbox = document.getElementById(
                      "terms"
                    ) as HTMLInputElement;

                    if (checkbox) {
                      checkbox.checked = !checkbox.checked;

                      setFormData((prevData) => ({
                        ...prevData,
                        terms: checkbox.checked,
                      }));
                    }
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                  >
                    <path
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 12l5 5L20 7"
                    />
                  </svg>
                </div>
                <label htmlFor="terms">
                  I have read and agree to{" "}
                  <Link
                    href=""
                    className="text-[#45a8ff] font-medium md:text-lg"
                  >
                    terms of services
                  </Link>
                </label>
              </div>

              <div>
                <button
                  type="submit"
                  className={styles.signup_button}
                  disabled={loading}
                >
                  Sign Up
                </button>
              </div>
              <div className={styles.or_container}>
                <span></span>
                <p>Or with</p>
                <span></span>
              </div>
              {/* <button type="button" className={styles.google_button}>
            <LoginSocialGoogle
  client_id="650935634351-7mr5vjrtaarg7t4s9ogetopg0mfll6cu.apps.googleusercontent.com"
  scope="openid profile email"
  discoveryDocs="claims_supported"
  access_type="offline"
  onResolve={(provider: GoogleProviderData) => {
    loginByGoogle(provider?.data?.code);
  }}
  onReject={(error: string) => {
    console.log("error", error);
  }}
>
  <span className="px-2 font-bold" style={{ color: "#746bd4" }}>
    <Image src={google_icon} alt="Google Login" />
  </span>
</LoginSocialGoogle>
            </button> */}
            </form>
          </div>

          <div className={styles.signup_link}>
            <p>
              Already have an account? <Link href="/login">Sign In</Link>
            </p>
          </div>
        </div>

        <SuccessModal isOpen={toggle} />
      </section>
    </>
  );
}

export default SignUp;
