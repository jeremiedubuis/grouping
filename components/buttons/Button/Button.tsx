import styles from './Button.module.css';
import React from 'react';
import { cn } from '../../../helpers/cn';

export enum ButtonTheme {
    Primary = 'primary',
    Secondary = 'secondary'
}
export type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & { theme?: ButtonTheme };

export const Button: React.FC<ButtonProps> = ({ children, className, theme, ...props }) => (
    <button className={cn(className, styles.button, theme && styles[theme])} {...props}>
        {children}
    </button>
);
