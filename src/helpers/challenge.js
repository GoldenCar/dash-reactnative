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

// TODO: rename to daysSinceStart
function getDaysElapsed(challenge) {
    const now = moment(new Date());
    const startDate = new Date(challenge.startDate);

    const daysElapsed = moment(now).diff(startDate, 'days');
    return daysElapsed;
}

export { getDaysCompleted, getDaysElapsed } 
