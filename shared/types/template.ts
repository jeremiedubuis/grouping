import type { DetailedPage } from '$types/page';
import type { FormEvent } from 'react';

export type TemplateProps = {
    page: DetailedPage;
    formId: string;
    onSubmit: (e: FormEvent, data: any) => void;
    blockIdentifierContraints?: string[];
};
