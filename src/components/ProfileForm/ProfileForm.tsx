"use client";
import React, { useEffect, useState } from "react";
import styles from "@/assets/css/profile/profileForm.module.css";
import { mapGenderType } from "@/utils/enumsToData";
import { gender } from "@/json/constant";
import toast from "react-hot-toast";
import { getApiWithToken, putApi } from "@/services/api";
// import { useMask } from "@react-input/mask";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useTranslations } from "next-intl";

interface User {
  id: string;
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  countryId: string;
  countryName: string;
  city: string;
  address: string;
  gender: number;
  // whatsapp: string;
  // instagram: string;
  photo: string;
}

interface Country {
  id: number;
  name: string;
}

interface ProfileFormProps {
  profilePhoto: string;
  setProfilePhoto: React.Dispatch<React.SetStateAction<any>>;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  profilePhoto,
  setProfilePhoto,
}) => {
  const [user, setUser] = useState<User>({
    id: "",
    name: "",
    surname: "",
    email: "",
    phoneNumber: "",
    countryId: "",
    countryName: "",
    city: "",
    address: "",
    gender: 0,
    // whatsapp: '',
    // instagram: '',
    photo: "",
  });

  // const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL

  const [formErrors, setFormErrors] = useState<{
    name: boolean;
    surname: boolean;
    email: boolean;
    phoneNumber: boolean;
    country: boolean;
    city: boolean;
    // gender: boolean;
    // whatsapp: boolean,
    // instagram: boolean,
    photo: boolean;
  }>({
    name: false,
    surname: false,
    email: false,
    phoneNumber: false,
    country: false,
    city: false,
    // gender: false,
    // whatsapp: false,
    // instagram: false,
    photo: false,
  });

  const [countries, setCountries] = useState<Country[]>([]);
  const t = useTranslations("Static");
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    // storedUser.gender = mapGenderType(storedUser.gender);
    const accessToken = localStorage.getItem("accessToken");

    const fetchCountries = async () => {
      try {
        const res = await getApiWithToken("Country/AllCountries", accessToken);
        if (res?.success) {
          setCountries(res.list || []);
        } else {
          toast.error(t("failedLoadCountries"));
        }
      } catch (error) {
        console.error("Error fetching countries:", error);
        toast.error(t("errorFetchingCountryData"));
      }
    };

    fetchCountries();

    setUser({
      ...storedUser,
      phoneNumber: storedUser.phoneNumber || "",
      countryId: storedUser?.country?.id || "0",
      countryName: storedUser?.country?.name || "",
    });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));

    if (name === "gender") {
      setUser((prevData) => ({
        ...prevData,
        [name]: Number(value),
      }));
    }

    setFormErrors((prev) => ({ ...prev, [name]: !value.trim() }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setUser((prevUser) => ({
        ...prevUser,
        photo: (reader.result as string).split(",")[1],
      }));
      setProfilePhoto(reader?.result);
    };
    reader.onerror = (error) => {
      console.error("File reading error:", error);
    };
  };

  const handleCancel = () => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

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
      // whatsapp: false,
      // instagram: false,
      photo: false,
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
      country: (user.countryId || "").trim() === "",
      city: (user.city || "").trim() === "",
      // whatsapp: (user.whatsapp || "").trim() === "",
      // instagram: (user.instagram || "").trim() === "",
      photo: (user.photo || "").trim() === "",
    };

    setFormErrors(errors);

    if (Object.values(errors).some((error) => error)) {
      return; // Prevent API request
    }

    try {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        throw new Error(`${t("accessTokenMissing")}`);
      }

      const userId = user.id;
      const payload = {
        id: userId,
        name: user.name,
        // email: user.email,
        surname: user.surname,
        gender: user.gender,
        // birthDate: '05.12.2003',
        phoneNumber: user.phoneNumber,
        countryId: user.countryId,
        city: user.city,
        photo: user.photo,
        adrress: user?.address,
      };
      const res = await putApi(`User/UserUpdate`, payload, accessToken);

      if (res.errors && res?.errors.length > 0) {
        res.errors.forEach((error: string) => {
          toast.error(error);
        });
        return;
      }

      if (res?.success) {
        setUser({
          id: "",
          name: "",
          surname: "",
          email: "",
          phoneNumber: "",
          countryId: "",
          countryName: "",
          city: "",
          gender: 0,
          address: "",
          // whatsapp: '',
          // instagram: '',
          photo: "",
        });

        let userObj = res?.list[0];
        localStorage.setItem("user", JSON.stringify(userObj));
        window.location.reload();
        toast.success(t("userUpdated"));
      }
    } catch (error: unknown) {
      console.error("Error updating password:", error);

      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error(t("unknownError"));
      }
    }
  };
  const handlePhoneChange = (value: string) => {
    setUser((prev) => ({
      ...prev,
      phoneNumber: value,
    }));
  };

  return (
    <div className={styles.mainContent}>
      <form onSubmit={handleSave}>
        <div className={`grid gap-3 md:grid-cols-3 ${styles.input_group}`}>
          <div className={styles.input_group_item}>
            <label>{t("name")}</label>
            <input
              name="name"
              placeholder={t("name")}
              onChange={handleChange}
              type="text"
              value={user?.name || ""}
              className={formErrors.name ? styles.error_border : ""}
            />
          </div>
          <div className={styles.input_group_item}>
            <label>{t("surname")}</label>
            <input
              name="surname"
              placeholder={t("surname")}
              onChange={handleChange}
              type="text"
              value={user?.surname || ""}
              className={formErrors.surname ? styles.error_border : ""}
            />
          </div>
          <div className={styles.input_group_item}>
            <label>{t("email")}</label>
            <input
              name="email"
              placeholder={t("email")}
              onChange={handleChange}
              type="email"
              value={user?.email || ""}
              className={formErrors.email ? styles.error_border : ""}
            />
          </div>
        </div>
        <div className={`grid gap-3 md:grid-cols-4 ${styles.input_group}`}>
          <div className={styles.input_group_item}>
            <label>{t("phone number")}</label>
            <PhoneInput
              country="AZ"
              value={user?.phoneNumber || ""}
              onChange={handlePhoneChange}
              excludeCountries={["am"]}
            />
          </div>

          <div className={styles.input_group_item}>
            <label htmlFor="gender" className="">
              <label htmlFor="gender">{t("gender")}</label>
            </label>
            <select
              name="gender"
              value={user?.gender}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">{t("selectGender")}</option>

              <option value={user?.gender}>
                {mapGenderType(user?.gender)}
              </option>

              {Object.entries(gender).map(([key, value]) => {
                return value != user?.gender ? (
                  <option key={value} value={value}>
                    {key}
                  </option>
                ) : null;
              })}
            </select>
          </div>
          <div className={styles.input_group_item}>
            <label>{t("country")}</label>
            <select
              name="countryId"
              value={user?.countryId || "0"}
              onChange={handleChange}
              className="form-select"
            >
              <option value="0">{t("selectCountry")}</option>
              {countries?.map((c) => (
                <option key={c?.id} value={c?.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.input_group_item}>
            <label>{t("city")}</label>
            <input
              name="city"
              placeholder={t("city")}
              onChange={handleChange}
              type="text"
              value={user?.city || ""}
              className={formErrors.city ? styles.error_border : ""}
            />
          </div>
        </div>

        <div className={`grid gap-3 md:grid-cols-3 ${styles.row}`}>
          <div className={styles.input_group_item}>
            <label>{t("address")}</label>
            <input
              name="address"
              placeholder={t("address")}
              onChange={handleChange}
              type="text"
              value={user?.address || ""}
            />
          </div>
          <div className={styles.input_group_item}>
            <label>{t("changePhoto")}</label>
            <label htmlFor="photo-upload" className={styles.customFileButton}>
              {t("selectImage")}
            </label>
            <input
              id="photo-upload"
              name="photo"
              accept="image/*"
              onChange={handleFileUpload}
              type="file"
              className={`${styles.fileInput} ${
                formErrors.photo ? styles.errorBorder : ""
              }`}
            />
          </div>
        </div>
        <div className={styles.buttonGroup}>
          <button
            onClick={handleCancel}
            type="button"
            className={styles.cancelBtn}
          >
            {t("Cancel")}
          </button>
          <button type="submit" className={styles.saveBtn}>
            {t("save")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
