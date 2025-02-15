"use client";
import React, { useState, useEffect, FormEvent, ChangeEvent, use } from "react";
import CarrySidebar from "@/components/CarrySidebar/CarrySidebar";
import SendSidebar from "@/components/SendSidebar/SendSidebar";
import MainCarryList from "@/components/MainCarryList/MainCarryList";
import MainSendList from "@/components/MainSendList/MainSendList";
import styles from "@/assets/css/main/main.module.css";

import { postApi } from "@/services/api";
import Pagination from "@/components/Pagination/Pagination";
import { FormData, SendFormData } from "@/types/type";

const MainPage: React.FC = () => {
  let tripPerPage = 6;
  let sendPerPage = 6;

  const [activeTab, setActiveTab] = useState("carry");
  const [trips, setTrips] = useState([]);
  const [sends, setSends] = useState([]);

  const [tripCurrentPage, setTripCurrentPage] = useState(1);
  const [totalTrips, setTotalTrips] = useState(0);
  const [sendCurrentPage, setSendCurrentPage] = useState(1);
  const [tripLoading,setTripLoading] = useState(false);
  const [sendLoading,setSendLoading] = useState(false);

  const [totalSends, setTotalSends] = useState(0);
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
    currency: "",
  });

  const [sendFormData, setSendFormData] = useState<SendFormData>({
    createDate: "",
    title: "",
    minPrice: "",
    maxPrice: "",
    category: "",
    fromPlace: "",
    toPlace: "",
    currency: "",
    catchDate:"",
  });

  useEffect(() => {
    fetchTrips(tripCurrentPage);
  }, [tripCurrentPage]);

  const fetchTrips = async (currentPage: number) => {
    const filter = {
      pageSize: tripPerPage,
      currentPage: currentPage,
      value: {
        tripCreateDate: formData.createDate || "",
        tripTitle: formData.title || "",
        tripPlaceDetailTravelTypes: formData.travelType
          ? [Number(formData.travelType)]
          : [],
        minPackagePrice: formData.minPrice || "",
        maxPackagePrice: formData.maxPrice || "",
        currency: formData.currency || "",
        packageCategoryId: formData.category || "",
        tripPlaceDetailFromPlace: formData.fromPlace || "",
        tripPlaceDetailToPlace: formData.toPlace || "",
        tripPlaceDetailFromTripDate: formData.fromTripDate || "",
        tripPlaceDetailToTripDate: formData.toTripDate || "",
        packageSubCategoryId: "",
      },
    };
    try {
      setTripLoading(true)
      const response = await postApi("Trip/GetTrips", filter);

      if (response?.list) {
        setTrips(response.list);
        setTotalTrips(response.totalCount);
      }
      setTripLoading(false)

    } catch (error) {
      setTripLoading(false)

      console.error("Error fetching trips:", error);
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePageChange = (page: number) => {
    setTripCurrentPage(page);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
  };

  const clearForm = () => {
    setFormData({
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
      currency: "",
    });
  };

  const totalPages = Math.ceil(totalTrips / tripPerPage);
  const totalSendPages = Math.ceil(totalSends / sendPerPage);

  ///send data

  const fetchSends = async (currentPage: number) => {
    const filter = {
      pageSize: sendPerPage,
      currentPage: currentPage,
      value: {
        sendCreateDate: sendFormData.createDate || "",
        sendTitle: sendFormData.title || "",

        minPackagePrice: sendFormData.minPrice || "",
        maxPackagePrice: sendFormData.maxPrice || "",
        currency: sendFormData.currency || "",
        packageCategoryId: sendFormData.category || "",
        sendPlaceDetailFromPlace: sendFormData.fromPlace || "",
        sendPlaceDetailToPlace: sendFormData.toPlace || "",
        catchDate: sendFormData.catchDate || "",
        packageSubCategoryId: "",
      },
    };
    try {
      setSendLoading(true)
      const response = await postApi("Send/GetSends", filter);

      if (response?.list) {
        setSends(response.list);
        setTotalSends(response.totalCount);
      }
      setSendLoading(false)

    } catch (error) {
      setSendLoading(false)

      console.error("Error fetching trips:", error);
    }
  };

  useEffect(() => {
    fetchSends(sendCurrentPage);
  }, [sendCurrentPage]);

  const sendHandleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setSendFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const sendHandlePageChange = (page: number) => {
    setSendCurrentPage(page);
  };

  const sendHandleSubmit = async (e: FormEvent) => {
    e.preventDefault();
  };

  const sendClearForm = () => {
    setSendFormData({
      createDate: "",
      title: "",
      minPrice: "",
      maxPrice: "",
      category: "",
      fromPlace: "",
      toPlace: "",
      currency: "",
      catchDate:"",
    });
  };

  return (
    <section className={`custom_container flex md:flex-row flex-col ${styles.main_container}`}>
      <article
        className={`col-span-1 distanceScroll ${styles.left_section} w-full md:w-[17rem]`}
      >
        <div className={styles.top_button}>
          <button
            className={`${styles.tab_button} ${
              activeTab === "carry" ? styles.active_tab_button : ""
            }`}
            onClick={() => setActiveTab("carry")}
          >
            For Carry
          </button>
          <button
            className={`${styles.tab_button} ${
              activeTab === "send" ? styles.carry_tab_button : ""
            }`}
            onClick={() => setActiveTab("send")}
          >
            For Send
          </button>
        </div>

        {activeTab === "carry" && (
          <CarrySidebar
            handleSubmit={handleSubmit}
            handleInputChange={handleInputChange}
            formData={formData}
            fetchTrips={fetchTrips}
            setFormData={setFormData}
            clearForm={clearForm}
            tripCurrentPage={tripCurrentPage}
            
          />
        )}
        {activeTab === "send" && (
          <SendSidebar
            handleSubmit={sendHandleSubmit}
            handleInputChange={sendHandleInputChange}
            sendFormData={sendFormData}
            fetchSends={fetchSends}
            setSendFormData={setSendFormData}
            sendClearForm={sendClearForm}
            sendCurrentPage={sendCurrentPage}
          />
        )}
      </article>

      <article className={`col-span-2 ${styles.right_section} `}>
        {activeTab === "carry" && <MainCarryList trips={trips} loading={tripLoading} setLoading={setTripLoading} />}
        {activeTab === "send" && <MainSendList sends={sends} loading={sendLoading}/>}

        {activeTab === "carry" && trips?.length > 0 && (
          <Pagination
            currentPage={tripCurrentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            activetab={activeTab}

          />
        )}

        {activeTab === "send" && sends?.length > 0 && (
          <Pagination
            currentPage={sendCurrentPage}
            totalPages={totalSendPages}
            activetab={activeTab}
            onPageChange={sendHandlePageChange}
          />
        )}
      </article>
    </section>
  );
};

export default MainPage;
