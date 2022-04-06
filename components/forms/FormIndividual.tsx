import React from 'react';
import { ModularFieldType, ModularForm, ModularFormField } from '../react-modulr-forms';

type FormIndividualProps = {
    className?: string;
    onSubmit: any;
    submitText: string;
    idSuffix?: string;
    data?: any;
};

export const FormIndividual: React.FC<FormIndividualProps> = ({
    className,
    onSubmit,
    submitText,
    idSuffix = '',
    data = {}
}) => {
    const id = 'form-individual' + idSuffix;
    return (
        <ModularForm id={id} className={className} onSubmit={onSubmit}>
            <ModularFormField
                formId={id}
                id={'individual-firstname' + idSuffix}
                name="firstname"
                label="Prénom"
                value={data.firstname}
                type={ModularFieldType.Text}
                validation={{ required: true }}
            />
            <ModularFormField
                formId={id}
                id={'individual-lastname' + idSuffix}
                name="lastname"
                label="Nom de famille"
                value={data.lastname}
                type={ModularFieldType.Text}
                validation={{ required: true }}
            />
            <ModularFormField
                formId={id}
                id={'individual-defaultNodeValue' + idSuffix}
                name="defaultNodeValue"
                label="Valeur par défaut du noeud"
                value={data.defaultNodeValue}
                type={ModularFieldType.Number}
            />
            <ModularFormField
                formId={id}
                id={'individual-defaultNodeColor' + idSuffix}
                name="defaultNodeColor"
                label="Couleur par défaut du noeud"
                value={data.defaultNodeColor}
                type={'ColorPicker'}
            />
            <ModularFormField
                formId={id}
                id={'individual-picture' + idSuffix}
                name="picture"
                label="Image"
                type={ModularFieldType.File}
            />
            <ModularFormField
                formId={id}
                id={'individual-description' + idSuffix}
                name="description"
                label="Description"
                value={data.description}
                type={ModularFieldType.Textarea}
            />
            <ModularFormField
                formId={id}
                id={'individual-submit' + idSuffix}
                value={submitText}
                type={ModularFieldType.Submit}
            />
        </ModularForm>
    );
};
