import React from 'react';
import { Group } from '$types/group';
import { Individual } from '$types/individual';
import { Modal } from '$components/layout/Modal/Modal';
import { FormMapFillFromEntity } from '$components/forms/FormMapFillFromEntity';
import { asyncMapFillFromGroupId, asyncMapFillFromIndividualId } from '../../../async/asyncMaps';

export const ModalMapAutoFill: React.FC<{
    close: Function;
    groups: Group[];
    individuals: Individual[];
    mapId: number;
    setMap: (data: any) => void;
}> = ({ close, groups, individuals, mapId, setMap }) => {
    return (
        <Modal close={close}>
            <h2>Auto-remplissage</h2>
            <FormMapFillFromEntity
                onSubmit={(e, { individualId, groupId }) => {
                    e.preventDefault();
                    if (individualId)
                        asyncMapFillFromIndividualId(mapId, individualId).then(setMap);
                    else asyncMapFillFromGroupId(mapId, groupId).then(setMap);
                }}
                submitText={'Remplir'}
                mapId={mapId}
                groups={groups}
                individuals={individuals}
            />
        </Modal>
    );
};
