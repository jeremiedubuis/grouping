import React from "react";
import {
  ModularFieldType,
  ModularForm,
  ModularFormField,
} from "../react-modulr-forms";

type FormFlagProps = {
  className?: string;
  onSubmit: any;
  submitText: string;
  idSuffix?: string;
  data?: any;
};

export const FormFlag: React.FC<FormFlagProps> = ({
  className,
  onSubmit,
  submitText,
  idSuffix = "",
  data = {},
}) => {
  const id = "form-flag" + idSuffix;
  return (
    <ModularForm id={id} className={className} onSubmit={onSubmit}>
      <ModularFormField
        formId={id}
        id={"flag-name" + idSuffix}
        name="name"
        label="Nom"
        value={data.name}
        type={ModularFieldType.Text}
        validation={{ required: true }}
      />
      <ModularFormField
        formId={id}
        id={"flag-submit" + idSuffix}
        value={submitText}
        type={ModularFieldType.Submit}
      />
    </ModularForm>
  );
};
