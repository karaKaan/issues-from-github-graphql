import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import styles from './styles.module.css'

type Props = {
  fetchMore: () => void;
};

export const LoadingText = ({fetchMore}: Props) => {
  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView) {
      fetchMore();
    }
  }, [fetchMore, inView]);

  return <div 
  className={styles.loadingText}
  ref={ref}
  >Loading...</div>;
};


export const LoadingSpinner = () => {
  return <div className={styles.loadingSpinner}/>
}