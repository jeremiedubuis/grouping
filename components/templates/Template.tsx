import React, { useEffect, useState } from 'react';
import { FormPage } from '$components/forms/FormPage';
import { BlockRichText } from '$components/templates/blocks/BlockRichText';
import type { Map } from '$types/map';
import { asyncMapsFetch } from '../../async/asyncMaps';
import { BlockMap } from '$components/templates/blocks/BlockMap';
import { Button, ButtonTheme } from '$components/buttons/Button/Button';
import { ModularFieldType, ModularForm, ModularFormField } from '$components/react-modulr-forms';
import { TemplateProps } from '$types/template';
import { FiTrash } from 'react-icons/fi';

export const Template: React.FC<TemplateProps & { deleteBlock: (id: number) => void }> = ({
    page,
    formId,
    onSubmit,
    blockIdentifierContraints,
    deleteBlock
}) => {
    const [maps, setMaps] = useState<Map[]>();
    const [blockTemplates, setBlockTemplates] = useState(
        blockIdentifierContraints ? blockIdentifierContraints : page.blocks.map((b) => b.identifier)
    );

    useEffect(() => {
        asyncMapsFetch().then(setMaps);
    }, []);
    return maps ? (
        <div>
            <ModularForm parseAccessors id={formId} onSubmit={onSubmit}>
                <FormPage id={formId} data={page} />

                <ul>
                    {blockTemplates.map((template, i) => {
                        let Component: any;
                        const props: any = {
                            formId,
                            block: page.blocks?.[i],
                            namePrefix: `blocks[${i}].`
                        };
                        switch (template) {
                            case 'rich-text':
                                Component = BlockRichText;
                                break;
                            case 'map':
                                Component = BlockMap;
                                props.maps = maps;
                                break;
                        }
                        console.log(Component);

                        return (
                            <li key={i}>
                                {!blockIdentifierContraints && (
                                    <Button
                                        onClick={async () => {
                                            setBlockTemplates(
                                                blockTemplates.filter((_b, j) => j === i)
                                            );
                                            if (page.blocks[i]) {
                                                await deleteBlock(page.blocks[i].id);
                                            }
                                        }}
                                    >
                                        <FiTrash />
                                    </Button>
                                )}
                                <ModularFormField
                                    formId={formId}
                                    id={formId + 'template' + i + template}
                                    type={ModularFieldType.Hidden}
                                    name={`${props.namePrefix}identifier`}
                                    value={template}
                                />
                                <Component {...props} />
                            </li>
                        );
                    })}
                </ul>
                <Button theme={ButtonTheme.Primary}>Editer la page</Button>
            </ModularForm>

            {!blockIdentifierContraints && (
                <>
                    <ModularForm
                        id={formId + 'block-add'}
                        onSubmit={(e, { blockTemplate }) => {
                            e.preventDefault();
                            setBlockTemplates([...blockTemplates, blockTemplate]);
                        }}
                    >
                        <ModularFormField
                            formId={formId + 'block-add'}
                            id={formId + 'block-add-select'}
                            name="blockTemplate"
                            label="Type de bloc à ajouter"
                            type={ModularFieldType.Select}
                        >
                            <option value="rich-text">Text riche</option>
                            <option value="map">Carte</option>
                        </ModularFormField>
                        <Button theme={ButtonTheme.Secondary}>Ajouter un bloc</Button>
                        <br />
                        <br />
                    </ModularForm>
                </>
            )}
        </div>
    ) : null;
};
