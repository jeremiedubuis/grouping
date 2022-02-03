import styles from "./IconButton.module.css";
import React from "react";
import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { cn } from "../../../helpers/cn";

type IconButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  square?: boolean;
  small?: boolean;
  plain?: boolean;
};

export const IconButton: React.FC<IconButtonProps> = ({
  children,
  className,
  square,
  small,
  plain,
  ...props
}) => (
  <button
    className={cn(
      className,
      styles.btn,
      square && styles.square,
      small && styles.small,
      plain && styles.plain
    )}
    {...props}
  >
    {children}
  </button>
);
