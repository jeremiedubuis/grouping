import React from "react";
import { Modal } from "./Modal";
import { Flag } from "$types/flag";
import { FormFlag } from "../../forms/FormFlag";
import { asyncFlagUpdate } from "../../../async/asyncFlags";

type ModalFlagEditProps = {
  flag: Flag;
  close: Function;
  updateFlag: Function;
};

export const ModalFlagEdit: React.FC<ModalFlagEditProps> = ({
  flag,
  close,
  updateFlag,
}) => {
  return (
    <Modal close={close}>
      <h2>Edition</h2>

      <FormFlag
        idSuffix="-edit"
        submitText={"Editer"}
        data={{
          name: flag.name,
        }}
        onSubmit={(e: any, data: any) => {
          e.preventDefault();
          asyncFlagUpdate(flag.id, data.name).then(() => {
            updateFlag({ ...flag, ...data });
            close();
          });
        }}
      />
    </Modal>
  );
};
