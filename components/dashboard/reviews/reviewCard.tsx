"use client";
import React, { useState } from "react";
import styles from "@/styles/dashboard/review/review.module.scss";
import PromptStyles from "@/styles/components/prompt.module.scss";
import { Rating, RoundedStar } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { TbEye } from "react-icons/tb";
import Dialog from "@/components/dialog";
import Prompt from "@/components/prompt";
import { CancelBtn } from "@/components/button";

export default function ReviewCard({ reviewID, rating, review, name }: any) {
  const [toggle, setToggle] = useState(false);

  const onHandleToggle = () => {
    setToggle(() => !toggle);
  };

  return (
    <div className={styles.tr} key={reviewID}>
      {toggle ? (
        <Dialog>
          <Prompt title="">
            <div className={PromptStyles.inputHeader}>
              <div>
                <Rating
                  id="rating"
                  style={{ maxWidth: 150 }}
                  value={rating}
                  readOnly
                  itemStyles={{
                    itemShapes: RoundedStar,
                    activeFillColor: "#ffb700",
                    inactiveFillColor: "#fbf1a9",
                  }}
                />
              </div>
              <span>{review}</span>
            </div>
            <div className={PromptStyles.footer}>
              <CancelBtn onClose={onHandleToggle} name="Close" />
            </div>
          </Prompt>
        </Dialog>
      ) : null}
      <div className={styles.td}>
        <Rating
          id="rating"
          style={{ maxWidth: 150 }}
          value={rating}
          readOnly
          itemStyles={{
            itemShapes: RoundedStar,
            activeFillColor: "#ffb700",
            inactiveFillColor: "#fbf1a9",
          }}
        />
      </div>
      <div className={styles.td}>{review.slice(0, 200)}</div>
      <div className={styles.td}>
        <div className={styles.actionsBtnGrp}>
          <button aria-label="button" onClick={onHandleToggle}>
            <TbEye size={23} />
          </button>
        </div>
      </div>
    </div>
  );
}
