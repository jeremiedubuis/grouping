import React from "react";
import { FieldComponentProps } from "../types";

export const Select: React.FC<
  React.HTMLProps<HTMLSelectElement> & FieldComponentProps
> = ({
  type,
  disabled,
  value,
  onBlur,
  onFocus,
  onChange,
  errors,
  validation,
  componentRef,
  children,
  ...intrinsic
}) => {
  const sharedProps = {
    ref: componentRef,
    onChange,
    onFocus,
    onBlur,
    "aria-invalid": !!errors,
    "aria-required": validation?.required,
    disabled,
    value,
    ...intrinsic,
  };

  return <select {...sharedProps}>{children}</select>;
};
