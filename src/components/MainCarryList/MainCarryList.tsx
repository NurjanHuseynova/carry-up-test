import React, { useEffect, useCallback } from "react";
import styles from "@/assets/css/forList/forList.module.css";
import Image from "next/image";
import circle from "@/assets/img/info-circle.svg";
import moment from "moment";
import { MainCarryListProps } from "@/types/type";

const MainCarryList: React.FC<MainCarryListProps> = ({ trips }) => {

  const setPlaneDistance = useCallback((cardRef: HTMLElement | null) => {
    if (!cardRef || !(cardRef instanceof HTMLDivElement)) return; 
    const lineElement = cardRef.querySelector(`.${styles.line}`) as HTMLElement | null;
    const planeElement = cardRef.querySelector(`.${styles.plane}`) as HTMLElement | null;

    if (lineElement && planeElement) {
      const lineWidth = lineElement.offsetWidth;
      cardRef.style.setProperty("--plane-distance", `${lineWidth}px`);
    }
  }, []);

  useEffect(() => {
    const cards = Array.from(document.querySelectorAll(`.${styles.list_card}`));

    const updateDistances = () => {
      cards.forEach((card) => {
        if (card instanceof HTMLDivElement) {
          setPlaneDistance(card);
        }
      });
    };

    updateDistances(); 
    window.addEventListener("resize", updateDistances);

    return () => {
      window.removeEventListener("resize", updateDistances);
    };
  }, [setPlaneDistance]);

  return (
    <section className={styles.gridContainer}>
      {trips?.map((card, index) => (
        <article
          key={index}
          className={styles.list_card}
          ref={(el) => {
            if (el instanceof HTMLDivElement) setPlaneDistance(el);
          }}
        >
          <div className="p-4">
            <div className={styles.routeContainer}>
              <h3 className={`${styles.routeText} text-[#5fa0ee]`}>
                {card?.tripPlaceDetails?.[0]?.fromPlace || "N/A"}
              </h3>
              <div className={styles.lineContainer}>
                <span className={`${styles.line} bg-[#5fa0ee]`}></span>
                <span className={styles.plane}>✈️</span>
              </div>
              <h3 className={`${styles.routeText} text-[#5fa0ee]`}>
                {card?.tripPlaceDetails?.[0]?.toPlace || "N/A"}
              </h3>
            </div>

            <p className={styles.description}>{card?.title || "No description available."}</p>

            <div className={styles.dates}>
              <p className="text-[#5fa0ee]">
                <span className={styles.label}>Departure:</span>{" "}
                {card?.tripPlaceDetails?.[0]?.createDate
                  ? moment(card.tripPlaceDetails[0].createDate).format("DD.MM.YYYY")
                  : "N/A"}
              </p>
              <p className="text-[#5fa0ee]">
                <span className={styles.label}>Arrival:</span>{" "}
                {card?.tripPlaceDetails?.[0]?.toTripDate
                  ? moment(card.tripPlaceDetails[0].toTripDate).format("DD.MM.YYYY")
                  : "N/A"}
              </p>
            </div>

            <div className={styles.price}>
              <span>{card?.package?.price || "Price not available"}</span>
            </div>
          </div>

          <div className={`${styles.applyDate} bg-[#5fa0ee]`}>
            <p className="flex gap-2">
              <Image src={circle} alt="circle" /> Last date to apply:{" "}
              {card?.tripPlaceDetails?.[0]?.toTripDate
                ? moment(card.tripPlaceDetails[0].toTripDate).format("DD.MM.YYYY")
                : "N/A"}
            </p>
          </div>
        </article>
      ))}
    </section>
  );
};

export default MainCarryList;
