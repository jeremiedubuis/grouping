import styles from './ModalEntityFlags.module.css';
import React, { useEffect, useState } from 'react';
import { Modal } from '../Modal';
import { IndividualWithFlags } from '$types/individual';
import { asyncFlagsFetch } from '../../../../async/asyncFlags';
import { ModularFieldType, ModularFormField } from '../../../react-modulr-forms';
import { Flag } from '$types/flag';
import {
    asyncEntityFlagValueCreate,
    asyncEntityIndividualFlagValueDelete,
    asyncEntityFlagValueUpdate
} from '../../../../async/asyncFlags';
import { FormEntityFlagValue } from '../../../forms/FormEntityFlagValue';
import { IconButton } from '../../../buttons/IconButton/IconButton';
import { FiTrash } from 'react-icons/fi';
import { GroupWithFlags } from '$types/group';

type ModalEntityFlagssProps = {
    individual?: IndividualWithFlags;
    group?: GroupWithFlags;
    update: Function;
    close: Function;
    title: string;
};
export const ModalEntityFlags: React.FC<ModalEntityFlagssProps> = ({
    individual,
    group,
    close,
    update,
    title
}) => {
    const [flags, setFlags] = useState<Flag[]>([]);

    useEffect(() => {
        asyncFlagsFetch().then(setFlags);
    }, []);
    const entity: any = individual || group;

    return (
        <Modal close={close}>
            <h2>{title}</h2>
            <h3>Ajouter une étiquette</h3>
            <FormEntityFlagValue
                entityFlagValues={individual?.flags || group?.flags || {}}
                flags={flags}
                onSubmit={(e, data) => {
                    e.preventDefault();
                    const flagValueId = parseInt(data.flagValueId);
                    asyncEntityFlagValueCreate(group?.id, individual?.id, flagValueId).then(() => {
                        const flag = flags.find((f) => f.id === parseInt(data.flagId));
                        if (!flag) return;
                        const flagValue = flag?.values.find((v) => v.id === flagValueId);
                        update({
                            ...entity,
                            flags: { ...entity.flags, [flag.name]: flagValue }
                        });
                    });
                }}
                submitText="Ajouter"
            />

            <h3>Etiquettes</h3>
            <ul className={styles.flags}>
                {Object.keys(entity.flags)
                    .sort()
                    .map((flag) => {
                        const { id } = entity.flags[flag];
                        return (
                            <li key={id}>
                                <header>
                                    <div className={styles.name}>{flag} </div>
                                    <IconButton
                                        small
                                        plain
                                        onClick={() => {
                                            asyncEntityIndividualFlagValueDelete(
                                                group?.id,
                                                individual?.id,
                                                id
                                            ).then(() => {
                                                const flags = { ...entity.flags };
                                                delete flags[flag];
                                                update({ ...entity, flags });
                                            });
                                        }}
                                    >
                                        {' '}
                                        <FiTrash />
                                    </IconButton>
                                    :
                                </header>
                                <ModularFormField
                                    formId="form-individual-flag-value-update"
                                    id="individual-flag-value-update"
                                    value={id}
                                    type={ModularFieldType.Select}
                                    onChange={(e) => {
                                        const flagValueId = parseInt(e.currentTarget.value);
                                        asyncEntityFlagValueUpdate(
                                            group?.id,
                                            individual?.id,
                                            flagValueId
                                        ).then(() => {
                                            const f = flags.find(({ name }) => name === flag);
                                            const flagValue = f?.values.find(
                                                ({ id }) => id === flagValueId
                                            );
                                            update({
                                                ...entity,
                                                flags: {
                                                    ...entity.flags,
                                                    [flag]: flagValue
                                                }
                                            });
                                        });
                                    }}
                                >
                                    {(flags.find(({ name }) => name === flag)?.values || []).map(
                                        ({ id, value }) => (
                                            <option key={id} value={id}>
                                                {value}
                                            </option>
                                        )
                                    )}
                                </ModularFormField>
                            </li>
                        );
                    })}
            </ul>
        </Modal>
    );
};
