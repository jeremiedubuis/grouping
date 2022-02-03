import React, { MouseEventHandler } from "react";
import { Modal } from "./Modal";
import { Buttons } from "../../buttons/Buttons/Buttons";

type ModalConfirmDeleteProps = {
  close: MouseEventHandler;
  onSubmit: Function;
  title?: string;
  text?: string;
};

export const ModalConfirmDelete: React.FC<ModalConfirmDeleteProps> = ({
  title = "Supprimer",
  text = "Êtes vous certain de vouloir supprimer cet élément ?",
  onSubmit,
  close,
}) => (
  <Modal close={close}>
    <h2> {title} </h2>
    <p>{text}</p>
    <Buttons
      buttons={[
        {
          children: "Annuler",
          onClick: close,
        },
        {
          children: "Supprimer",
          onClick: (e) => {
            onSubmit();
            close(e);
          },
        },
      ]}
    />
  </Modal>
);
