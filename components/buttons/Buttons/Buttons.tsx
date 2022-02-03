import styles from "./Buttons.module.css";
import React from "react";
import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type ButtonsProps = {
  buttons: DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >[];
};

export const Buttons: React.FC<ButtonsProps> = ({ buttons }) => (
  <div className={styles.buttons}>
    {buttons.map((b, i) => (
      <button key={i} {...b} />
    ))}
  </div>
);
