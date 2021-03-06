import React from 'react';
import { ModularFieldType, ModularForm, ModularFormField } from '../react-modulr-forms';
import { GroupType } from '$types/group';

type FormGroupProps = {
    className?: string;
    onSubmit: any;
    submitText: string;
    idSuffix?: string;
    data?: any;
    groupTypes: GroupType[];
};

export const FormGroup: React.FC<FormGroupProps> = ({
    className,
    onSubmit,
    submitText,
    idSuffix = '',
    data = {},
    groupTypes
}) => {
    const id = 'form-group' + idSuffix;

    return (
        <ModularForm id={id} className={className} onSubmit={onSubmit}>
            <ModularFormField
                formId={id}
                id={'group-name' + idSuffix}
                name="name"
                label="Nom"
                value={data.name}
                type={ModularFieldType.Text}
                validation={{ required: true }}
            />
            <ModularFormField
                formId={id}
                id={'group-type' + idSuffix}
                name="type"
                label="Type"
                value={data.type}
                type={ModularFieldType.Select}
                validation={{ required: true }}
            >
                {groupTypes.map(({ type }) => (
                    <option key={type} value={type}>
                        {type}
                    </option>
                ))}
            </ModularFormField>
            <ModularFormField
                formId={id}
                id={'group-defaultNodeValue' + idSuffix}
                name="defaultNodeValue"
                label="Valeur par défaut du noeud"
                value={data.defaultNodeValue}
                type={ModularFieldType.Number}
            />
            <ModularFormField
                formId={id}
                id={'group-defaultNodeColor' + idSuffix}
                name="defaultNodeColor"
                label="Couleur par défaut du noeud"
                value={data.defaultNodeColor}
                type={ModularFieldType.Color}
            />
            <ModularFormField
                formId={id}
                id={'group-picture' + idSuffix}
                name="picture"
                label="Image"
                type={ModularFieldType.File}
            />
            <ModularFormField
                formId={id}
                id={'group-description' + idSuffix}
                name="description"
                label="Description"
                value={data.description}
                type={'Quill'}
            />
            <ModularFormField
                formId={id}
                id={'group-submit' + idSuffix}
                value={submitText}
                type={ModularFieldType.Submit}
            />
        </ModularForm>
    );
};
