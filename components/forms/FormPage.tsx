import React from 'react';
import { ModularFieldType, ModularForm, ModularFormField } from '../react-modulr-forms';

type FormMapProps = {
    className?: string;
    onSubmit?: any;
    submitText?: string;
    id: string;
    data?: any;
    wrap?: boolean;
};

export const FormPage: React.FC<FormMapProps> = ({
    className,
    onSubmit,
    submitText,
    id,
    data = {},
    wrap
}) => {
    const content = (
        <>
            <ModularFormField
                formId={id}
                id={'page-form-path'}
                type={ModularFieldType.Text}
                name="path"
                label="Chemin de la page"
                value={data?.path}
                validation={{ required: true }}
            />
            <ModularFormField
                formId={id}
                id={'page-form-title'}
                type={ModularFieldType.Text}
                name="title"
                label="Titre"
                value={data?.title}
                validation={{ required: true }}
            />
            <ModularFormField
                formId={id}
                id={'page-form-template'}
                type={ModularFieldType.Select}
                name="template"
                label="Modèle de page"
                value={data?.template}
                validation={{ required: true }}
            >
                <option value="homepage">Page d'accueil</option>
            </ModularFormField>
            <ModularFormField
                formId={id}
                id={'page-form-metaTitle'}
                type={ModularFieldType.Text}
                name="metaTitle"
                value={data?.meta?.title}
                label="Titre (metadonnées)"
            />
            <ModularFormField
                formId={id}
                id={'page-form-metaDescription'}
                type={ModularFieldType.Text}
                name="metaDescription"
                value={data?.meta?.description}
                label="Description (metadonnées)"
            />
        </>
    );

    return wrap ? (
        <ModularForm id={id} className={className} onSubmit={onSubmit}>
            {content}
            <ModularFormField
                formId={id}
                id={'page-form-submit'}
                value={submitText}
                type={ModularFieldType.Submit}
            />
        </ModularForm>
    ) : (
        content
    );
};
