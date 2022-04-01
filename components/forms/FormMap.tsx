import React from 'react';
import { ModularFieldType, ModularForm, ModularFormField } from '../react-modulr-forms';

type FormMapProps = {
    className?: string;
    onSubmit: any;
    submitText: string;
    idSuffix?: string;
    data?: any;
};

export const FormMap: React.FC<FormMapProps> = ({
    className,
    onSubmit,
    submitText,
    idSuffix = '',
    data = {}
}) => {
    const id = 'form-map' + idSuffix;
    return (
        <ModularForm id={id} className={className} onSubmit={onSubmit}>
            <ModularFormField
                formId={id}
                id={'map-name' + idSuffix}
                name="name"
                label="Nom"
                value={data.username}
                type={ModularFieldType.Text}
                validation={{ required: true }}
            />
            <ModularFormField
                formId={id}
                id={'map-description' + idSuffix}
                name="description"
                label="Description"
                type={ModularFieldType.Textarea}
            />
            <ModularFormField
                formId={id}
                id={'map-submit' + idSuffix}
                value={submitText}
                type={ModularFieldType.Submit}
            />
        </ModularForm>
    );
};
