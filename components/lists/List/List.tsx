import React, {MouseEventHandler, ReactNode} from 'react';
import styles from './List.module.css';
import {IconButton} from '../../buttons/IconButton/IconButton';
import Link from 'next/link'

type ListProps = {
    items: {
        id: number;
        picture?: string;
        initials?: string;
        name: string;
        subtitle?: string;
        link?: string;
        buttons: {
            icon: ReactNode;
            onClick: MouseEventHandler;
        }[];
    }[];
};
export const List: React.FC<ListProps> = ({items}) => {
    return (
        <ul className={styles.list}>
            {items.map((i) => {

                const content = <>
                    <div className={styles.name}>{i.name}</div>
                    <span className={styles.flags}>{i.subtitle}</span>
                </>

                return (
                    <li key={i.id}>
                        {i.picture ? (
                            <img src={i.picture} alt=""/>
                        ) : (
                            <div className={styles.initials}>{i.initials}</div>
                        )}
                        {i.link ? <Link href={i.link}><a className={styles.content}>{content}</a></Link> : <div className={styles.content}>
                            {content}
                        </div>}
                        <ul className={styles.buttons}>
                            {i.buttons.map((b, i) => {
                                return (
                                    <li key={i}>
                                        <IconButton onClick={b.onClick}>{b.icon}</IconButton>
                                    </li>
                                );
                            })}
                        </ul>
                    </li>
                )
            })}
        </ul>
    );
};
