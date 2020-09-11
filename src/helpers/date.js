import moment from 'moment';

// TODO: rename to getFormattedDay
// default format - 'dddd MMM D'
function getCurrentDay() {
    const now = moment(new Date());
    const date = moment(now).format('dddd MMM D');
    return date;
}

// TODO: should this be in challenge helper?
function getSecondsTilStart(challenge) {
    const now = moment(new Date());
    const startDate = new Date(challenge.startDate);

    const seconds = moment(startDate).diff(now, 'seconds');
    return seconds;
}

export { getCurrentDay, getSecondsTilStart }
