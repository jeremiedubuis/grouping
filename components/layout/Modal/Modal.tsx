import styles from "./Modal.module.css";
import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { FiX } from "react-icons/fi";
import { onClickOutside } from "../../../helpers/dom/onClickOutside";

export const Modal: React.FC<{ close: Function }> = ({ children, close }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    onClickOutside(ref, () => close());
  }, []);

  return ReactDOM.createPortal(
    <div className={styles.wrapper}>
      <div className={styles.modal} ref={ref}>
        {children}

        <button className={styles.close} onClick={() => close()}>
          <FiX />
        </button>
      </div>
    </div>,
    document.getElementById("modal-wrapper") as HTMLElement
  );
};
