import React from 'react';
import { ModularFormField } from '$components/react-modulr-forms';
import type { Block } from '$types/block';

export const BlockRichText: React.FC<{
    block?: Block;
    formId: string;
    namePrefix?: string;
}> = ({ block, formId, namePrefix }) => {
    return (
        <div className="rich-text-block">
            <ModularFormField
                formId={formId}
                label="Introduction"
                id="homepage-text"
                name={`${namePrefix}text`}
                value={block?.text}
                type={'Quill'}
            />
        </div>
    );
};
