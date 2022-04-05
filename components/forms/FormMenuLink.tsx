import React, { useEffect, useState } from 'react';
import { ModularFieldType, ModularForm, ModularFormField } from '../react-modulr-forms';
import { Page } from '$types/page';
import { asyncPagesFetch } from '../../async/asyncPages';

type FormMenuLinkProps = {
    className?: string;
    onSubmit: any;
    submitText: string;
    idSuffix?: string;
    data?: any;
};

export const FormMenuLink: React.FC<FormMenuLinkProps> = ({
    className,
    onSubmit,
    submitText,
    idSuffix = '',
    data = {}
}) => {
    const [pages, setPages] = useState<Page[]>();
    const [page, setPage] = useState(!!data?.pageId);
    const id = 'form-menu-link' + idSuffix;

    useEffect(() => {
        asyncPagesFetch().then(setPages);
    }, []);
    return (
        <ModularForm id={id} className={className} onSubmit={onSubmit}>
            <ModularFormField
                formId={id}
                id={'menu-link-text' + idSuffix}
                name="text"
                label="Text"
                value={data.text}
                type={ModularFieldType.Text}
                validation={{ required: true }}
            />
            <ModularFormField
                id={'menu-link-page' + idSuffix}
                checked={page}
                label="Pointer vers une page ?"
                onChange={(e: any) => setPage(e.currentTarget.checked)}
                type={ModularFieldType.Checkbox}
            />
            {page ? (
                <ModularFormField
                    formId={id}
                    id={'menu-link-page-id' + idSuffix}
                    name="pageId"
                    label="Page"
                    value={data.pageId}
                    type={ModularFieldType.Select}
                    validation={{ required: true }}
                    coerceType="int"
                >
                    {pages?.map((p) => (
                        <option key={p.id} value={p.id}>
                            {p.title} ({p.path})
                        </option>
                    ))}
                </ModularFormField>
            ) : (
                <ModularFormField
                    formId={id}
                    id={'menu-link-href' + idSuffix}
                    name="href"
                    label="Lien"
                    value={data.href}
                    type={ModularFieldType.Text}
                    validation={{ required: true }}
                />
            )}
            <ModularFormField
                formId={id}
                id={'menu-link-target' + idSuffix}
                name="target"
                label="Cible"
                value={data.target}
                type={ModularFieldType.Select}
                validation={{ required: true }}
            >
                <option value="_self">Lien interne</option>
                <option value="_blank">Lien externe</option>
            </ModularFormField>
            <ModularFormField
                formId={id}
                id={'menu-link-submit' + idSuffix}
                value={submitText}
                type={ModularFieldType.Submit}
            />
        </ModularForm>
    );
};
