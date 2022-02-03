import React from "react";
import {
  ModularFieldType,
  ModularForm,
  ModularFormField,
} from "../react-modulr-forms";

type FormFlagValueProps = {
  className?: string;
  onSubmit: any;
  submitText: string;
  idSuffix?: string;
  data?: any;
};

export const FormFlagValue: React.FC<FormFlagValueProps> = ({
  className,
  onSubmit,
  submitText,
  idSuffix = "",
  data = {},
}) => {
  const id = "form-flag-value" + idSuffix;
  return (
    <ModularForm id={id} className={className} onSubmit={onSubmit}>
      <ModularFormField
        formId={id}
        id={"flag-value" + idSuffix}
        name="value"
        label="Valeur"
        value={data.value}
        type={ModularFieldType.Text}
        validation={{ required: true }}
      />
      <ModularFormField
        formId={id}
        id={"flag-value-submit" + idSuffix}
        value={submitText}
        type={ModularFieldType.Submit}
      />
    </ModularForm>
  );
};
