import React, { useState } from 'react';
import { ModularFieldType, ModularForm, ModularFormField } from '../react-modulr-forms';
import { Individual } from '$types/individual';
import { Group } from '$types/group';

type FormMapEntryProps = {
    className?: string;
    onSubmit: any;
    submitText: string;
    idSuffix?: string;
    mapId;
    groups: Group[];
    individuals: Individual[];
    data?: any;
};

export const FormMapEntry: React.FC<FormMapEntryProps> = ({
    className,
    onSubmit,
    submitText,
    idSuffix = '',
    mapId,
    groups,
    individuals,
    data = {}
}) => {
    const id = 'form-map' + idSuffix;
    const [type, setType] = useState('groups');

    const [nodeValue, setNodeValue] = useState(data?.nodeValue);
    const [nodeColor, setNodeColor] = useState(data?.nodeColor);

    return (
        <ModularForm id={id} className={className} onSubmit={onSubmit}>
            <ModularFormField
                formId={id}
                id={'map-entry-id' + idSuffix}
                name="mapId"
                value={mapId}
                type={ModularFieldType.Hidden}
                coerceType="int"
            />
            <ModularFormField
                id={'map-entry-type' + idSuffix}
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
                    id={'map-entry-individual' + idSuffix}
                    name="individualId"
                    label="Individu"
                    type={ModularFieldType.Select}
                    coerceType="int"
                    onChange={(e) => {
                        const individual = individuals.find(
                            (i) => i.id === parseInt(e.currentTarget.value)
                        ) as Individual;
                        setNodeValue(individual.defaultNodeValue);
                        setNodeColor(individual.defaultNodeColor);
                    }}
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
                    id={'map-entry-group' + idSuffix}
                    name="groupId"
                    label="Group"
                    coerceType="int"
                    onChange={(e) => {
                        const group = groups.find(
                            (g) => g.id === parseInt(e.currentTarget.value)
                        ) as Group;
                        setNodeValue(group.defaultNodeValue);
                        setNodeColor(group.defaultNodeColor);
                    }}
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
                id={'map-entry-NodeValue' + idSuffix}
                name="nodeValue"
                label="Valeur du noeud"
                value={nodeValue}
                coerceType="int"
                onChange={(e) => setNodeValue(e.currentTarget.value)}
                type={ModularFieldType.Number}
            />
            <ModularFormField
                formId={id}
                id={'map-entry-defaultNodeColor' + idSuffix}
                name="nodeColor"
                label="Couleur du noeud"
                value={nodeColor}
                onChange={(e) => setNodeColor(e.currentTarget.value)}
                type={ModularFieldType.Color}
            />
            <ModularFormField
                formId={id}
                id={'map-entry-submit' + idSuffix}
                value={submitText}
                type={ModularFieldType.Submit}
            />
        </ModularForm>
    );
};
