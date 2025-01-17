'use client'
import React, { useCallback, useEffect } from 'react';
import styles from "@/assets/css/forList/forList.module.css";
import Image from 'next/image';
import circle from "@/assets/img/info-circle.svg"
import moment from "moment";
import { MainSendListProps } from '@/types/type';



const MainSendList: React.FC<MainSendListProps> = ({ sends }) => {

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
      {sends.map((card, index) => (
        <article key={index} className={styles.list_card}  ref={(el) => {
          if (el instanceof HTMLDivElement) setPlaneDistance(el);
        }}>
       
       <div className='p-4'>
       <div className={styles.routeContainer}>
       
       <h3 className={`${styles.routeText} text-[#9166EF]`}>{card?.sendPlaceDetails[0]?.fromPlace}</h3>

       <div className={styles.lineContainer}>
         <span className={`${styles.line} bg-[#9166EF]`}></span>
         <span className={styles.plane}>✈️</span>
       </div>

       <h3 className={`${styles.routeText} text-[#9166EF]`}>{card?.sendPlaceDetails[0]?.toPlace}</h3>
     </div>

     <p className={styles.description}>{card.description}</p>

     <div className={styles.dates}>
       <p className='text-[#9166EF]'>
         <span className={styles.label}>Departure:</span>   {card.sendPlaceDetails[0]?.createDate &&
                  moment(card?.sendPlaceDetails[0]?.createDate).format(
                    "MM.DD.YYYY"
                  )}
       </p>
       <p className='text-[#9166EF]'>
         <span className={styles.label}>Arrival:</span>   {card.sendPlaceDetails[0]?.toTripDate &&
                  moment(card?.sendPlaceDetails[0]?.catchDate).format(
                    "MM.DD.YYYY"
                  )}
       </p>
     </div>

     <div className={styles.price}>
       <span>{card?.package?.price}</span>
     </div>
       </div>

          <div className={`${styles.applyDate} bg-[#9166EF]`}>
            <p className='flex gap-2'><Image src={circle} alt="circle"/> Last date to apply: {card.sendPlaceDetails[0]?.toTripDate &&
                  moment(card?.sendPlaceDetails[0]?.catchDate).format(
                    "MM.DD.YYYY"
                  )}</p>
          </div>
        </article>
      ))}
    </section>
  );
}

export default MainSendList;
