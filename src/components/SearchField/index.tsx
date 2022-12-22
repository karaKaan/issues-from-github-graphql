import React from "react";
import styles from "./styles.module.css";

type Props = {
  text?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const SearchField = ({ text, onChange }: Props) => {
  return (
    <input
      id="input-field"
      className={styles.searchInput}
      value={text}
      onChange={onChange}
      placeholder="Search"
    />
  );
};
