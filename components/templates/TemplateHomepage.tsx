import React, { useEffect, useState } from 'react';
import { FormPage } from '$components/forms/FormPage';
import { BlockIntroduction } from '$components/templates/blocks/BlockIntroduction';
import type { Map } from '$types/map';
import { asyncMapsFetch } from '../../async/asyncMaps';
import { BlockMap } from '$components/templates/blocks/BlockMap';
import { Button } from '$components/buttons/Button/Button';
import { ModularForm } from '$components/react-modulr-forms';
import { DetailedPage } from '$types/page';
import {
    asyncPageBlockCreate,
    asyncPageBlockUpdate,
    asyncPageUpdate
} from '../../async/asyncPages';

export const TemplateHomepage: React.FC<{ page: DetailedPage; formId: string }> = ({
    page,
    formId
}) => {
    const [maps, setMaps] = useState<Map[]>();

    useEffect(() => {
        asyncMapsFetch().then(setMaps);
    }, []);
    return maps ? (
        <div>
            <ModularForm
                parseAccessors
                id={formId}
                onSubmit={async (e, data) => {
                    e.preventDefault();
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
                }}
            >
                <FormPage id={formId} data={page} />
                <BlockIntroduction
                    block={page.blocks?.[0]}
                    formId={formId}
                    namePrefix="blocks[0]."
                />
                <BlockMap
                    formId={formId}
                    maps={maps}
                    block={page.blocks?.[1]}
                    namePrefix="blocks[1]."
                />
                <Button>Submit</Button>
            </ModularForm>
        </div>
    ) : null;
};
