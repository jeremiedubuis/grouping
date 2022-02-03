import React from 'react';
import { FormGroup } from '../../forms/FormGroup';
import { Modal } from './Modal';
import { asyncGroupUpdate } from '../../../async/asyncGroups';
import type { Group, GroupPayload } from '$types/group';

type ModalGroupCreateProps = {
    group: Group;
    close: Function;
    updateGroup: (group: Group) => void;
};

export const ModalGroupEdit: React.FC<ModalGroupCreateProps> = ({ group, close, updateGroup }) => {
    return (
        <Modal close={close}>
            <h2>Création de groupe</h2>

            <FormGroup
                idSuffix="edit"
                data={group}
                submitText={'Editer'}
                onSubmit={(e: any, data: Partial<GroupPayload>) => {
                    e.preventDefault();
                    asyncGroupUpdate(group.id, data).then(() => {
                        close();
                        updateGroup({ ...group, ...data });
                    });
                }}
            />
        </Modal>
    );
};
