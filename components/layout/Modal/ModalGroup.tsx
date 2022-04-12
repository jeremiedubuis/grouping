import React from 'react';
import { FormGroup } from '../../forms/FormGroup';
import { Modal } from './Modal';
import { asyncGroupCreate, asyncGroupUpdate } from '../../../async/asyncGroups';
import type { Group, GroupPayload, GroupType, GroupWithFlags } from '$types/group';

type ModalGroupCreateProps = {
    group?: Group;
    close: Function;
    updateGroup?: (group: Group) => void;
    createGroup?: (group: GroupWithFlags) => void;
    groupTypes: GroupType[];
};

export const ModalGroup: React.FC<ModalGroupCreateProps> = ({
    group,
    close,
    updateGroup,
    createGroup,
    groupTypes
}) => {
    return (
        <Modal close={close}>
            <h2>Création de groupe</h2>

            <FormGroup
                idSuffix={group ? 'edit' : 'create'}
                data={group}
                submitText={group ? 'Editer' : 'Créer'}
                onSubmit={(e: any, data: GroupPayload) => {
                    e.preventDefault();
                    if (group) {
                        asyncGroupUpdate(group.id, data).then(() => {
                            updateGroup?.({ ...group, ...data });
                            close();
                        });
                    } else {
                        asyncGroupCreate(data).then(({ id, slug }) => {
                            createGroup?.({
                                id,
                                name: data.name,
                                slug,
                                type: data.type,
                                defaultNodeValue: data.defaultNodeValue,
                                flags: {}
                            });
                            close();
                        });
                    }
                }}
                groupTypes={groupTypes}
            />
        </Modal>
    );
};
