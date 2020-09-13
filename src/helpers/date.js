import moment from 'moment';

function getFormattedDay(format) {
    const defaultFormat = 'dddd MMM D';
    const now = moment(new Date());
    const date = moment(now).format(format || defaultFormat);
    return date;
}

export { getFormattedDay }
