import React, { useState } from "react";
import styles from "@/assets/css/forList/forList.module.css";
import Image from "next/image";
import circle from "@/assets/img/info-circle.svg";
import moment from "moment";
import { MainCarryListProps } from "@/types/type";
import ship from "@/assets/img/ship.svg";
import bus from "@/assets/img/ship.svg";
import train from "@/assets/img/ship.svg";
import plane from "@/assets/img/plane.svg";
import car from "@/assets/img/ship.svg";

const MainCarryList: React.FC<MainCarryListProps> = ({ trips,loading }) => {
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (trip: any) => {
    setSelectedTrip(trip);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTrip(null);
    setIsModalOpen(false);
  };

  
  return (
 <>

    <section className={styles.gridContainer}>
    {loading && (
            <div role="status " className="absolute left-[59%] top-[50%]">
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
        <article key={index} className={styles.list_card} onClick={() => openModal(card)}>
          <div className="p-4">
            <div className={styles.routeContainer}>
              <h3 className={`${styles.routeText} text-[#5fa0ee]`}>
                {card?.tripPlaceDetails?.[0]?.fromPlace?.slice(0, 4) || ""}
              </h3>
              <div className={styles.lineContainer}>
                <span className={`${styles.line} bg-[#5fa0ee]`}></span>
                <span className={styles.plane}>
                  {card?.tripPlaceDetails?.[0]?.travelType == 0 ? (
                    <Image src={bus} alt="bus" />
                  ) : card?.tripPlaceDetails?.[0]?.travelType == 1 ? (
                    <Image src={plane} alt="plane" />
                  ) : card?.tripPlaceDetails?.[0]?.travelType == 2 ? (
                    <Image src={car} alt="car" />
                  ) : card?.tripPlaceDetails?.[0]?.travelType == 3 ? (
                    <Image src={ship} alt="ship" />
                  ) : card?.tripPlaceDetails?.[0]?.travelType == 4 ? (
                    <Image src={train} alt="train" />
                  ) : null}
                </span>
              </div>
              <h3 className={`${styles.routeText} text-[#5fa0ee]`}>
                {card?.tripPlaceDetails?.[0]?.toPlace?.slice(0, 4) || ""}
              </h3>
            </div>

            <p className={styles.description.slice(0, 40)}>{card?.title}</p>

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
                <span>{card?.package?.price}</span>
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

{isModalOpen && selectedTrip && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold">{}</h2>
            <p>Details about the trip...</p>
            <button onClick={closeModal} className="mt-4 text-blue-500">
              Close
            </button>
          </div>
        </div>
      )}
       
    </section>
 </>
  );
};

export default MainCarryList;
