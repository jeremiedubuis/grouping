import React, { useState } from 'react';
import { ModularFieldType, ModularForm, ModularFormField } from '../react-modulr-forms';
import type { Group } from '$types/group';
import type { IndividualWithFlags } from '$types/individual';
import { LinkPayload } from '$types/linkTypes';

type FormLinkProps = {
    groupId?: number;
    individualId?: number;
    className?: string;
    onSubmit: (e: any, data: LinkPayload) => void;
    submitText: string;
    idSuffix?: string;
    data?: any;
    groups: Group[];
    individuals: IndividualWithFlags[];
};

export const FormLink: React.FC<FormLinkProps> = ({
    className,
    onSubmit,
    submitText,
    idSuffix = '',
    data = {},
    groups,
    groupId,
    individualId,
    individuals
}) => {
    const id = 'form-link' + idSuffix;
    const [type, setType] = useState(data.type || 'group');
    return (
        <ModularForm
            id={id}
            className={className}
            onSubmit={(e, { group2Id, individual2Id, type }) => {
                onSubmit(e, {
                    groupId,
                    individualId,
                    group2Id: group2Id ? parseInt(group2Id) : group2Id,
                    individual2Id: individual2Id ? parseInt(individual2Id) : individual2Id,
                    type
                });
            }}
        >
            <ModularFormField
                id={'link-choice' + idSuffix}
                label="Associer avec"
                value={type}
                onChange={(e: any) => setType(e.currentTarget.value)}
                type={ModularFieldType.Select}
            >
                <option value="group">Groupe</option>
                <option value="individual">Personnalité</option>
            </ModularFormField>

            {type === 'group' ? (
                <ModularFormField
                    key={type}
                    formId={id}
                    id={'link-group' + idSuffix}
                    name="group2Id"
                    label="Groupe"
                    type={ModularFieldType.Select}
                    validation={{ required: true }}
                >
                    {(groupId ? groups.filter((g) => g.id !== groupId) : groups)
                        ?.sort((a, b) => {
                            if (a.name > b.name) return 1;
                            else if (a.name < b.name) return -1;
                            return 0;
                        })
                        .map((g) => (
                            <option value={g.id} key={g.id}>
                                {g.name} ({g.type})
                            </option>
                        ))}
                </ModularFormField>
            ) : (
                <ModularFormField
                    key={type}
                    formId={id}
                    id={'link-individual' + idSuffix}
                    name="individual2Id"
                    label="Personnalité"
                    type={ModularFieldType.Select}
                    validation={{ required: true }}
                >
                    {(individualId ? individuals.filter((i) => i.id !== individualId) : individuals)
                        ?.sort((a, b) => {
                            if (a.lastname > b.lastname) return 1;
                            else if (a.lastname < b.lastname) return -1;
                            if (a.firstname > b.firstname) return 1;
                            else if (a.firstname < b.firstname) return -1;
                            return 0;
                        })
                        .map((i) => (
                            <option value={i.id} key={i.id}>
                                {i.lastname} {i.firstname}
                            </option>
                        ))}
                </ModularFormField>
            )}
            <ModularFormField
                formId={id}
                id={'link-type' + idSuffix}
                name="type"
                label="Type de liens"
                value={data.type || 'present'}
                type={ModularFieldType.Select}
            >
                <option value="present">Actuels</option>
                <option value="past">Passés</option>
                <option value="unknown">Floux</option>
            </ModularFormField>
            <ModularFormField
                formId={id}
                id={'link-submit' + idSuffix}
                value={submitText}
                type={ModularFieldType.Submit}
            />
        </ModularForm>
    );
};
