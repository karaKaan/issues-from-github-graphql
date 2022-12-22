import React from "react";
import styles from "./styles.module.css";

type Props = {
  children: React.ReactNode;
};

export const Container = ({ children }: Props) => {
  return <div className={styles.container}>{children}</div>;
};
