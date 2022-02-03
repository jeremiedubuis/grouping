import React from 'react';
import { FormStore } from './FormStore';
import type { ModularFormProps } from './types';

export const ModularForm: React.FC<ModularFormProps> = ({
    children,
    id,
    onSubmit,
    onSubmitError,
    handleSameNameFieldValues,
    ...intrinsic
}) => (
    <form
        id={id}
        {...intrinsic}
        onSubmit={(e) => {
            const form = FormStore.getForm(id, handleSameNameFieldValues);
            const errors = form.getErrors(false);
            if (!errors.length) {
                onSubmit?.(e, form.getValues());
            } else {
                e.preventDefault();
                onSubmitError?.(e, errors);
            }
        }}
    >
        {children}
    </form>
);
