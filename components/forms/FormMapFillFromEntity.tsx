import React, { useState } from 'react';
import { ModularFieldType, ModularForm, ModularFormField } from '../react-modulr-forms';
import { Individual } from '$types/individual';
import { Group } from '$types/group';

type FormMapFillFromEntityProps = {
    className?: string;
    onSubmit: any;
    submitText: string;
    idSuffix?: string;
    mapId;
    groups: Group[];
    individuals: Individual[];
};

export const FormMapFillFromEntity: React.FC<FormMapFillFromEntityProps> = ({
    className,
    onSubmit,
    submitText,
    idSuffix = '',
    groups,
    individuals
}) => {
    const id = 'form-map' + idSuffix;
    const [type, setType] = useState('groups');

    return (
        <ModularForm id={id} className={className} onSubmit={onSubmit}>
            <ModularFormField
                id={'map-fill-from-entitytype' + idSuffix}
                type={ModularFieldType.Select}
                value={type}
                label="Type d'entrée"
                onChange={(e) => setType(e.currentTarget.value)}
            >
                <option value={'groups'}>Groupe</option>
                <option value={'individuals'}>Individu</option>
            </ModularFormField>
            {type === 'individuals' ? (
                <ModularFormField
                    key="individualId"
                    formId={id}
                    id={'map-fill-from-entityindividual' + idSuffix}
                    name="individualId"
                    label="Individu"
                    type={ModularFieldType.Select}
                    coerceType="int"
                >
                    {individuals.map((i) => (
                        <option key={i.id} value={i.id}>
                            {i.lastname} {i.firstname}
                        </option>
                    ))}
                </ModularFormField>
            ) : (
                <ModularFormField
                    key="groupId"
                    formId={id}
                    id={'map-fill-from-entitygroup' + idSuffix}
                    name="groupId"
                    label="Group"
                    coerceType="int"
                    type={ModularFieldType.Select}
                >
                    {groups.map((g) => (
                        <option key={g.id} value={g.id}>
                            {g.name}
                        </option>
                    ))}
                </ModularFormField>
            )}
            <ModularFormField
                formId={id}
                id={'map-fill-from-entitysubmit' + idSuffix}
                value={submitText}
                type={ModularFieldType.Submit}
            />
        </ModularForm>
    );
};
