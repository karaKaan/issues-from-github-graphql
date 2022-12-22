import React from "react";

import styles from "./styles.module.css";

type Props = {
  dropdownItems: {
    value: string | undefined;
    label: string;
  }[];
  selectedValue?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const Dropdown = ({ dropdownItems, selectedValue, onChange }: Props) => {
  return (
    <select
      value={selectedValue}
      className={styles.wrapper}
      onChange={onChange}
    >
      {dropdownItems.map((item, index) => (
        <option
          key={`${item.value}-${index}`}
          value={item.value}
          className={styles.dropdownItem}
          onChange={(e) => console.log(e.target)}
          disabled={item.value === selectedValue}
        >
          {item.label}
        </option>
      ))}
    </select>
  );
};
