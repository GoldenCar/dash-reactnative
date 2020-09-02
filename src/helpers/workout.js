import thumbnail_rest_inside_circuit from '../res/workout/rest_inside_circuit.png';
import thumbnail_note_card from '../res/workout/note_thumbnail.png';
import bgimage_rest_inside_circuit from '../res/workoutimage.png';
import thumbnail_rest_outside_circuit from '../res/workout/rest_outside_circuit.png';

import { mediaHost } from 'dash/src/config';
import * as planActions from '../actions/plans';

function getCircuitThumbnailUrl(exercise) {
    let thumbnailUrl = '';
    if (exercise.flag === "note") {
        thumbnailUrl = thumbnail_note_card;
    } else if (exercise.flag === 'rest') {
        thumbnailUrl = thumbnail_rest_inside_circuit;
    } else if (exercise.flag === 'video' && exercise.thumbnailFileName && exercise.thumbnailFileName != "") {
        thumbnailUrl = { uri: `${mediaHost}${exercise.thumbnailFileName}` };
    } else if (exercise.flag === "exercise") {
        if (exercise.exercisesData) {
            const data = exercise.exercisesData.exercisesData[0];
            thumbnailUrl = { uri: `${mediaHost}${data.BaseThumbnail_fileName}` };
        }
    }

    return thumbnailUrl;
}

async function getExerciseInformation(cardId) {
    const arrayResponse = await planActions.getExerciseData(cardId)
    return arrayResponse;
}

async function getWorkoutData(day, user) {
    const userDisplayName = user && user.displayname ? user.displayname : '';

    //  Getting videos and set them in the story 
    return Promise.all(
        day.versionDayTaskCard.map(async (exercise) => {
            if (exercise.flag === 'circuit') {
                const circuitData = await getCiruitData(exercise, exercise.exeerciseCards, userDisplayName);
                return circuitData;
            } else {
                const taskData = await getTaskData(exercise, userDisplayName);
                return taskData;
            }
        })
    );
}

function getVideoData(temp) {
    return {
        'title': temp.title,
        'description': temp.description,
        'fileName': temp.fileName ? temp.fileName : '',
        'AutoPlay': temp.AutoPlay === 'checked' ? true : false,
        'AutoPlayShowFlag': temp.AutoPlayShowFlag ? temp.AutoPlayShowFlag : true,
        'flag': temp.flag,
        'RestTime': temp.RestTime,
        'timer': false,
        "cardType": "video"
    }
}

function getRestData(temp) {
    return {
        'title': temp.title,
        'description': temp.description,
        'flag': temp.flag,
        'thumbnailImage': bgimage_rest_inside_circuit,
        'RestTime': temp.RestTime,
        'timer': false,
        'cardType': 'rest',
        'AutoPlayShowFlag': temp.AutoPlayShowFlag ? temp.AutoPlayShowFlag : '',
        'AutoPlay': temp.AutoPlay === 'checked' ? true : false,
    }

    // diff from getTaskData
    // let dict = {
    //     'thumbnailImage': thumbnail_rest_outside_circuit,
    //     'timer': true,
    // }
}

function getNoteData(temp) {
    return {
        'title': temp.title,
        'description': temp.description,
        'flag': temp.flag,
        'thumbnailImage': thumbnail_note_card,
        'RestTime': temp.RestTime,
        'timer': false,
        'cardType': 'note',
        'AutoPlayShowFlag': temp.AutoPlayShowFlag ? temp.AutoPlayShowFlag : '',
        'AutoPlay': false,
    }
}

async function getExerciseData(temp) {
    const response = await getExerciseInformation(temp.cardUUID);
    if (!response.exercisesData) {
        return {};
    }

    const cardData = response.exercisesData.filter(data => data.id === temp.cardExerciseID);
    if (cardData.length <= 0) {
        return {};
    }

    const {
        BaseVideo_fileName,
        exerciseDescription,
        exerciseName,
    } = cardData[0];

    return {
        'title': exerciseName ? exerciseName : '',
        'description': exerciseDescription ? exerciseDescription : '',
        'fileName': BaseVideo_fileName ? BaseVideo_fileName : '',
        'AutoPlayShowFlag': false,
        'flag': 'video',
        'RestTime': temp.RestTime,
        'cardType': 'exercise',
        'Reps': temp.Reps,
        "Sets": temp.Sets,
        'RepsCount': temp.RepsCount,
        'AutoPlay': temp.AutoPlay == 'checked' ? true : false,
    }
}

async function getCiruitData(element, exerciseCards, userDisplayName) {
    const arrayCircuitVideos = [];
    const arrayVideoTimerCircuit = [];

    for (let index = 0; index < exerciseCards.length; index++) {
        const temp = element.exeerciseCards[index];

        if (temp.flag === "video" && temp.fileName) {
            let dict = getVideoData(temp);
            arrayCircuitVideos.push(dict);
        } else if (temp.flag === "rest") {
            let dict = getRestData(temp);
            arrayCircuitVideos.push(dict);
        } else if (temp.flag === "note") {
            let dict = getNoteData(temp);
            arrayCircuitVideos.push(dict);
        } else if (temp.flag === "exercise") {
            let dict = await getExerciseData(temp);
            arrayCircuitVideos.push(dict);
        }
    }

    const pushData = {
        id: '2',
        source: require('dash/src/res/friends/friend1.png'),
        user: userDisplayName,
        avatar: require('dash/src/res/friends/friend1.png'),
        timer: arrayVideoTimerCircuit,
        videos: arrayCircuitVideos,
        flag: 'circuit'
    };

    return pushData;
}

async function getTaskData(exercise, userDisplayName) {
    let pushData = {};
    let arrayNormalVideos = [];
    let arrayVideoTimerNormal = [];

    if (exercise.flag === "exercise") {
        let dict = getExerciseData(exercise);
        arrayNormalVideos.push(dict);
    } else if (exercise.flag === "video" && exercise.fileName) {
        let dict = getVideoData(exercise);
        arrayNormalVideos.push(dict);
    } else if (exercise.flag === 'note') {
        let dict = getNoteData(exercise);
        arrayNormalVideos.push(dict);
    } else if (exercise.flag === "rest") {
        let dict = getRestData(exercise);
        arrayNormalVideos.push(dict);

        const timer = exercise.RestTime != "" ? exercise.RestTime : 15;
        arrayVideoTimerNormal.push(timer);
    }

    if (arrayNormalVideos.length) {
        pushData = {
            id: '4',
            source: require('dash/src/res/friends/friend1.png'),
            user: userDisplayName,
            avatar: require('dash/src/res/friends/friend1.png'),
            timer: arrayVideoTimerNormal,
            videos: arrayNormalVideos,
            flag: 'solo'
        };
    }

    return pushData;
}

export { getCircuitThumbnailUrl, getWorkoutData }
