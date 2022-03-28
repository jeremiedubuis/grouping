import styles from './ColorPicker.module.css';
import React, { RefObject, useState } from 'react';
import { ModularFieldType } from '$components/react-modulr-forms';
import { RegularInput } from '$components/react-modulr-forms/fieldComponents/RegularInput';
import { FieldComponentProps } from '$components/react-modulr-forms/types';
import { cn } from '../../../helpers/cn';
import { registerType } from '$components/react-modulr-forms/config';
import { FiRefreshCcw } from 'react-icons/fi';

export const registerColorPicker = () =>
    registerType('ColorPicker', {
        Component: ColorPicker,
        extraClass: styles.picker,
        getValue: (ref: RefObject<any>) => ref.current.value
    });

export const ColorPicker: React.FC<React.HTMLProps<HTMLInputElement> & FieldComponentProps> = ({
    type: _type,
    className,
    ...props
}) => {
    const [type, switchType] = useState(ModularFieldType.Text);
    return (
        <>
            <RegularInput type={type} className={cn(styles.picker, className)} {...props} />
            <button
                type="button"
                onClick={() =>
                    switchType(
                        type === ModularFieldType.Color
                            ? ModularFieldType.Text
                            : ModularFieldType.Color
                    )
                }
            >
                <FiRefreshCcw />
            </button>
        </>
    );
};
