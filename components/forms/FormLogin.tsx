import React from 'react';
import { ModularFieldType, ModularForm, ModularFormField } from '../react-modulr-forms';

export const FormLogin: React.FC<{ onSubmit: any }> = ({ onSubmit }) => {
    return (
        <ModularForm id="form-login" onSubmit={onSubmit}>
            <ModularFormField
                formId="form-login"
                id="username"
                name="username"
                label="Nom d'utilisateur"
                type={ModularFieldType.Text}
                validation={{ required: true }}
            />
            <ModularFormField
                formId="form-login"
                id="password"
                name="password"
                label="Mot de passe"
                type={ModularFieldType.Password}
                validation={{ required: true }}
            />
            <ModularFormField
                formId="form-login"
                id="submit"
                value="Se connecter"
                type={ModularFieldType.Submit}
            />
        </ModularForm>
    );
};
