import styles from './Nav.module.css';
import React, { useState } from 'react';
import { MenuLink } from '$types/menuLink';
import Link from 'next/link';
import { FiMenu } from 'react-icons/fi';
import { cn } from '../../../helpers/cn';
import { IoMdClose } from 'react-icons/io';

export const Nav: React.FC<{ menu: MenuLink[] }> = ({ menu }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    return (
        <>
            <button
                className={cn(styles.button, isOpen && styles.buttonNavOpen)}
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <IoMdClose /> : <FiMenu />}
            </button>
            <nav className={cn(styles.nav, isOpen && styles.navOpen)}>
                <ul>
                    {menu?.map((l) => {
                        const content =
                            l.target === '_self' ? (
                                <Link href={l.href as string}>
                                    <a>{l.text}</a>
                                </Link>
                            ) : (
                                <a href={l.href} target={l.target}>
                                    {l.text}
                                </a>
                            );

                        return <li key={l.id}>{content}</li>;
                    })}
                </ul>
            </nav>
        </>
    );
};
