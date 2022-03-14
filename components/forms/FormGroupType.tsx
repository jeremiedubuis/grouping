import React from 'react';
import { ModularFieldType, ModularForm, ModularFormField } from '../react-modulr-forms';

type FormGroupTypeProps = {
    className?: string;
    onSubmit: any;
    submitText: string;
    idSuffix?: string;
    data?: any;
};

export const FormGroupType: React.FC<FormGroupTypeProps> = ({
    className,
    onSubmit,
    submitText,
    idSuffix = '',
    data = {}
}) => {
    const id = 'form-group-type' + idSuffix;
    return (
        <ModularForm id={id} className={className} onSubmit={onSubmit}>
            <ModularFormField
                formId={id}
                id={'type' + idSuffix}
                name="type"
                label="Type"
                value={data.name}
                type={ModularFieldType.Text}
                validation={{ required: true }}
            />
            <ModularFormField
                formId={id}
                id={'type-submit' + idSuffix}
                value={submitText}
                type={ModularFieldType.Submit}
            />
        </ModularForm>
    );
};
