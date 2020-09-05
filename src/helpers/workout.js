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

// TODO: why do i need to do this? this info should be on the exercise data already
async function getExerciseInformation(cardId) {
    const arrayResponse = await planActions.getExerciseData(cardId)
    return arrayResponse;
}

// TODO: make circuit exercise request once
//       set isCircuit
//       set loopNum
//       set exerciseNum
async function parseCircuitData(circuit) {
    const data = [];

    let exercises = circuit.exeerciseCards;
    const loops = parseInt(circuit.Cycles);

    // get data for all circuit exercises
    for (let p = 0; p < exercises.length; p++) {
        const exerciseNum = p + 1;

        const taskData = await getTaskData(exercises[p]);

        taskData.isCircuit = true;
        taskData.exerciseNum = exerciseNum;

        exercises[p] = taskData;
    }

    // add loop num and exercises based on how many circuit loops
    for (let i = 0; i < loops; i++) {
        for (let p = 0; p < exercises.length; p++) {
            const loopNum = i + 1;
            const fullExercise = {
                ...exercises[p],
                loopNum,
                totalLoops: loops,
                totalExercises: exercises.length
            };

            data.push(fullExercise);
        }
    }

    // add circuit complete card
    data.push({ flag: 'circuitComplete' });

    return data;
}

async function getWorkoutData(day) {
    let cards = [];

    for (let i = 0; i < day.versionDayTaskCard.length; i++) {
        const exercise = day.versionDayTaskCard[i];

        if (exercise.flag === 'circuit') {
            const data = await parseCircuitData(exercise);
            cards = cards.concat(data);
        } else if (exercise.flag !== 'circuit') {
            const taskData = await getTaskData(exercise);
            cards.push(taskData);
        }
    }

    return cards;
}

async function getTaskData(exercise) {
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
}

export { getCircuitThumbnailUrl, getWorkoutData }
