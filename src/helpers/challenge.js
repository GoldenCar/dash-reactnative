import moment from 'moment';

function getDaysCompleted(challenges, challenge) {
    let daysCompleted = [];

    if (!challenges || challenges.length <= 0) {
        return daysCompleted;
    }

    const foundChallenge = challenges.find(challengeProgress => challengeProgress.id === challenge._id);
    if (foundChallenge) {
        daysCompleted = foundChallenge.daysCompleted;
    }

    return daysCompleted;
}

// TODO: add description here 
function getDaysSinceStart(challenge) {
    const now = moment(new Date());
    const startDate = new Date(challenge.startDate);

    const daysElapsed = moment(now).diff(startDate, 'days');
    return daysElapsed;
}

// TODO: add description here
function getSecondsTilStart(challenge) {
    const now = moment(new Date());
    const startDate = new Date(challenge.startDate);

    const seconds = moment(startDate).diff(now, 'seconds');
    return seconds;
}

function getTotalDaysCompleted(challenges, challenge) {
    const daysCompletedArray = getDaysCompleted(challenges, challenge);
    let numberOfDaysCompleted = 0;
    const daysCompleted = daysCompletedArray.filter(day => day === 1);
    numberOfDaysCompleted = daysCompleted.length;

    return numberOfDaysCompleted
}

function hasChallengeStarted(challenge) {
    const secondsTilStart = getSecondsTilStart(challenge);
    return secondsTilStart <= 0;
}

export { hasChallengeStarted, getSecondsTilStart, getDaysSinceStart, getTotalDaysCompleted, getDaysCompleted } 
