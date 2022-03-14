import React from 'react';
import { FormIndividual } from '../../forms/FormIndividual';
import { asyncIndividualUpdate } from '../../../async/asyncIndividuals';
import { Modal } from './Modal';
import { IndividualWithFlags } from '$types/individual';
import omit from 'lodash/fp/omit';

type ModalIndividualEditProps = {
    individual: IndividualWithFlags;
    close: Function;
    updateIndividual: Function;
};

export const ModalIndividualEdit: React.FC<ModalIndividualEditProps> = ({
    individual,
    close,
    updateIndividual
}) => {
    return (
        <Modal close={close}>
            <h2>Edition</h2>

            <FormIndividual
                idSuffix="-edit"
                submitText={'Editer'}
                data={{
                    firstname: individual.firstname,
                    lastname: individual.lastname
                }}
                onSubmit={(e: any, data: any) => {
                    e.preventDefault();
                    data = omit((k) => typeof k === 'undefined')(data);
                    asyncIndividualUpdate(individual.id, data).then(() => {
                        updateIndividual({ ...individual, ...data });
                        close();
                    });
                }}
            />
        </Modal>
    );
};
