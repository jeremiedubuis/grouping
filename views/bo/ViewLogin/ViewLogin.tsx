import styles from "./ViewLogin.module.css";
import React from "react";
import { FormLogin } from "../../../components/forms/FormLogin";
import { asyncLogin } from "../../../async/asyncUser";
import { useRouter } from "next/router";

export const ViewLogin: React.FC = () => {
  const { push } = useRouter();

  return (
    <main className={styles.view}>
      <h1>Connexion</h1>
      <FormLogin
        onSubmit={(e: any, data: any) => {
          e.preventDefault();
          asyncLogin(data.username, data.password).then(() => {
            push("/bo");
          });
        }}
      />
    </main>
  );
};
