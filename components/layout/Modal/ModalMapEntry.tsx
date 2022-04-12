import React from 'react';
import { Modal } from '$components/layout/Modal/Modal';
import { FormMapEntry } from '$components/forms/FormMapEntry';
import { asyncMapEntryCreate } from '../../../async/asyncMaps';
import { Group } from '$types/group';
import { Individual } from '$types/individual';

export const ModalMapEntry: React.FC<{
    close: Function;
    groups: Group[];
    individuals: Individual[];
    mapId: number;
    createMapEntry: (isGroup, data: any) => void;
}> = ({ close, groups, individuals, createMapEntry, mapId }) => {
    return (
        <Modal close={close}>
            <h2>Ajouter une entrée à la carte</h2>
            <FormMapEntry
                onSubmit={(e, data) => {
                    e.preventDefault();
                    asyncMapEntryCreate(data).then(({ id }) => {
                        const entity = data.groupId
                            ? groups.find((g) => g.id === data.groupId)
                            : individuals.find((i) => i.id === data.individualId);
                        createMapEntry(!!data.groupId, { entry_id: id, ...entity });
                    });
                    close();
                }}
                submitText={'Ajouter'}
                mapId={mapId}
                groups={groups}
                individuals={individuals}
            />
        </Modal>
    );
};
