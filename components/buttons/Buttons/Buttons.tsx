import styles from './Buttons.module.css';
import type { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import React from 'react';
import { Button, ButtonTheme } from '$components/buttons/Button/Button';

type ButtonsProps = {
    buttons: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>[];
};

export const Buttons: React.FC<ButtonsProps> = ({ buttons }) => (
    <div className={styles.buttons}>
        {buttons.map((b, i) => (
            <Button key={i} {...b} theme={i === 0 ? ButtonTheme.Primary : ButtonTheme.Secondary} />
        ))}
    </div>
);
