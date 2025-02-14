import Image from "next/image";
import React, { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import "@/assets/css/modal/modal.css";
import whatsapp from "@/assets/img/whatsapp.svg";

import carry_title from "@/assets/img/carry_title.svg";
import Pagination from "../Pagination/Pagination";
import moment from "moment";

interface UserPoint {
  fromUser?: {
    name: string;
    surname: string;
  photo:string;

  };
  description?: string;
  value?: number;
  createdDate:string;
}

interface AllSeeModalProps {
  toggle: () => void;
  modal: boolean;
  userPoint?: UserPoint[];
  commentModal: () => void;
}

function AllSeeModal({ toggle, modal, userPoint,commentModal }: AllSeeModalProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} centered size="xl">
        <ModalHeader toggle={toggle}>
          <div className="flex w-full justify-between">
            <h3>Points details</h3>
            <div className="flex gap-3">
              <button onClick={commentModal} className="add_comment">Add comment</button>
              <div className="bg-white rounded-lg flex items-center justify-center mr-3 px-2">
                <Image src={whatsapp} alt="" />
              </div>
            </div>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="grid grid-cols-3 gap-3">
            {userPoint?.map((item, i) => (
              <div className="flex flex-col gap-3  p-3 border border-[#e7eaec] rounded-xl" key={i}>
                <div className="flex justify-between items-center">
                  <Image src={`data:image/png;base64,${item?.fromUser?.photo}`} alt="" width={75} height={75} />
                  <div
                    className={`rating ${item.value ? "disabled-rating" : ""}`}
                  >
                    {[5, 4, 3, 2, 1].map((star) => (
                      <React.Fragment key={star}>
                        <input
                          type="radio"
                          id={`star${star}-${i}`}
                          name={`rating-${i}`}
                          value={star}
                          checked={item.value === star}
                          disabled
                        />
                        <label htmlFor={`star${star}-${i}`}></label>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <h5 className="text-[#133240]">
                    {item?.fromUser?.name} {item?.fromUser?.surname}
                  </h5>
                  <span>{moment(item?.createdDate).format("DD-MM-YYYY")}</span>
                </div>
                <div>
                  <p>{item?.description}</p>
                </div>
              </div>
            ))}
          </div>

          <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page: number) => setCurrentPage(page)}
              activetab="carry"
            />
        </ModalBody>
     
      </Modal>
    </div>
  );
}

export default AllSeeModal;
