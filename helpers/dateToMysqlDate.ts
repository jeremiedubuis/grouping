import { twoDigits } from '$shared/helpers/twoDigits';

export const dateToMysqlDate = (date: Date) =>
    date.getUTCFullYear() +
    '-' +
    twoDigits(1 + date.getUTCMonth()) +
    '-' +
    twoDigits(date.getUTCDate()) +
    ' ' +
    twoDigits(date.getUTCHours()) +
    ':' +
    twoDigits(date.getUTCMinutes()) +
    ':' +
    twoDigits(date.getUTCSeconds());
