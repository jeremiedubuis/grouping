import React from 'react';
import { MenuLink } from '$types/menuLink';
import Link from 'next/link';

export const Nav: React.FC<{ menu: MenuLink[] }> = ({ menu }) => {
    return (
        <nav>
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
    );
};
