import styles from './Panel.module.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { cn } from '../../../helpers/cn';
import { IoMdClose } from 'react-icons/io';

export const Panel: React.FC<{ close: Function }> = ({ children, close }) => {
    if (typeof window === 'undefined') return null;
    return ReactDOM.createPortal(
        <>
            {children && (
                <button className={cn(styles.button)} onClick={() => close()}>
                    <IoMdClose />
                </button>
            )}
            <div className={cn(styles.panel, children && styles.panelOpen)}>
                <div>{children}</div>
            </div>
        </>,
        document.body
    );
};
