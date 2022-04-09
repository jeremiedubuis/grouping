import styles from './Quill.module.css';
import type { Quill as QuillLib, QuillOptionsStatic } from 'quill';
import React, { RefObject, useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { Loader } from '$components/layout/Loader/Loader';
import { registerType } from '$components/react-modulr-forms/config';
import { FieldComponentProps } from '$components/react-modulr-forms/types';

export type EditorProps = {
    options?: QuillOptionsStatic;
    onBlur?: Function;
    onFocus?: Function;
    onChange?: Function;
    value?: string | number | readonly string[];
};

const defaultOptions = {
    modules: {
        toolbar: [{ header: [1, 2, 3, false] }, 'bold', 'italic', 'underline', 'strike', 'link']
    }
};

export const Quill: React.FC<FieldComponentProps & EditorProps> = ({
    value,
    setComponentRef,
    componentRef,
    options = {},
    onBlur,
    onFocus,
    onChange
}) => {
    const blurred = useRef<boolean>(true);
    const [loading, setLoading] = useState(true);
    const quillRef = useRef<any>(null);
    const elRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        import('quill').then(({ default: QuillLib }) => {
            if (elRef.current) {
                quillRef.current = new QuillLib(elRef.current, {
                    ...defaultOptions,
                    ...options,
                    theme: 'snow'
                });

                quillRef.current.on('text-change', (e) => {
                    console.log(e);
                    if (typeof onChange === 'function') onChange(e);
                });
                quillRef.current.on('selection-change', (e) => {
                    const _blurred = !e;
                    if (_blurred !== blurred.current) {
                        if (_blurred && typeof onBlur === 'function') onBlur(e);
                        if (!_blurred && typeof onFocus === 'function') onFocus(e);
                    }
                    blurred.current = _blurred;
                });

                if (typeof value !== 'undefined') setComponentRef(quillRef.current);
                //@ts-ignore
                componentRef.current.setContents(quillRef.current.clipboard.convert(value));
                setLoading(false);
            }
        });
    }, []);

    return (
        <div className={cn('c-editor')}>
            {loading && <Loader />}
            <div className={cn(styles.quill)} ref={elRef} />
        </div>
    );
};

export const registerQuill = () =>
    registerType('Quill', {
        Component: Quill,
        getValue: (ref: RefObject<QuillLib>) =>
            ref.current.getText().trim() ? ref.current.root.innerHTML : null
    });
