import { valueToSQLValue } from './valueToSqlValue';

export const sqlValues = (values: any, query: string) =>
    Object.keys(values)
        .reduce(
            (acc, curr) =>
                acc.replace(
                    new RegExp(':' + curr + '([,\\s)]|\\r\\n|\\n|\\r|$)', 'g'),
                    (typeof values[curr] !== 'undefined' && values[curr] !== null
                        ? valueToSQLValue(values[curr])
                        : 'NULL') + '$1'
                ),
            query
        )
        .replace(new RegExp(':[a-zA-Z0-9_]+([,\\s)]|\\r\\n|\\n|\\r|$)', 'gm'), 'NULL$1');

export const getUpdateIfDefinedString = (
    obj: any,
    prefix: string = '',
    precedeWithComa?: boolean
) => {
    if (!Object.keys(obj).length) return '';
    const values: string[] = [];

    for (const key in obj) {
        if (obj.hasOwnProperty(key) && typeof obj[key] !== 'undefined')
            values.push(`${prefix}${key}=:${prefix}${key}`);
    }
    return (precedeWithComa && values.length ? ',' : '') + values.join(', ');
};
