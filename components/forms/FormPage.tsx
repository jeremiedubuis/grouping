import React, { useEffect, useState } from 'react';
import { ModularFieldType, ModularForm, ModularFormField } from '../react-modulr-forms';
import { asyncIndividualsFetch } from '../../async/asyncIndividuals';
import { asyncGroupsFetch } from '../../async/asyncGroups';
import { IndividualWithFlags } from '$types/individual';
import { GroupWithFlags } from '$types/group';

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
    const [individuals, setIndividuals] = useState<IndividualWithFlags[]>();
    const [groups, setGroups] = useState<GroupWithFlags[]>();
    const [pageType, setPageType] = useState<string>(
        data.individual ? 'individual' : data.group ? 'group' : 'simple'
    );
    const [path, setPath] = useState<string>(data?.path);

    useEffect(() => {
        asyncIndividualsFetch().then(setIndividuals);
        asyncGroupsFetch().then(setGroups);
    }, []);

    useEffect(() => {
        if (pageType === 'group' && groups)
            return setPath(`/groupes/${groups.filter((i) => !i.href)[0].slug}`);
        if (pageType === 'individual' && individuals)
            return setPath(`/personnalites/${individuals.filter((i) => !i.href)[0].slug}`);
        setPath(data?.path || '');
    }, [pageType]);

    const content = (
        <>
            <ModularFormField
                formId={id}
                id={'page-form-path'}
                type={ModularFieldType.Text}
                name="path"
                label="Chemin de la page"
                value={path}
                onChange={(e) => setPath(e.currentTarget.value)}
                readOnly={pageType !== 'simple'}
                validation={{ required: true }}
            />
            <ModularFormField
                id={'page-form-type'}
                type={ModularFieldType.Select}
                name="type"
                label="Type de page"
                readOnly={!!data.id}
                value={data.individual ? 'individual' : data.group ? 'group' : 'simple'}
                onChange={(e) => setPageType(e.currentTarget.value)}
            >
                <option value={'simple'}>Page simple</option>
                <option value={'group'}>Page de groupe</option>
                <option value={'individual'}>Page de personnalité</option>
            </ModularFormField>
            {pageType === 'individual' && (
                <ModularFormField
                    formId={id}
                    id={'page-form-individual'}
                    name="individualId"
                    type={ModularFieldType.Select}
                    readOnly={!!data.id}
                    value={data.individual?.id || individuals?.[0].id}
                    label="Personnalité"
                    onChange={(e) => {
                        console.log(e.currentTarget.value, individuals);
                        const i = individuals?.find(
                            (i) => i.id === parseInt(e.currentTarget.value)
                        ) as IndividualWithFlags;
                        console.log(i);
                        setPath(`/personnalites/${i.slug}`);
                    }}
                    coerceType="int"
                >
                    {individuals
                        ?.filter((i) => !i.href)
                        .map((i) => (
                            <option key={i.id} value={i.id}>
                                {i.firstname} {i.lastname}
                            </option>
                        ))}
                </ModularFormField>
            )}
            {pageType === 'group' && (
                <ModularFormField
                    formId={id}
                    id={'page-form-group'}
                    name="groupId"
                    type={ModularFieldType.Select}
                    readOnly={!!data.id}
                    value={data.group?.id}
                    label="Group"
                    coerceType="int"
                    onChange={(e) => {
                        const g = groups?.find(
                            (g) => g.id === parseInt(e.currentTarget.value)
                        ) as GroupWithFlags;
                        setPath(`/groupes/${g.slug}`);
                    }}
                >
                    {groups
                        ?.filter((g) => !g.href)
                        .map((g) => (
                            <option key={g.id} value={g.id}>
                                {g.name}
                            </option>
                        ))}
                </ModularFormField>
            )}
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
                readOnly={data.id || pageType === 'individual' || pageType === 'group'}
                value={
                    data?.template ||
                    (pageType &&
                        (pageType === 'individual' || pageType === 'group' ? 'dynamic' : null))
                }
                validation={{ required: true }}
            >
                <option value="homepage">Page d'accueil</option>
                <option value="dynamic">Page dynamique</option>
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
