import React, { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import "@/assets/css/modal/modal.css";
import Image from "next/image";
import carry_title from "@/assets/img/carry_title.svg";
import carry_contact from "@/assets/img/carry_contact.svg";
import carry_date from "@/assets/img/carry_date.svg";
import carry_document from "@/assets/img/carry_document.svg";
import carry_email from "@/assets/img/carry_email.svg";
import carry_from from "@/assets/img/carry_from.svg";
import carry_to from "@/assets/img/break_in.svg";
import carry_hand from "@/assets/img/carry_hand.svg";
import carry_name from "@/assets/img/carry_name.svg";
import carry_price from "@/assets/img/carry_price.svg";
import carry_pub_date from "@/assets/img/carry_pub_date.svg";
import point from "@/assets/img/point.svg";
import CommentModal from "./CommentModal";
import AllSeeModal from "./AllSeeModal";
import heart from "@/assets/img/heart.svg";
import whatsapp from "@/assets/img/whatsapp.svg";
import instagram from "@/assets/img/instagram.svg";
import global from "@/assets/img/global.svg";
import moment from "moment";
import top_arrow from "@/assets/img/top_arrow.svg";
import ship from "@/assets/img/ship.svg";
import bus from "@/assets/img/bus.svg";
import train from "@/assets/img/train.svg";
import plane from "@/assets/img/plane.svg";
import car from "@/assets/img/car.svg";
import { fetchApi } from "@/services/api";
import distance from "@/assets/img/distance.png";
import line from "@/assets/img/lines.png";
import arrow from "@/assets/img/downarrow.png";
import dollar from "@/assets/img/dollar.svg";
import manat from "@/assets/img/dollar.svg";
import { travelType } from "@/json/constant";

interface CarryModalProps {
  toggle: () => void;
  isOpen: boolean;
  loading?:boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  detailList: {
    title?: string;
    package?: {
      price?: number;
      count?: number;
      deadline: string;
    };
    case?: {
      id: string;
      user?: {
        id: string;
        email: string;
        pointsForFromUser: {
          value: number;
          description: string;
          createdDate: string;
          point: number;
        }[];
        name: string;
        surname: string;
        point: number;
        phoneNumber: string;
      };
    };
    tripPlaceDetails?: {
      fromPlace?: string;
      toPlace?: string;
      toTripDate: string;
      fromTripDate: string;
      travelType: {};
    }[];
    pointsForFromUser?: {
      value: number;
      description: string;
    }[];
    createDate?: string | Date;
    endDate?: string | Date;
    description?: string;
  };
}

function CarryModal({ toggle, isOpen, detailList, setModal ,loading}: CarryModalProps) {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : null;

    console.log('user',user?.id);
    

  const [commentModal, setCommentModal] = useState(false);
  const [allSeeModal, setAllSeeModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [breakToggle, setBreakToggle] = useState(false);

  const toggleTooltip = () => {
    setBreakToggle(!breakToggle);
  };

  useEffect(() => {
    if (detailList) {
      setIsLoading(false);
    }
  }, [detailList]);

  const commentModalToggle = () => {
    setCommentModal(!commentModal);
  };

  const allSeeModalToggle = () => {
    setAllSeeModal(!allSeeModal);
  };

  useEffect(() => {
    if (!isOpen) {
      setIsLoading(true);
    }
  }, [isOpen]);

  console.log('de',detailList);
  
  

  return (
    <>
      
      <Modal
        isOpen={isOpen}
        toggle={toggle}
        centered
        size="xl"
        fullscreen={"xl"}
        className="modal-container"
      >
        <ModalHeader toggle={() => setModal(!isOpen)}>
          <div className="flex w-full justify-between items-center">
            <h3>For Carry details</h3>
            <div className="flex gap-3">
              <button className="add_comment mr-3">Chat us</button>
            </div>
          </div>
        </ModalHeader>
        <ModalBody className={`${loading ? "h-96" : "h-auto"}`}>
        {loading ?
          <div role="status " className="absolute  left-[50%] top-[50%]">
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
        :   <div className="carry-modal-container">
        <div className="carry-left">
          <div className="flex flex-col gap-3 md:gap-7">
            <div className="carry-header">
              <div className="flex items-center gap-3">
                <span className="carry_icon">
                  <Image
                    src={carry_title}
                    alt="carry_title"
                    width={32}
                    height={26}
                  />
                </span>
                <h2>{detailList?.title}</h2>
              </div>
              <div className="flex items-center gap-2">
                <span className="price-tag">
                  ${detailList?.package?.price}
                </span>
                <span className="">
                  <Image src={heart} alt="" width={32} height={26} />
                </span>
              </div>
            </div>

            <div className="details-section">
              <h3>Details</h3>
              <div className="details-grid">
                <div className="flex gap-[20px] md:gap-11 flex-col justify-between">
                  <div className="flex gap-3 items-center md:gap-4">
                    <span className="carry_icon">
                      <Image
                        src={carry_from}
                        alt=""
                        width={32}
                        height={26}
                      />
                    </span>
                    <div>
                      <p>{detailList?.tripPlaceDetails?.[0]?.fromPlace} </p>
                      <span className="label">From</span>
                      <br />

                      <span className="text-[14px] text-[#505050]">
                        {moment(
                          detailList?.tripPlaceDetails?.[0]?.fromTripDate
                        ).format("DD.MM.YYYY")}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-3 items-center md:gap-4">
                    <span className="carry_icon">
                      <Image src={carry_to} alt="" width={32} height={26} />
                    </span>
                    <div className="relative ">
                      {detailList?.tripPlaceDetails?.length === 1 ? (
                        <>
                          <p>
                            {detailList?.tripPlaceDetails?.[0]?.toPlace}{" "}
                          </p>
                          <span className="label">To</span> <br />
                          <span className="text-[14px] text-[#505050]">
                            {moment(
                              detailList?.tripPlaceDetails?.[0]?.toTripDate
                            ).format("DD.MM.YYYY")}
                          </span>
                        </>
                      ) : (
                        <button
                          onClick={toggleTooltip}
                          className="break_in_button"
                        >
                          Break in
                        </button>
                      )}
                      {breakToggle && (
                        <div className="relative">
                          <Image
                            src={top_arrow}
                            alt=""
                            className="absolute left-[46%] top-0 z-10"
                          />
                          <div className="border distanceScroll border-solid !border-[#007AFF] absolute  top-0 -left-[74px] mt-2 w-72 bg-white rounded-lg shadow-lg px-3 py-2 ">
                            {detailList?.tripPlaceDetails?.map((v, i) => (
                              <>
                                <div
                                  className="flex justify-between "
                                  key={i}
                                >
                                  <div className="text-[#6B6890] font-semibold">
                                    {v.fromPlace} <br />
                                    <span className="text-[#292D32A6] italic text-[14px] font-normal">
                                      {moment(v.toTripDate).format(
                                        "DD.MM.YYYY"
                                      )}
                                    </span>
                                  </div>
                                  <div className="flex justify-between m-1 items-start">
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
                                      ) : v?.travelType ==
                                        travelType.Bus ? (
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
                                      ) : v?.travelType ==
                                        travelType.Car ? (
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
                                      ) : v?.travelType ==
                                        travelType.Ship ? (
                                        <>
                                          <Image
                                            src={ship}
                                            width={30}
                                            height={20}
                                            alt="Carry UP"
                                            priority={true}
                                          />{" "}
                                        </>
                                      ) : v?.travelType ==
                                        travelType.Train ? (
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

                                      <span className="block h-[1px] w-16 bg-[#5DA7FF]"></span>
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
                        </div>

                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-[20px] md:gap-11 flex-col justify-between">
                  <div className="flex gap-3 md:gap-4 items-center">
                    <span className="carry_icon">
                      <Image
                        src={carry_document}
                        alt=""
                        width={32}
                        height={26}
                      />
                    </span>
                    <div>
                      <p>{detailList?.package?.count}</p>
                      <span className="label">Count of documents</span>
                    </div>
                  </div>
                  <div className="flex gap-3 items-center md:gap-4">
                    <span className="carry_icon">
                      <Image
                        src={carry_price}
                        alt=""
                        width={32}
                        height={26}
                      />
                    </span>
                    <div>
                      <p> {detailList?.package?.price} USD</p>
                      <span className="label">Price</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="contact-info">
            <div className="flex flex-col gap-4">
              <div className="flex gap-3 md:gap-5 items-center">
                <span className="carry_icon">
                  <Image src={carry_name} alt="" width={32} height={26} />
                </span>
                <div className="w-3/4">
                  <p className="flex justify-between">
                    {detailList?.case?.user?.name}{" "}
                    {detailList?.case?.user?.surname}
                    <span className="!text-xl  flex items-center gap-1">
                      {detailList?.case?.user?.point}
                      <Image src={point} alt="" className="w-6" />
                    </span>
                  </p>

                  <span className="label">Name,surname,point</span>
                </div>
              </div>
              <div className="flex gap-3 md:gap-5 items-center">
                <span className="carry_icon">
                  <Image src={carry_email} alt="" width={32} height={26} />
                </span>
                <div>
                  <p>{detailList?.case?.user?.email} </p>

                  <span className="label">Email address</span>
                </div>
              </div>
              <div className="flex gap-3 md:gap-5 items-center">
                <span className="carry_icon">
                  <Image src={carry_date} alt="" width={32} height={26} />
                </span>
                <div>
                  <p>
                    {" "}
                    {detailList?.createDate
                      ? new Date(detailList.createDate).toLocaleDateString(
                          "en-US",
                          {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          }
                        )
                      : ""}
                  </p>

                  <span className="label">Publication Date</span>
                </div>
              </div>
              <div className="flex gap-3 md:gap-5 items-center">
                <span className="carry_icon">
                  <Image
                    src={carry_pub_date}
                    alt=""
                    width={32}
                    height={26}
                  />
                </span>
                <div>
                  <p>
                    {" "}
                    {detailList?.package?.deadline
                      ? new Date(
                          detailList.package?.deadline
                        ).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })
                      : ""}
                  </p>

                  <span className="label">Last Date to Apply</span>
                </div>
              </div>
              {/* <div className="flex gap-3 md:gap-5 items-center">
                <span className="carry_icon">
                  <Image src={carry_date} alt="" width={32} height={26} />
                </span>
                <div>
                  <p></p>

                  <span className="label">Number of applications</span>
                </div>
              </div> */}
              <div className="flex gap-3 md:gap-5 items-center">
                <span className="carry_icon">
                  <Image
                    src={carry_contact}
                    alt=""
                    width={32}
                    height={26}
                  />
                </span>
                <div>
                  <p>{detailList?.case?.user?.phoneNumber}</p>

                  <span className="label">Phone number</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="carry-right">
          <div className="description-section">
            <h3>Description</h3>
            <p>{detailList?.description}</p>
          </div>

          <div className="points-details">
            <div className="flex justify-between items-baseline">
              <h3>Points Details</h3>
              <button className="all_see" onClick={allSeeModalToggle}>
                All see
              </button>
            </div>
            <div>
              <div className="flex justify-between items-center">
                <div
                  className={`rating !w-[120px] ${
                    detailList?.case?.user?.pointsForFromUser[0]?.value
                      ? "disabled-rating"
                      : ""
                  }`}
                >
                  {[5, 4, 3, 2, 1].map((star) => (
                    <React.Fragment key={star}>
                      <input
                        type="radio"
                        id={`star1${star}`}
                        name="rating"
                        value={star}
                        checked={
                          detailList?.case?.user?.pointsForFromUser[0]
                            ?.value === star
                        }
                        disabled
                      />
                      <label
                        htmlFor={`star${star}`}
                        className="!w-6 !h-6 modal_raiting"
                      ></label>
                    </React.Fragment>
                  ))}
                </div>
                <span className="carry_date">
                  {moment(
                    detailList?.case?.user?.pointsForFromUser[0]
                      ?.createdDate
                  ).format("DD-MM-YYYY")}
                </span>
              </div>
              <p className="carry_desc">
                {detailList?.case?.user?.pointsForFromUser[0]?.description}
              </p>
            </div>
{
  user?.id !== detailList?.case?.user?.id && <div className="flex justify-end mt-2">
  <button
    className="comment-button"
    onClick={commentModalToggle}
  >
    Comment
  </button>
</div>
}
            
          </div>
        </div>
      </div>}
        
        </ModalBody>
      </Modal>

      {commentModal && (
        <CommentModal
          toggle={commentModalToggle}
          modal={commentModal}
          toUserId={user?.id}
          fromUserId={detailList?.case?.user?.id}
          caseId={detailList?.case?.id}
        />
      )}
      {allSeeModal && (
        <AllSeeModal
          toggle={allSeeModalToggle}
          modal={allSeeModal}
          commentModal={commentModalToggle}
          userPoint={detailList?.case?.user?.pointsForFromUser}
        />
      )}
    </>
  );
}

export default CarryModal;
