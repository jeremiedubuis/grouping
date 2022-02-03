import { dateToMysqlDate } from './dateToMysqlDate';
import { escape } from 'sqlstring';

export const valueToSQLValue = (value: any) =>
    typeof value === 'string'
        ? escape(value)
        : value === null
            ? 'NULL'
            : value instanceof Date
                ? escape(dateToMysqlDate(value))
                : typeof value === 'object'
                    ? escape(JSON.stringify(value))
                    : value;
