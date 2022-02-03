import React, { useEffect, useState } from 'react';
import { ModularFieldType, ModularForm, ModularFormField } from '../react-modulr-forms';
import { Flag, FlagValues } from '$types/flag';

type FormIndividualFlagValueProps = {
    flags: Flag[];
    entityFlagValues: FlagValues;
    className?: string;
    onSubmit: any;
    submitText: string;
    idSuffix?: string;
};

export const FormEntityFlagValue: React.FC<FormIndividualFlagValueProps> = ({
    className,
    onSubmit,
    submitText,
    idSuffix = '',
    entityFlagValues,
    flags
}) => {
    const [flagIdToAdd, setFlagIdToAdd] = useState<number>(-1);
    useEffect(() => {
        const activeName = flags.find(({ id }) => id === flagIdToAdd)?.name;
        if (activeName && entityFlagValues[activeName]) setFlagIdToAdd(-1);
    }, [entityFlagValues]);
    const id = 'form-individual-flag-value-add' + idSuffix;
    return (
        <ModularForm
            id={id}
            className={className}
            onSubmit={(e, data) => {
                onSubmit(e, data);
                setFlagIdToAdd(-1);
            }}
        >
            <ModularFormField
                formId={id}
                id="individual-flag-value-add-flag"
                type={ModularFieldType.Select}
                name="flagId"
                value={flagIdToAdd || -1}
                onChange={(e) => {
                    if (parseInt(e.currentTarget.value) !== -1)
                        setFlagIdToAdd(parseInt(e.currentTarget.value));
                }}
            >
                <option value={-1}>Sélectionner une étiquette</option>
                {flags
                    .filter((f) => !entityFlagValues[f.name] && f.values.length)
                    .map((f) => (
                        <option key={f.id} value={f.id}>
                            {f.name}
                        </option>
                    ))}
            </ModularFormField>
            {flagIdToAdd > -1 && (
                <ModularFormField
                    formId={id}
                    id="form-individual-flag-value-add-value"
                    name="flagValueId"
                    type={ModularFieldType.Select}
                >
                    {flags
                        .find((f) => f.id === flagIdToAdd)
                        ?.values.map((v) => (
                            <option key={v.id} value={v.id}>
                                {v.value}
                            </option>
                        ))}
                </ModularFormField>
            )}
            <ModularFormField
                formId={id}
                id={'flag-value-submit' + idSuffix}
                value={submitText}
                type={ModularFieldType.Submit}
            />
        </ModularForm>
    );
};
