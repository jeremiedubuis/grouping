import React from 'react';
import { ModularFieldType, ModularFormField } from '$components/react-modulr-forms';
import type { Block } from '$types/block';

export const BlockIntroduction: React.FC<{
    block?: Block;
    formId: string;
    namePrefix?: string;
}> = ({ block, formId, namePrefix }) => {
    return (
        <div className="intro-block">
            <ModularFormField
                formId={formId}
                label="Introduction"
                id="homepage-text"
                name={`${namePrefix}text`}
                value={block?.text}
                type={ModularFieldType.Textarea}
            />
        </div>
    );
};
