import styles from './Buttons.module.css';
import React from 'react';
import { Button, ButtonProps, ButtonTheme } from '$components/buttons/Button/Button';
import { cn } from '../../../helpers/cn';

type ButtonsProps = {
    buttons: ButtonProps[];
    headerButtons?: boolean;
};

export const Buttons: React.FC<ButtonsProps> = ({ buttons, headerButtons }) => (
    <div className={cn(styles.buttons, headerButtons && styles.headerButtons)}>
        {buttons.map((b, i) => (
            <Button key={i} theme={i === 0 ? ButtonTheme.Primary : ButtonTheme.Secondary} {...b} />
        ))}
    </div>
);
