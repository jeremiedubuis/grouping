import React, { useEffect, useState } from 'react';
import { DetailedPage } from '$types/page';
import {
    asyncBoPageFetch,
    asyncPageBlockCreate,
    asyncPageBlockDelete,
    asyncPageBlockUpdate,
    asyncPageUpdate
} from '../../../async/asyncPages';
import { Template } from '$components/templates/Template';

export const ViewPage: React.FC<{ id: number }> = ({ id }) => {
    const [page, setPage] = useState<DetailedPage>();

    useEffect(() => {
        asyncBoPageFetch(id).then(setPage);
    }, []);

    if (!page) return null;

    const formId = 'page-form';

    const deleteBlock = async (id: number) => {
        await asyncPageBlockDelete(id);
        setPage({ ...page, blocks: page.blocks.filter((b) => b.id === id) });
    };

    const onSubmit = async (e, data) => {
        e.preventDefault();
        console.log(e, data);
        await asyncPageUpdate(page.id, {
            path: data.path,
            template: data.template,
            title: data.title,
            metaTitle: data.metaTitle,
            metaDescription: data.metaDescription
        });
        await Promise.all(
            data.blocks.map((block, i) => {
                if (page.blocks[i]) {
                    return asyncPageBlockUpdate(page.blocks[i].id, block);
                } else {
                    return asyncPageBlockCreate({ ...block, pageId: page.id });
                }
            })
        );
    };

    let content;
    switch (page.template) {
        case 'homepage':
            content = (
                <Template
                    deleteBlock={deleteBlock}
                    page={page}
                    formId={formId}
                    onSubmit={onSubmit}
                    blockIdentifierContraints={['intro', 'map']}
                />
            );
            break;
        case 'dynamic':
            content = (
                <Template
                    deleteBlock={deleteBlock}
                    page={page}
                    formId={formId}
                    onSubmit={onSubmit}
                />
            );
            break;
    }

    return (
        <main>
            <h1>Edition de page: {page.title}</h1>
            {content}
        </main>
    );
};
