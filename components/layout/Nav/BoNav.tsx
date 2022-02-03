import styles from './BoNav.module.css';
import React from 'react';
import Link from 'next/link';
import { FiHome, FiUsers, FiTag } from 'react-icons/fi';
import { AiOutlinePartition, AiOutlineCrown } from 'react-icons/ai';
import { IconType } from 'react-icons';

const links: ([string, IconType] | [string, IconType, string])[] = [
    ['/bo', FiHome],
    ['/bo/individuals', FiUsers],
    ['/bo/flags', FiTag],
    ['/bo/groups', AiOutlinePartition, styles.antd],
    ['/bo/admins', AiOutlineCrown, styles.antd]
];
export const BoNav = () => (
    <nav className={styles.nav}>
        <ul>
            {links.map(([href, Icon, className]) => (
                <li key={href}>
                    <Link href={href}>
                        <a className={className}>
                            <Icon />
                        </a>
                    </Link>
                </li>
            ))}
        </ul>
    </nav>
);
