import styles from './Buttons.module.css';
import type { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import React from 'react';
import { Button, ButtonTheme } from '$components/buttons/Button/Button';
import { cn } from '../../../helpers/cn';

type ButtonsProps = {
    buttons: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>[];
    headerButtons?: boolean;
};

export const Buttons: React.FC<ButtonsProps> = ({ buttons, headerButtons }) => (
    <div className={cn(styles.buttons, headerButtons && styles.headerButtons)}>
        {buttons.map((b, i) => (
            <Button key={i} {...b} theme={i === 0 ? ButtonTheme.Primary : ButtonTheme.Secondary} />
        ))}
    </div>
);
