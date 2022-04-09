import styles from './View.module.css';
import React from 'react';
import type { DetailedPage } from '$types/page';
import Head from 'next/head';
import { cn } from '../../../helpers/cn';
import Link from 'next/link';

export const View: React.FC<{ page: DetailedPage; className?: string }> = ({
    page,
    children,
    className
}) => {
    console.log(page);
    const title = page.settings.find(({ name }) => name === 'title')?.data;
    return (
        <main className={styles.view}>
            <Head>
                <title>{page.meta.title || page.title}</title>
                <meta property="og:title" content={page.meta.title || page.title} key="title" />
                {page.meta.description && (
                    <meta
                        property="og:description"
                        content={page.meta.description}
                        key="description"
                    />
                )}
            </Head>
            <header>
                <h1>
                    <Link href="/">
                        <a>
                            {title}{' '}
                            <div className={styles.h1Copy} aria-hidden={true}>
                                {title}
                            </div>
                        </a>
                    </Link>
                </h1>
            </header>
            <div className={cn(styles.content, className)}>{children}</div>
        </main>
    );
};
