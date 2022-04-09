import styles from './RichText.module.css';
import React from 'react';

export const RichText: React.FC<{ text?: string }> = ({ text }) => {
    return <div className={styles.rich} dangerouslySetInnerHTML={{ __html: text || '' }} />;
};
