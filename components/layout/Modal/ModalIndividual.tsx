import React from 'react';
import { FormIndividual } from '../../forms/FormIndividual';
import { asyncIndividualCreate, asyncIndividualUpdate } from '../../../async/asyncIndividuals';
import { Modal } from './Modal';
import { IndividualWithFlags } from '$types/individual';
import omit from 'lodash/fp/omit';

type ModalIndividualEditProps = {
    close: Function;
    individual?: IndividualWithFlags;
    updateIndividual?: Function;
    createIndividual?: Function;
};

export const ModalIndividual: React.FC<ModalIndividualEditProps> = ({
    individual,
    close,
    updateIndividual,
    createIndividual
}) => {
    return (
        <Modal close={close}>
            <h2>Edition</h2>

            <FormIndividual
                idSuffix={individual ? '-edit' : '-create'}
                submitText={individual ? 'Editer' : 'Créer'}
                data={individual}
                onSubmit={(e: any, data: any) => {
                    e.preventDefault();
                    data = omit((k) => typeof k === 'undefined')(data);
                    if (individual) {
                        asyncIndividualUpdate(individual.id, data).then(() => {
                            updateIndividual?.({ ...individual, ...data });
                            close();
                        });
                    } else {
                        asyncIndividualCreate(data).then(({ id, slug }) => {
                            createIndividual?.({ ...data, id, slug, flags: {} });
                        });
                        close();
                    }
                }}
            />
        </Modal>
    );
};
