import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { HiLockOpen, HiLockClosed } from "react-icons/hi";

type Props = {
  id: string;
  title: string;
  author: string;
  img: {
    src: string;
    alt?: string;
  };
  date: string;
  state: "OPEN" | "CLOSED";
  onMouseEnter?: () => void;
};

export const Card = ({
  id,
  title,
  author,
  img,
  date,
  state,
  onMouseEnter,
}: Props) => {
  return (
    <Link
      className={styles.linkWrapper}
      to={`/issue/${id}`}
      onMouseEnter={onMouseEnter}
    >
      <div className={styles.cardWrapper}>
        {state === "OPEN" ? (
          <HiLockOpen className={styles.lockOpen} />
        ) : (
          <HiLockClosed className={styles.lockClosed} />
        )}
        {/* <img src={img.src} alt={img.alt} /> */}
        <div className={styles.contentWrapper}>
          <h4>{author}</h4> created an issue on
          <p>{date}</p>
        </div>

        <h3>{title}</h3>
        {/* <p>{item.bodyText}</p> */}
        {/* <p>{item.state}</p> */}
      </div>
    </Link>
  );
};
