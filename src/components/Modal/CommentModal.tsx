import React, { useState } from "react";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import styles from "@/assets/css/postanadd/postanadd.module.css";
import toast from "react-hot-toast";
import { postApi } from "@/services/api";

interface CommentModalProps {
  toggle: () => void;
  modal: boolean;
  caseId?:string;
  fromUserId?:string;
  toUserId:string;

}

const CommentModal: React.FC<CommentModalProps> = ({ toggle, modal ,caseId,fromUserId,toUserId}) => {
  const [rating, setRating] = useState<number | null>(null);
  const [description, setDescription] = useState("");


  const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRating(Number(event.target.value));
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(event.target.value);
  };

  const clearForm = () => {
    setRating(null);
    setDescription("");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!rating || !description.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }
    try {
      const obj = {
        value: rating,
        description: description,
        caseId: caseId,
        fromUserId: fromUserId,
        toUserId: toUserId,
      };

      const response = await postApi("Point/Create", obj);
      if (response?.success) {
        toast.success("Comment successfully")
        toggle();
      }
      
      
    } catch (error) {}
  };

  return (
    <Modal isOpen={modal} toggle={toggle} centered>
      <ModalHeader toggle={toggle}>Add comments</ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit}>
          <div
            className={`grid gap-4 md:grid-cols-1 h-3/6 ${styles.input_group}`}
          >
            <div className={styles.input_group_item}>
              <label>
                Select point <span className={styles.reqField}>*</span>
              </label>
              <div className="rating">
                {[5, 4, 3, 2, 1].map((num) => (
                  <React.Fragment key={num}>
                    <input
                      type="radio"
                      id={`star${num}`}
                      name="rating"
                      value={num}
                      checked={rating === num}
                      onChange={handleRatingChange}
                    />
                    <label htmlFor={`star${num}`}></label>
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className={styles.input_group_item}>
              <label htmlFor="description">
                Description<span className={styles.reqField}>*</span>
              </label>
              <textarea
                id="description"
                name="description"
                placeholder="Type here"
                className="!pt-[10px] !h-full"
                maxLength={200}
                value={description}
                onChange={handleDescriptionChange}
              />
              <span className="flex justify-end !text-[#292d32a6]">
                {description.length}/200
              </span>
            </div>
          </div>

          <div className="flex gap-3 mt-4">
            <button type="button" className="clear_btn" onClick={clearForm}>
              Clear all
            </button>
            <button type="submit" className="save_btn">
              Save
            </button>
          </div>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default CommentModal;
