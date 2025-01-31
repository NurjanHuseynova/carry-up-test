import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import "@/assets/css/modal/modal.css";
import Image from "next/image";
import send_modal_title from "@/assets/img/send_modal_title.svg"
import send_modal_price from "@/assets/img/send_modal_price.svg"
import send_modal_from from "@/assets/img/send_modal_from.svg"
import send_modal_to from "@/assets/img/send_modal_to.svg"
import send_modal_created from "@/assets/img/send_modal_created.svg"
import send_modal_contact from "@/assets/img/send_modal_contact.svg"
import send_modal_last from "@/assets/img/send_modal_last.svg"
import send_modal_email from "@/assets/img/send_modal_email.svg"
import send_modal_name from "@/assets/img/send_modal_name.svg"




interface CarryModalProps {
  toggle: () => void;
  isOpen: boolean;
   setModal: React.Dispatch<React.SetStateAction<boolean>>;
 

  detailList: {
    title?: string;
    package?: {
      price?: number;
      count?: number;
    };
    tripPlaceDetails?: {
      fromPlace?: string;
      toPlace?: string;
    }[];
    createDate?: string | Date;
    endDate?: string | Date;
    description?: string;
  };
}

function SendModal({ toggle, isOpen, detailList ,setModal}: CarryModalProps) {
  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string) : null;

  

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      centered
      size="xl"
      className="modal-container"
    >
      <ModalHeader toggle={() => setModal(!isOpen)}>For Send Details</ModalHeader>
      <ModalBody>
        <div className="carry-modal-container">
          <div className="carry-left">
            <div className="flex flex-col gap-7">
              <div className="carry-header">
                <div className="flex items-center gap-3">
                  <span className="icon">
                    <Image src={send_modal_title} alt="send_modal_title"/>
                  </span>
                  <h2>{detailList?.title}</h2>
                </div>
                <div>
                  <span className="price-tag">
                    ${detailList?.package?.price}
                  </span>
                  <span className="icon">📍</span>
                </div>
              </div>

              <div className="details-section">
                <h3>Details</h3>
                <div className="details-grid">
                  <div className="flex gap-11 flex-col">
                    <div className="flex gap-5">
                      <span className="icon"> <Image src={send_modal_from} alt="send_modal_from"/></span>
                      <div>
                        <p>{detailList?.tripPlaceDetails?.[0]?.fromPlace} </p>
                        <span className="label">From</span>
                      </div>
                    </div>
                    <div className="flex gap-5">
                      <span className="icon"> <Image src={send_modal_to} alt="send_modal_to"/></span>
                      <div>
                        <p>{detailList?.tripPlaceDetails?.[0]?.toPlace} </p>

                        <span className="label">To</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-11 flex-col">
                    <div className="flex gap-5">
                      <span className="icon"> <Image src={send_modal_price} alt="send_modal_price"/></span>
                      <div>
                        <p>{detailList?.package?.count}</p>

                        <span className="label">Count of documents</span>
                      </div>
                    </div>
                    <div className="flex gap-5">
                      <span className="icon"> <Image src={send_modal_price} alt="send_modal_price"/></span>
                      <div>
                        {" "}
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
                <div className="flex gap-5">
                  <span className="icon"><Image src={send_modal_name} alt="send_modal_name"/></span>
                  <div className="w-full">
                    <p className="flex justify-between">
                    {user?.name} {user?.surname} <span className="!text-[16px]">{user?.point} ⭐</span>
                    </p>

                    <span className="label">Name,surname,point</span>
                  </div>
                </div>
                <div className="flex gap-5">
                  <span className="icon"><Image src={send_modal_email} alt="send_modal_email"/></span>
                  <div>
                    <p>{user?.email} </p>

                    <span className="label">Email address</span>
                  </div>
                </div>
                <div className="flex gap-5">
                  <span className="icon"><Image src={send_modal_created} alt="send_modal_created"/></span>
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
                <div className="flex gap-5">
                  <span className="icon"><Image src={send_modal_last} alt="send_modal_last"/></span>
                  <div>
                    <p>
                      {" "}
                      {detailList?.endDate
                        ? new Date(detailList.endDate).toLocaleDateString(
                            "en-US",
                            {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            }
                          )
                        : ""}
                    </p>

                    <span className="label">Last Date to Apply</span>
                  </div>
                </div>
                <div className="flex gap-5">
                  <span className="icon"><Image src={send_modal_last} alt="send_modal_last"/></span>
                  <div>
                    <p>2</p>

                    <span className="label">Number of applications</span>
                  </div>
                </div>
                <div className="flex gap-5">
                  <span className="icon"><Image src={send_modal_contact} alt="send_modal_contact"/></span>
                  <div>
                    <p>February 20, 2024</p>

                    <span className="label">Contact</span>
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
                <span className="all_see">All see</span>
              </div>
              <div>
                <div className="flex justify-between items-baseline">
                  <p>⭐ 4.5</p>
                  <span className="carry_date">12.02.2024</span>
                </div>
                <p className="carry_desc">
                  Mailinnustunde-profil-olacaq-sag-asagi-terefinde-ulduz
                </p>
              </div>

              <div className="flex justify-end mt-2">
                <button className="comment-button">Comment</button>
              </div>
            </div>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
}

export default SendModal;
