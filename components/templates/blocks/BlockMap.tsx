import React from 'react';
import { ModularFieldType, ModularFormField } from '$components/react-modulr-forms';
import type { Block } from '$types/block';
import type { Map } from '$types/map';

export const BlockMap: React.FC<{
    block?: Block;
    formId: string;
    maps: Map[];
    namePrefix?: string;
}> = ({ block, formId, maps, namePrefix = '' }) => {
    return (
        <div className="block-map">
            <h2>Carte</h2>
            <ModularFormField
                formId={formId}
                label="Carte"
                id="block-map-id"
                name={`${namePrefix}mapId`}
                value={block?.mapId}
                type={ModularFieldType.Select}
                coerceType="int"
            >
                <option value={-1}>Sélectionner une carte</option>
                {maps.map((m) => (
                    <option key={m.id} value={m.id}>
                        {m.name}
                    </option>
                ))}
            </ModularFormField>
            <ModularFormField
                formId={formId}
                id={'block-map-asset'}
                name={`${namePrefix}asset`}
                label="Image de fond"
                type={ModularFieldType.File}
            />
        </div>
    );
};
