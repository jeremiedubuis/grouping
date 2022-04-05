import React, { useEffect, useState } from 'react';
import { DetailedPage } from '$types/page';
import { asyncBoPageFetch } from '../../../async/asyncPages';
import { TemplateHomepage } from '$components/templates/TemplateHomepage';

export const ViewPage: React.FC<{ id: number }> = ({ id }) => {
    const [page, setPage] = useState<DetailedPage>();

    useEffect(() => {
        asyncBoPageFetch(id).then(setPage);
    }, []);

    if (!page) return null;

    const formId = 'page-form';
    let content;
    switch (page.template) {
        case 'homepage':
            content = <TemplateHomepage formId={formId} page={page} />;
            break;
    }

    return (
        <main>
            <h1>Edition de page: {page.title}</h1>
            {content}
        </main>
    );
};
