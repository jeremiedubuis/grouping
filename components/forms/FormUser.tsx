import React from 'react';
import { ModularFieldType, ModularForm, ModularFormField } from '../react-modulr-forms';

type FormUserProps = {
    className?: string;
    onSubmit: any;
    submitText: string;
    idSuffix?: string;
    data?: any;
};

export const FormUser: React.FC<FormUserProps> = ({
    className,
    onSubmit,
    submitText,
    idSuffix = '',
    data = {}
}) => {
    const id = 'form-user' + idSuffix;
    return (
        <ModularForm id={id} className={className} onSubmit={onSubmit}>
            <ModularFormField
                formId={id}
                id={'user-username' + idSuffix}
                name="username"
                label="Nom d'utilisateur"
                value={data.username}
                type={ModularFieldType.Text}
                validation={{ required: true }}
            />
            <ModularFormField
                formId={id}
                id={'user-password' + idSuffix}
                name="password"
                label="Mot de passe"
                type={ModularFieldType.Password}
                validation={{ required: true }}
            />
            <ModularFormField
                formId={id}
                id={'user-submit' + idSuffix}
                value={submitText}
                type={ModularFieldType.Submit}
            />
        </ModularForm>
    );
};
