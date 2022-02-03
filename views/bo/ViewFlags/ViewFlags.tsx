import React, { useEffect, useState } from "react";
import styles from "./ViewFlags.module.css";
import {
  asyncFlagCreate,
  asyncFlagDelete,
  asyncFlagsFetch,
  asyncFlagValueCreate,
  asyncFlagValueDelete,
} from "../../../async/asyncFlags";
import { Flag } from "$types/flag";
import { IconButton } from "../../../components/buttons/IconButton/IconButton";
import { FiEdit, FiTrash, FiSliders } from "react-icons/fi";
import { FormFlagValue } from "../../../components/forms/FormFlagValue";
import { ModalConfirmDelete } from "../../../components/layout/Modal/ModalConfirmDelete";
import { FormFlag } from "../../../components/forms/FormFlag";
import { ModalFlagEdit } from "../../../components/layout/Modal/ModalFlagEdit";

export const ViewFlags = () => {
  const [flags, setFlags] = useState<Flag[]>([]);
  const [selectedFlag, setSelectedFlag] = useState<Flag | null>(null);
  const [deleteCallback, setDeleteCallback] = useState<Function | null>(null);
  const [flagModal, setFlagModal] = useState<Flag | null>(null);

  useEffect(() => {
    asyncFlagsFetch().then(setFlags);
  }, []);

  return (
    <main className={styles.view}>
      <h1>Etiquettes</h1>
      <h2>Ajouter une étiquette</h2>
      <FormFlag
        className={styles.form}
        onSubmit={(e, data) => {
          e.preventDefault();
          asyncFlagCreate(data.name).then(({ id }) =>
            setFlags([...flags, { name: data.name, id, values: [] }])
          );
        }}
        submitText={"Créer"}
      />
      <h2>Etiquettes</h2>
      <ul className={styles.list}>
        {flags.map((f) => (
          <li key={f.id}>
            <div className={styles.content}>
              <div className={styles.name}>{f.name} </div>
              <ul className={styles.buttons}>
                <li>
                  <IconButton onClick={() => setFlagModal(f)}>
                    <FiEdit />
                  </IconButton>
                </li>
                <li>
                  <IconButton
                    onClick={() =>
                      setSelectedFlag(selectedFlag?.id === f.id ? null : f)
                    }
                  >
                    <FiSliders />
                  </IconButton>
                </li>
                <li>
                  <IconButton
                    onClick={() =>
                      setDeleteCallback(() => () => {
                        asyncFlagDelete(f.id).then(() =>
                          setFlags(flags.filter((flag) => flag.id !== f.id))
                        );
                      })
                    }
                  >
                    <FiTrash />
                  </IconButton>
                </li>
              </ul>
            </div>
            {selectedFlag?.id === f.id && (
              <ul className={styles.values}>
                {f.values.map((v) => (
                  <li key={v.id} className={styles.option}>
                    <div className={styles.value}>{v.value} </div>
                    <IconButton
                      small
                      plain
                      onClick={() =>
                        setDeleteCallback(() => () => {
                          asyncFlagValueDelete(v.id).then(() => {
                            setFlags(
                              flags.map((flag) => {
                                if (flag.id === f.id)
                                  flag.values = flag.values.filter(
                                    (value) => value.id !== v.id
                                  );
                                return flag;
                              })
                            );
                          });
                        })
                      }
                    >
                      <FiTrash />
                    </IconButton>
                  </li>
                ))}
                <li>
                  <h3>Ajouter une option</h3>
                  <FormFlagValue
                    className={styles.form}
                    onSubmit={(e, data) => {
                      e.preventDefault();
                      asyncFlagValueCreate(f.id, data.value).then(({ id }) => {
                        setFlags(
                          flags.map((flag) => {
                            if (flag.id === f.id)
                              flag.values = [
                                ...flag.values,
                                { id, value: data.value },
                              ];
                            return flag;
                          })
                        );
                      });
                    }}
                    submitText="Ajouter "
                  />
                </li>
              </ul>
            )}
          </li>
        ))}
      </ul>

      {deleteCallback && (
        <ModalConfirmDelete
          close={() => setDeleteCallback(null)}
          onSubmit={deleteCallback}
        />
      )}

      {flagModal && (
        <ModalFlagEdit
          flag={flagModal}
          close={() => setFlagModal(null)}
          updateFlag={(newFlag: Flag) =>
            setFlags(
              flags.map((flag) => {
                if (flag.id !== flagModal.id) return flag;
                return newFlag;
              })
            )
          }
        />
      )}
    </main>
  );
};
