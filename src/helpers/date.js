import moment from 'moment';

function getCurrentDay() {
    const now = moment(new Date());
    const date = moment(now).format('dddd MMM D');
    return date;
}

export { getCurrentDay }
