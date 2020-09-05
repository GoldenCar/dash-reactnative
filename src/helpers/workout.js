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
        if (exercise.exercisesData && exercise.exercisesData.length > 0) {
            // TODO: the data in exercisesData is not reliable
            const data = exercise.exercisesData.filter((e) => e.id === exercise.cardExerciseID);
            thumbnailUrl = { uri: `${mediaHost}${data.BaseThumbnail_fileName}` };
        }
    }

    return thumbnailUrl;
}

async function getExerciseInformation(cardId) {
    const arrayResponse = await planActions.getExerciseData(cardId)
    return arrayResponse;
}

async function getWorkoutDataNew(day, user) {
    const userDisplayName = user && user.displayname ? user.displayname : '';
    return Promise.all(
        day.versionDayTaskCard.map(async (exercise) => {
            if (exercise.flag === 'circuit') {
                //     const circuitData = await getCiruitData(exercise, exercise.exeerciseCards, userDisplayName);
                //     return circuitData;
                return {};
            } else {
                const taskData = await getTaskDataNew(exercise, userDisplayName);
                return taskData;
            }
        })
    );
}

async function getTaskDataNew(exercise, name) {
   // let data = {};

    // if (exercise.flag === "video" && exercise.fileName) {
    //     data = getVideoData(exercise);
    // } else if (exercise.flag === "rest") {
    //     data = getRestData(exercise);
    // } else if (exercise.flag === "note") {
    //     data = getNoteData(exercise);
    // } else if (exercise.flag === "exercise") {
    //     data = await getExerciseData(exercise);
    // }

    //return data;


    let data = {
        title: exercise.title,
        description: exercise.description,
        autoPlay: exercise.AutoPlay === 'checked',
        autoPlayShowFlag: exercise.AutoPlayShowFlag,
        flag: exercise.flag,
        restTime: exercise.RestTime,
        timer: false
    };

    if (exercise.flag === 'rest') {
        data.thumbnailImage = bgimage_rest_inside_circuit;
    }

    if (exercise.flag === 'video') {
        data.fileName = exercise.fileName;
    }

    if (exercise.flag === 'note') {
        data.thumbnailImage = thumbnail_note_card;
    }

    if (exercise.flag === 'exercise') {
        data.flag = 'video';
        data.cardType = 'exercise';
        data.reps = exercise.Reps;
        data.sets = exercise.Sets;
        data.repsCount = exercise.RepsCount;

        const response = await getExerciseInformation(exercise.cardUUID);
        if (response.exercisesData) {
            const cardData = response.exercisesData.filter(data => data.id === exercise.cardExerciseID);
            if (cardData.length > 0) {
                const { BaseVideo_fileName, exerciseName } = cardData[0];
                data.fileName = BaseVideo_fileName;
                data.title = exerciseName;
            }
        }
    }

    return data;




    // let arrayVideoTimerNormal = [];
    // const videos = await parseTaskData(exercise);

    // if (exercise.flag === 'rest') {
    //     const timer = exercise.RestTime != "" ? exercise.RestTime : 15;
    //     arrayVideoTimerNormal.push(timer);
    // }

    // const pushData = {
    //     id: '4',
    //     source: require('dash/src/res/friends/friend1.png'),
    //     user: userDisplayName,
    //     avatar: require('dash/src/res/friends/friend1.png'),
    //     timer: arrayVideoTimerNormal,
    //     videos: [videos],
    //     flag: 'solo'
    // };

    // return pushData;
}

// ==================================================

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

// TODO: can getData functions be combined?
async function parseTaskData(exercise) {
    let data = {};

    if (exercise.flag === "video" && exercise.fileName) {
        data = getVideoData(exercise);
    } else if (exercise.flag === "rest") {
        data = getRestData(exercise);
    } else if (exercise.flag === "note") {
        data = getNoteData(exercise);
    } else if (exercise.flag === "exercise") {
        data = await getExerciseData(exercise);
    }

    return data;
}


async function getCiruitData(exercise, exerciseCards, userDisplayName) {
    const videos = [];

    for (let index = 0; index < exerciseCards.length; index++) {
        const temp = exercise.exeerciseCards[index];
        const data = await parseTaskData(temp);
        videos.push(data);
    }

    const pushData = {
        id: '2',
        source: require('dash/src/res/friends/friend1.png'),
        user: userDisplayName,
        avatar: require('dash/src/res/friends/friend1.png'),
        timer: [],
        videos: videos,
        flag: 'circuit'
    };

    return pushData;
}

async function getTaskData(exercise, userDisplayName) {
    let arrayVideoTimerNormal = [];
    const videos = await parseTaskData(exercise);

    if (exercise.flag === 'rest') {
        const timer = exercise.RestTime != "" ? exercise.RestTime : 15;
        arrayVideoTimerNormal.push(timer);
    }

    const pushData = {
        id: '4',
        source: require('dash/src/res/friends/friend1.png'),
        user: userDisplayName,
        avatar: require('dash/src/res/friends/friend1.png'),
        timer: arrayVideoTimerNormal,
        videos: [videos],
        flag: 'solo'
    };

    return pushData;
}

function getVideoData(temp) {
    return {
        'title': temp.title,
        'description': temp.description,
        'AutoPlay': temp.AutoPlay === 'checked' ? true : false,
        'AutoPlayShowFlag': temp.AutoPlayShowFlag ? temp.AutoPlayShowFlag : true,
        'flag': temp.flag,
        'RestTime': temp.RestTime,
        'timer': false,
        "cardType": 'video',
        'fileName': temp.fileName ? temp.fileName : '',

    }
}

function getRestData(temp) {
    return {
        'title': temp.title,
        'description': temp.description,
        'AutoPlay': temp.AutoPlay === 'checked' ? true : false,
        'AutoPlayShowFlag': temp.AutoPlayShowFlag ? temp.AutoPlayShowFlag : true,
        'flag': temp.flag,
        'RestTime': temp.RestTime,
        'timer': false,
        'cardType': 'rest',
        'thumbnailImage': bgimage_rest_inside_circuit
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
        'AutoPlay': false,
        'AutoPlayShowFlag': temp.AutoPlayShowFlag ? temp.AutoPlayShowFlag : true,
        'flag': temp.flag,
        'RestTime': temp.RestTime,
        'timer': false,
        'cardType': 'note',
        'thumbnailImage': thumbnail_note_card
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
        'AutoPlay': temp.AutoPlay == 'checked' ? true : false,
        'AutoPlayShowFlag': false,
        'flag': 'video',
        'RestTime': temp.RestTime,
        'cardType': 'exercise',
        'Reps': temp.Reps,
        "Sets": temp.Sets,
        'RepsCount': temp.RepsCount,
    }
}

export { getCircuitThumbnailUrl, getWorkoutData, getWorkoutDataNew }
