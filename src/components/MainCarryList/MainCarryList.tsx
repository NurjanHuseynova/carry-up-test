import React, { useState } from "react";
import styles from "@/assets/css/forList/forList.module.css";
import Image from "next/image";
import circle from "@/assets/img/info-circle.svg";
import moment from "moment";
import { MainCarryListProps } from "@/types/type";
import ship from "@/assets/img/ship.svg";
import bus from "@/assets/img/bus.svg";
import train from "@/assets/img/train.svg";
import plane from "@/assets/img/plane.svg";
import car from "@/assets/img/car.svg";
import CarryModal from "../Modal/CarryModal";
import { fetchApi } from "@/services/api";
import distance from "@/assets/img/distance.png";
import dollar from "@/assets/img/dollar.svg";

import { travelType } from "@/json/constant";

const MainCarryList: React.FC<MainCarryListProps> = ({
  trips,
  loading,
  setLoading,
}) => {
  const [modal, setModal] = useState(false);
  const [detailList, setDetailList] = useState({});
  const [selectedId, setSelectedId] = useState("");

  const toggle = () => {
    if (selectedId) {
      setModal(!modal);

      setDetailList({});
      setLoading(true);
      getById(selectedId);
    }
  };

  const getById = async (id: string) => {
    try {
      setLoading(true);
      const res = await fetchApi(`Trip/GetById/${id}`);

      if (res?.value) {
        setDetailList(res.value);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);

      console.log("error", error);
    }
  };

  return (
    <>
      <section className={`grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-5`}>
        {loading && (
          <div
            role="status "
            className="absolute left-[46%] md:left-[59%] top-[50%]"
          >
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
        )}
        {trips?.map((card, index) => (
          <article
            key={index}
            className={styles.list_card}
            onClick={() => {
              setSelectedId(card?.id);
              toggle();
            }}
          >
            <div className="p-3">
              <div className={styles.routeContainer}>
                <h3 className={`${styles.routeText} text-[#5fa0ee]`}>
                  {card?.tripPlaceDetails?.[0]?.fromPlace?.slice(0, 5) || ""}
                </h3>
                <div className={styles.lineContainer}>
                  <span className={`${styles.line} bg-[#5fa0ee]`}></span>
                  <span className={styles.plane}>
                    {card?.tripPlaceDetails?.[0]?.travelType == 0 ? (
                      <Image src={bus} alt="bus" width={40} />
                    ) : card?.tripPlaceDetails?.[0]?.travelType == 1 ? (
                      <Image src={plane} alt="plane" width={40} />
                    ) : card?.tripPlaceDetails?.[0]?.travelType == 2 ? (
                      <Image src={car} alt="car" width={40} />
                    ) : card?.tripPlaceDetails?.[0]?.travelType == 3 ? (
                      <Image src={ship} alt="ship" width={32} />
                    ) : card?.tripPlaceDetails?.[0]?.travelType == 4 ? (
                      <Image src={train} alt="train" width={40} />
                    ) : null}
                  </span>
                </div>
                <h3 className={`${styles.routeText} text-[#5fa0ee]`}>
                  {card?.tripPlaceDetails?.[0]?.toPlace?.slice(0, 5) || ""}
                </h3>
                <div className="distanceBox ">
                  <div>
                    {card?.tripPlaceDetails.length > 1 && (
                      <Image
                        src={distance}
                        className="bg-[#3C87E0] p-1 rounded ml-3 "
                        width={30}
                        height={10}
                        alt="distance"
                        priority={true}
                      />
                    )}
                  </div>

                  <div>
                    {card?.tripPlaceDetails.length > 1 && (
                      <div className="max-h-28 h-28 distanceScroll py-2 px-3 max-w-[325px] border border-solid border-[#b532ff75] absolute left-[33%] w-[315px] top-[31px] z-10 rounded-xl bg-white distance">
                        {card.tripPlaceDetails.length > 1 &&
                          card.tripPlaceDetails.slice(1).map((v, i) => (
                            <>
                              <div className="flex justify-between" key={i}>
                                <div className="text-[#6B6890] font-semibold">
                                  {v.fromPlace} <br />
                                  <span className="text-[#292D32A6] italic text-[14px] font-normal">
                                    {moment(v.toTripDate).format("DD.MM.YYYY")}
                                  </span>
                                </div>
                                <div className="flex justify-between m-1">
                                  <div className="mx-2">
                                    {v?.travelType == travelType.Plane ? (
                                      <>
                                        <Image
                                          src={plane}
                                          className="  "
                                          width={30}
                                          height={20}
                                          alt="Carry UP"
                                          priority={true}
                                        />{" "}
                                      </>
                                    ) : v?.travelType == travelType.Bus ? (
                                      <>
                                        <Image
                                          src={bus}
                                          className=" "
                                          width={30}
                                          height={20}
                                          alt="Carry UP"
                                          priority={true}
                                        />{" "}
                                      </>
                                    ) : v?.travelType == travelType.Car ? (
                                      <>
                                        <Image
                                          src={car}
                                          className="  "
                                          width={30}
                                          height={20}
                                          alt="Carry UP"
                                          priority={true}
                                        />{" "}
                                      </>
                                    ) : v?.travelType == travelType.Ship ? (
                                      <>
                                        <Image
                                          src={ship}
                                          width={30}
                                          height={20}
                                          alt="Carry UP"
                                          priority={true}
                                        />{" "}
                                      </>
                                    ) : v?.travelType == travelType.Train ? (
                                      <>
                                        <Image
                                          src={train}
                                          width={25}
                                          height={20}
                                          alt="Carry UP"
                                          priority={true}
                                        />
                                      </>
                                    ) : null}
                                    <span className="block h-[1px] w-28 bg-[#5DA7FF]"></span>
                                  </div>
                                </div>
                                <div className="text-[#6B6890] font-semibold">
                                  {v.toPlace} <br />
                                  <span className="text-[#292D32A6] italic text-[14px] font-normal">
                                    {moment(v.fromTripDate).format(
                                      "DD.MM.YYYY"
                                    )}
                                  </span>
                                </div>
                              </div>
                            </>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <p className={styles.description}>
                {card?.description.length > 40
                  ? `${card?.description.slice(0, 40)}...`
                  : card?.description}
                {card?.description.length > 40 && (
                  <span className={styles.fullTitle}>{card?.description}</span>
                )}
              </p>

              <div className="flex justify-between">
                <div className={styles.dates}>
                  <p className="text-[#5fa0ee]">
                    <span className={styles.label}>Departure:</span>{" "}
                    {card?.tripPlaceDetails?.[0]?.createDate
                      ? moment(card.tripPlaceDetails[0].createDate).format(
                          "DD.MM.YYYY"
                        )
                      : ""}
                  </p>
                  <p className="text-[#5fa0ee]">
                    <span className={styles.label}>Arrival:</span>{" "}
                    {card?.tripPlaceDetails?.[0]?.toTripDate
                      ? moment(card.tripPlaceDetails[0].toTripDate).format(
                          "DD.MM.YYYY"
                        )
                      : ""}
                  </p>
                </div>

                <div className={styles.price}>
                  <span className="flex items-start">
                    {card?.package?.currency == 1 ? (
                      <Image src={dollar} alt="" />
                    ) : card?.package?.currency == 0 ? (
                      <Image src={dollar} alt="" />
                    ) : null}{" "}
                    {card?.package?.price}
                  </span>
                </div>
              </div>
            </div>

            <div className={`${styles.applyDate} bg-[#5fa0ee]`}>
              <p className="flex gap-2 italic">
                <Image src={circle} alt="circle" /> Last date to apply:{" "}
                {card?.tripPlaceDetails?.[0]?.toTripDate
                  ? moment(card.tripPlaceDetails[0].toTripDate).format(
                      "DD.MM.YYYY"
                    )
                  : ""}
              </p>
            </div>
          </article>
        ))}

        {modal && (
          <CarryModal
            toggle={toggle}
            isOpen={modal}
            setModal={setModal}
            loading={loading}
            detailList={detailList}
          />
        )}
      </section>
    </>
  );
};

export default MainCarryList;
